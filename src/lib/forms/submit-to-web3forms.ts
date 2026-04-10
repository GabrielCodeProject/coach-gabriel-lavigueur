import { env } from "@/lib/env";
import { WEB3FORMS_ENDPOINT } from "@/lib/constants";
import { BUSINESS } from "@/lib/business-data";
import type { QuestionnaireInput } from "@/components/questionnaire/questionnaire.schema";

export type Web3FormsResult =
  | { success: true; message: string }
  | { success: false; message: string };

export async function submitToWeb3Forms(
  values: QuestionnaireInput,
): Promise<Web3FormsResult> {
  const payload = {
    access_key: env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
    subject: `Nouveau questionnaire — ${values.nom}`,
    from_name: `Site ${BUSINESS.name}`,
    replyto: values.email,
    ...values,
  };

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
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
  } catch {
    return {
      success: false,
      message:
        "Impossible de contacter le serveur. Vérifie ta connexion et réessaie.",
    };
  }
}
