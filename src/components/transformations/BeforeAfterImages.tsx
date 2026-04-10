type BeforeAfterImagesProps = {
  beforeSrc: string;
  afterSrc: string;
  clientName: string;
};

export function BeforeAfterImages({
  beforeSrc,
  afterSrc,
  clientName,
}: BeforeAfterImagesProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <figure className="flex flex-col gap-2">
        <div className="overflow-hidden rounded-xl border border-border bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={beforeSrc}
            alt={`Avant — ${clientName}`}
            className="aspect-[3/4] w-full object-cover"
          />
        </div>
        <figcaption className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Avant
        </figcaption>
      </figure>
      <figure className="flex flex-col gap-2">
        <div className="overflow-hidden rounded-xl border border-border bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={afterSrc}
            alt={`Après — ${clientName}`}
            className="aspect-[3/4] w-full object-cover"
          />
        </div>
        <figcaption className="text-xs font-semibold uppercase tracking-widest text-primary">
          Après
        </figcaption>
      </figure>
    </div>
  );
}
