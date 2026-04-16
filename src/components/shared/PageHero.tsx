type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-background pb-14 pt-16 md:pb-16 md:pt-20">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        {eyebrow ? (
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--lime-dark)]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-[clamp(36px,5vw,64px)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-foreground">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-foreground/70">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
