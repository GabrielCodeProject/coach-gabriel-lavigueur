import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/lib/routes";

const STEPS = [
  { num: "01", title: "Tu remplis le questionnaire", body: "Ton contexte, tes objectifs, tes contraintes. En ligne, avant la rencontre." },
  { num: "02", title: "On se rencontre en personne", body: "Une heure au Nutrition Suprême. Pas un Zoom — une vraie rencontre." },
  { num: "03", title: "Je construis ton plan", body: "Environ une semaine de travail sur mesure. Pas un copier-coller." },
  { num: "04", title: "Livraison via Fitlog", body: "Ton programme et accès direct à moi par chat. Tout au même endroit." },
  { num: "05", title: "Suivi aux 4–8 semaines", body: "On ajuste selon tes données et ta progression. Le plan évolue avec toi." },
] as const;

export function MethodPreviewSection() {
  return (
    <section className="bg-[--dark-mid] py-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <p className="reveal mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
          Ma méthode
        </p>
        <h2 className="reveal mb-12 text-[clamp(32px,4vw,52px)] font-black uppercase leading-[0.93] tracking-[-0.05em] text-white">
          Du premier contact<br />au premier résultat.
        </h2>

        <ol className="stagger-grid grid grid-cols-1 gap-px bg-white/8 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step) => (
            <li
              key={step.num}
              className="reveal flex flex-col gap-4 bg-[--dark-mid] p-7 transition-colors hover:bg-[#1e341e]"
            >
              <span className="text-[44px] font-black leading-none tracking-[-0.04em] text-primary">
                {step.num}
              </span>
              <h3 className="text-[13px] font-bold leading-[1.4] text-white">
                {step.title}
              </h3>
              <p className="text-[12px] leading-[1.6] text-white/65">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-8">
          <Link
            href={ROUTES.METHOD}
            className="inline-flex h-11 items-center gap-2 rounded-[4px] border border-primary px-5 text-[11px] font-bold uppercase tracking-[0.12em] text-primary transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          >
            Voir les détails de ma méthode
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
