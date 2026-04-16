import { GraduationCap, MapPin, Users } from "lucide-react";
import { BUSINESS } from "@/lib/business-data";

type CoachIntroSectionProps = {
  introTitle: string;
  introBody: string;
};

export function CoachIntroSection({
  introTitle,
  introBody,
}: CoachIntroSectionProps) {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--lime-dark)]">
              À propos
            </span>
            <h2 className="text-balance text-3xl font-black uppercase tracking-[-0.04em] md:text-4xl">
              {introTitle}
            </h2>
            <p className="text-[15px] leading-[1.65] text-foreground/75">
              {introBody}
            </p>
          </div>
          <aside className="flex flex-col gap-5 border border-border bg-[var(--off-white)] p-6 transition-colors hover:bg-[var(--cream)]">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div className="flex flex-col gap-1 text-sm">
                <p className="font-bold text-foreground">Basé à</p>
                <p className="text-foreground/75">
                  {BUSINESS.location.storeName}
                  <br />
                  {BUSINESS.location.city}, {BUSINESS.location.provinceFull}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GraduationCap
                className="mt-0.5 size-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-1 text-sm">
                <p className="font-bold text-foreground">Formation</p>
                <p className="text-foreground/75">
                  {BUSINESS.credentials.formation}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div className="flex flex-col gap-1 text-sm">
                <p className="font-bold text-foreground">Équipe</p>
                <p className="text-foreground/75">
                  {BUSINESS.credentials.equipe}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
