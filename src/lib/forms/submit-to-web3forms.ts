import { env } from "@/lib/env";
import { WEB3FORMS_ENDPOINT } from "@/lib/constants";
import { BUSINESS } from "@/lib/business-data";
import type { QuestionnaireInput } from "@/components/questionnaire/questionnaire.schema";

export type Web3FormsResult =
  | { success: true; message: string }
  | { success: false; message: string };

const FETCH_TIMEOUT_MS = 15_000;
const RATE_LIMIT_KEY = "w3f_rate_limit";
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

type RateLimitRecord = { count: number; windowStart: number };

// Reads and validates the rate-limit record from localStorage.
// Returns a fresh record if the stored value is absent or malformed.
function readRateLimitRecord(now: number): RateLimitRecord {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    if (!raw) return { count: 0, windowStart: now };
    const parsed: unknown = JSON.parse(raw);
    if (
      parsed === null ||
      typeof parsed !== "object" ||
      typeof (parsed as Record<string, unknown>).count !== "number" ||
      typeof (parsed as Record<string, unknown>).windowStart !== "number"
    ) {
      return { count: 0, windowStart: now };
    }
    return parsed as RateLimitRecord;
  } catch {
    return { count: 0, windowStart: now };
  }
}

// Pure read — does NOT write to localStorage. Checks whether a submission is
// allowed without consuming a slot.
// NOTE: this is UX-only client-side throttling. A determined actor can bypass
// it by clearing localStorage. True abuse prevention requires enabling Web3Forms'
// server-side spam filter and domain restriction in the Web3Forms dashboard.
function checkRateLimit(): { allowed: boolean } {
  try {
    const now = Date.now();
    const record = readRateLimitRecord(now);
    // Reset expired windows and reject future-dated windowStart (tampered storage)
    if (now - record.windowStart > RATE_LIMIT_WINDOW_MS || record.windowStart > now) {
      return { allowed: true };
    }
    return { allowed: record.count < RATE_LIMIT_MAX };
  } catch {
    return { allowed: true };
  }
}

// Write-only — called after a confirmed HTTP success to consume one slot.
// Separated from checkRateLimit() so network failures do not burn a slot.
function commitRateLimitSlot(): void {
  try {
    const now = Date.now();
    const record = readRateLimitRecord(now);
    if (now - record.windowStart > RATE_LIMIT_WINDOW_MS || record.windowStart > now) {
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ count: 1, windowStart: now }));
    } else {
      localStorage.setItem(
        RATE_LIMIT_KEY,
        JSON.stringify({ count: record.count + 1, windowStart: record.windowStart }),
      );
    }
  } catch {
    // localStorage unavailable — no-op
  }
}

export async function submitToWeb3Forms(
  values: QuestionnaireInput,
): Promise<Web3FormsResult> {
  if (!env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY) {
    return {
      success: false,
      message: "Le formulaire n'est pas configuré. Contacte-moi directement par courriel.",
    };
  }

  // checkRateLimit() is read-only — no slot is consumed until the HTTP request
  // succeeds below.
  const rateLimit = checkRateLimit();
  if (!rateLimit.allowed) {
    return {
      success: false,
      message: `Limite atteinte — tu as déjà soumis ${RATE_LIMIT_MAX} questionnaires aujourd'hui. Réessaie demain ou contacte-moi directement.`,
    };
  }

  // Exclude the consent checkbox — it's UI-only and doesn't belong in the email
  const { consentement_rgpd: _consent, ...formFields } = values;

  const payload = {
    access_key: env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
    subject: `Nouveau questionnaire — ${values.nom}`,
    from_name: `Site ${BUSINESS.name}`,
    replyto: values.email,
    botcheck: "",
    ...formFields,
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        success: false,
        message: "L'envoi a échoué. Essaie à nouveau dans un instant.",
      };
    }

    // HTTP success confirmed — consume one rate-limit slot now.
    // Network failures above do NOT reach this line, so failed attempts
    // never penalise the user's daily quota.
    commitRateLimitSlot();

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      return { success: true, message: "Questionnaire envoyé avec succès." };
    }

    const parsed = data as { success?: boolean; message?: string };
    if (parsed.success) {
      return {
        success: true,
        message: parsed.message ?? "Questionnaire envoyé avec succès.",
      };
    }
    return {
      success: false,
      message: parsed.message ?? "Une erreur est survenue.",
    };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return {
        success: false,
        message: "La requête a expiré. Vérifie ta connexion et réessaie.",
      };
    }
    return {
      success: false,
      message:
        "Impossible de contacter le serveur. Vérifie ta connexion et réessaie.",
    };
  } finally {
    clearTimeout(timeout);
  }
}
