import { env } from "@/lib/env";
import { WEB3FORMS_ENDPOINT } from "@/lib/constants";
import { BUSINESS } from "@/lib/business-data";
import type { QuestionnaireInput } from "@/components/questionnaire/questionnaire.schema";

export type Web3FormsResult =
  | { success: true; message: string }
  | { success: false; message: string };

const FETCH_TIMEOUT_MS = 15_000;

export async function submitToWeb3Forms(
  values: QuestionnaireInput,
): Promise<Web3FormsResult> {
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

    const data: unknown = await response.json();
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
