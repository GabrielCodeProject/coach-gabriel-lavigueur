"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/routes";
import { submitToWeb3Forms } from "@/lib/forms/submit-to-web3forms";
import {
  questionnaireSchema,
  QUESTIONNAIRE_DEFAULT_VALUES,
  type QuestionnaireInput,
} from "./questionnaire.schema";
import {
  NIVEAU_ACTIVITE_LABEL,
  OBJECTIF_PRINCIPAL_LABEL,
  BUDGET_FOURCHETTE_LABEL,
  SOURCE_PROSPECT_LABEL,
  PLAGE_HORAIRE_LABEL,
  JOUR_SEMAINE_LABEL,
} from "@/types/questionnaire.types";

const NATIVE_SELECT_CLASS =
  "h-10 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm text-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm";

const INPUT_TALL_CLASS = "h-10 px-3 text-sm";

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string; submittedName: string }
  | { status: "error"; message: string };

export function QuestionnaireForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    status: "idle",
  });

  const form = useForm({
    defaultValues: QUESTIONNAIRE_DEFAULT_VALUES,
    validators: {
      onSubmit: questionnaireSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmissionState({ status: "submitting" });
      const result = await submitToWeb3Forms(value as QuestionnaireInput);
      if (result.success) {
        setSubmissionState({
          status: "success",
          message: result.message,
          submittedName: value.nom,
        });
      } else {
        setSubmissionState({ status: "error", message: result.message });
      }
    },
  });

  if (submissionState.status === "success") {
    return (
      <Card className="border-primary/40 bg-primary/5">
        <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
          <CheckCircle2
            className="size-10 text-primary"
            aria-hidden="true"
          />
          <h2 className="text-2xl font-semibold tracking-tight">
            Merci {submissionState.submittedName} !
          </h2>
          <p className="max-w-md text-pretty text-muted-foreground">
            Ton questionnaire est bien reçu. Je te reviens personnellement par courriel sous 48 heures pour fixer ta consultation au Nutrition Suprême.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
      className="flex flex-col gap-6"
      noValidate
    >
      {/* Identité */}
      <Card>
        <CardHeader>
          <CardTitle>Identité</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <form.Field name="nom">
            {(field) => (
              <FieldWrapper
                id={field.name}
                label="Nom et prénom"
                required
                error={getFieldError(field)}
              >
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className={INPUT_TALL_CLASS}
                  required
                />
              </FieldWrapper>
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <FieldWrapper
                id={field.name}
                label="Courriel"
                required
                error={getFieldError(field)}
              >
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className={INPUT_TALL_CLASS}
                  required
                />
              </FieldWrapper>
            )}
          </form.Field>

          <form.Field name="telephone">
            {(field) => (
              <FieldWrapper id={field.name} label="Téléphone (facultatif)" error={getFieldError(field)}>
                <Input
                  id={field.name}
                  name={field.name}
                  type="tel"
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className={INPUT_TALL_CLASS}
                />
              </FieldWrapper>
            )}
          </form.Field>

          <form.Field name="age">
            {(field) => (
              <FieldWrapper id={field.name} label="Âge" required error={getFieldError(field)}>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min={16}
                  max={99}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  className={INPUT_TALL_CLASS}
                  required
                />
              </FieldWrapper>
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* Situation physique */}
      <Card>
        <CardHeader>
          <CardTitle>Situation actuelle</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <form.Field name="taille_cm">
            {(field) => (
              <FieldWrapper id={field.name} label="Taille (cm)" required error={getFieldError(field)}>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min={100}
                  max={230}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  className={INPUT_TALL_CLASS}
                  required
                />
              </FieldWrapper>
            )}
          </form.Field>

          <form.Field name="poids_kg">
            {(field) => (
              <FieldWrapper id={field.name} label="Poids (kg)" required error={getFieldError(field)}>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min={30}
                  max={300}
                  step="0.1"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  className={INPUT_TALL_CLASS}
                  required
                />
              </FieldWrapper>
            )}
          </form.Field>

          <form.Field name="niveau_activite">
            {(field) => (
              <FieldWrapper
                id={field.name}
                label="Niveau d'activité"
                required
                error={getFieldError(field)}
              >
                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value as QuestionnaireInput["niveau_activite"])}
                  onBlur={field.handleBlur}
                  className={NATIVE_SELECT_CLASS}
                  required
                >
                  {Object.entries(NIVEAU_ACTIVITE_LABEL).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </FieldWrapper>
            )}
          </form.Field>

          <form.Field name="historique_entrainement">
            {(field) => (
              <FieldWrapper
                id={field.name}
                label="Historique d'entraînement (facultatif)"
                error={getFieldError(field)}
                className="md:col-span-3"
              >
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  rows={3}
                  placeholder="Ex. : j'ai fait de la course 3 fois par semaine pendant 2 ans, puis j'ai arrêté il y a 6 mois."
                />
              </FieldWrapper>
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* Objectifs */}
      <Card>
        <CardHeader>
          <CardTitle>Tes objectifs</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <form.Field name="objectif_principal">
            {(field) => (
              <FieldWrapper
                id={field.name}
                label="Objectif principal"
                required
                error={getFieldError(field)}
              >
                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value as QuestionnaireInput["objectif_principal"])}
                  onBlur={field.handleBlur}
                  className={NATIVE_SELECT_CLASS}
                  required
                >
                  {Object.entries(OBJECTIF_PRINCIPAL_LABEL).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </FieldWrapper>
            )}
          </form.Field>

          <form.Field name="echeance_mois">
            {(field) => (
              <FieldWrapper
                id={field.name}
                label="Échéance (mois)"
                required
                error={getFieldError(field)}
              >
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min={1}
                  max={60}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  className={INPUT_TALL_CLASS}
                  required
                />
              </FieldWrapper>
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* Contraintes */}
      <Card>
        <CardHeader>
          <CardTitle>Contraintes et santé</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form.Field name="blessures">
            {(field) => (
              <FieldWrapper
                id={field.name}
                label="Blessures ou limitations physiques (facultatif)"
                error={getFieldError(field)}
              >
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  rows={2}
                />
              </FieldWrapper>
            )}
          </form.Field>

          <form.Field name="conditions_medicales">
            {(field) => (
              <FieldWrapper
                id={field.name}
                label="Conditions médicales (facultatif)"
                error={getFieldError(field)}
              >
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  rows={2}
                />
              </FieldWrapper>
            )}
          </form.Field>

          <form.Field name="restrictions_alimentaires">
            {(field) => (
              <FieldWrapper
                id={field.name}
                label="Restrictions alimentaires (facultatif)"
                error={getFieldError(field)}
              >
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className={INPUT_TALL_CLASS}
                  placeholder="Ex. : végétarien, intolérance au lactose"
                />
              </FieldWrapper>
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* Disponibilités + budget + contexte */}
      <Card>
        <CardHeader>
          <CardTitle>Disponibilités et contexte</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <form.Field name="seances_par_semaine">
            {(field) => (
              <FieldWrapper
                id={field.name}
                label="Séances souhaitées par semaine"
                required
                error={getFieldError(field)}
              >
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min={1}
                  max={7}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  className={INPUT_TALL_CLASS}
                  required
                />
              </FieldWrapper>
            )}
          </form.Field>

          <form.Field name="budget_fourchette">
            {(field) => (
              <FieldWrapper
                id={field.name}
                label="Fourchette budgétaire"
                required
                error={getFieldError(field)}
              >
                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value as QuestionnaireInput["budget_fourchette"])}
                  onBlur={field.handleBlur}
                  className={NATIVE_SELECT_CLASS}
                  required
                >
                  {Object.entries(BUDGET_FOURCHETTE_LABEL).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </FieldWrapper>
            )}
          </form.Field>

          <form.Field name="source">
            {(field) => (
              <FieldWrapper
                id={field.name}
                label="Comment tu m'as trouvé"
                required
                error={getFieldError(field)}
                className="md:col-span-2"
              >
                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value as QuestionnaireInput["source"])}
                  onBlur={field.handleBlur}
                  className={NATIVE_SELECT_CLASS}
                  required
                >
                  {Object.entries(SOURCE_PROSPECT_LABEL).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </FieldWrapper>
            )}
          </form.Field>

          {/* Disponibilités horaires — facultatif */}
          <div className="grid grid-cols-2 gap-4 md:col-span-2">
            <form.Field name="plages_horaires">
              {(field) => (
                <div className="flex flex-col gap-3">
                  <Label className="text-sm font-medium">
                    Plage horaire préférée{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      (facultatif)
                    </span>
                  </Label>
                  <div className="flex flex-col gap-2">
                    {Object.entries(PLAGE_HORAIRE_LABEL).map(([value, label]) => (
                      <div key={value} className="flex items-center gap-2">
                        <Checkbox
                          id={`plage-${value}`}
                          checked={(field.state.value ?? []).includes(value)}
                          onCheckedChange={(checked) => {
                            const current = field.state.value ?? [];
                            field.handleChange(
                              checked === true
                                ? [...current, value]
                                : current.filter((v) => v !== value),
                            );
                          }}
                        />
                        <Label
                          htmlFor={`plage-${value}`}
                          className="text-sm font-normal"
                        >
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form.Field>

            <form.Field name="jours_disponibles">
              {(field) => (
                <div className="flex flex-col gap-3">
                  <Label className="text-sm font-medium">
                    Jours disponibles{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      (facultatif)
                    </span>
                  </Label>
                  <div className="flex flex-col gap-2">
                    {Object.entries(JOUR_SEMAINE_LABEL).map(([value, label]) => (
                      <div key={value} className="flex items-center gap-2">
                        <Checkbox
                          id={`jour-${value}`}
                          checked={(field.state.value ?? []).includes(value)}
                          onCheckedChange={(checked) => {
                            const current = field.state.value ?? [];
                            field.handleChange(
                              checked === true
                                ? [...current, value]
                                : current.filter((v) => v !== value),
                            );
                          }}
                        />
                        <Label
                          htmlFor={`jour-${value}`}
                          className="text-sm font-normal"
                        >
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="pourquoi_maintenant">
            {(field) => (
              <FieldWrapper
                id={field.name}
                label="Pourquoi maintenant ?"
                required
                error={getFieldError(field)}
                className="md:col-span-2"
                helper="C'est souvent dans cette réponse que je comprends le mieux où tu en es. Prends ton temps."
              >
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  rows={5}
                  required
                />
              </FieldWrapper>
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* Consent + submit */}
      <div className="flex flex-col gap-5">
        <form.Field name="consentement_rgpd">
          {(field) => (
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) => field.handleChange(checked === true)}
                  onBlur={field.handleBlur}
                  className="mt-0.5"
                />
                <Label htmlFor={field.name} className="items-start leading-relaxed">
                  <span>
                    J'accepte que mes données soient utilisées pour me recontacter selon la{" "}
                    <Link
                      href={ROUTES.PRIVACY}
                      className="text-primary underline underline-offset-4 hover:text-primary/80"
                    >
                      politique de confidentialité
                    </Link>
                    .
                  </span>
                </Label>
              </div>
              {getFieldError(field) ? (
                <p className="text-xs text-destructive">{getFieldError(field)}</p>
              ) : null}
            </div>
          )}
        </form.Field>

        {submissionState.status === "error" ? (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <p>{submissionState.message}</p>
          </div>
        ) : null}

        <Button
          type="submit"
          className={cn("h-12 w-full px-6 text-base md:w-fit")}
          disabled={submissionState.status === "submitting"}
        >
          {submissionState.status === "submitting" ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
              Envoi en cours…
            </>
          ) : (
            "Envoyer mon questionnaire"
          )}
        </Button>
      </div>
    </form>
  );
}

type FieldWrapperProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string | undefined;
  helper?: string;
  className?: string;
  children: React.ReactNode;
};

function FieldWrapper({
  id,
  label,
  required,
  error,
  helper,
  className,
  children,
}: FieldWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>
        <span>
          {label}
          {required ? (
            <span aria-hidden="true" className="text-primary">
              {" *"}
            </span>
          ) : null}
        </span>
      </Label>
      {children}
      {helper ? <p className="text-xs text-muted-foreground">{helper}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type FieldApi = {
  state: { meta: { errors: unknown[] } };
};

function getFieldError(field: FieldApi): string | undefined {
  const firstError = field.state.meta.errors[0];
  if (!firstError) return undefined;
  if (typeof firstError === "string") return firstError;
  if (typeof firstError === "object" && firstError !== null && "message" in firstError) {
    const message = (firstError as { message: unknown }).message;
    if (typeof message === "string") return message;
  }
  return "Ce champ est invalide";
}
