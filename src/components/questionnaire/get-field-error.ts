type FieldApi = {
  state: { meta: { errors: unknown[] } };
};

export function getFieldError(field: FieldApi): string | undefined {
  const firstError = field.state.meta.errors[0];
  if (!firstError) return undefined;
  if (typeof firstError === "string") return firstError;
  if (
    typeof firstError === "object" &&
    firstError !== null &&
    "message" in firstError
  ) {
    const message = (firstError as { message: unknown }).message;
    if (typeof message === "string") return message;
  }
  return "Ce champ est invalide";
}
