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
    <section className="border-b border-border bg-card">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
          <div className="flex flex-col gap-4">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {introTitle}
            </h2>
            <p className="text-pretty leading-relaxed text-muted-foreground md:text-lg">
              {introBody}
            </p>
          </div>
          <aside className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 text-primary" aria-hidden="true" />
              <div className="flex flex-col gap-1 text-sm">
                <p className="font-semibold text-foreground">Basé à</p>
                <p className="text-muted-foreground">
                  {BUSINESS.location.storeName}
                  <br />
                  {BUSINESS.location.city}, {BUSINESS.location.provinceFull}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GraduationCap
                className="mt-0.5 size-5 text-primary"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-1 text-sm">
                <p className="font-semibold text-foreground">Formation</p>
                <p className="text-muted-foreground">
                  {BUSINESS.credentials.formation}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 size-5 text-primary" aria-hidden="true" />
              <div className="flex flex-col gap-1 text-sm">
                <p className="font-semibold text-foreground">Équipe</p>
                <p className="text-muted-foreground">
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
