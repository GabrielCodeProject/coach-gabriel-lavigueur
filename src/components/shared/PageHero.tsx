type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="flex max-w-3xl flex-col gap-4">
          {eyebrow ? (
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
