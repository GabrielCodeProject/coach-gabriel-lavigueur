import { env } from "@/lib/env";

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
          <picture>
            <source
              srcSet={`${env.NEXT_PUBLIC_BASE_PATH}${beforeSrc.replace(/\.(jpe?g|png)$/i, '.webp')}`}
              type="image/webp"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${env.NEXT_PUBLIC_BASE_PATH}${beforeSrc}`}
              alt={`Avant — ${clientName}`}
              className="aspect-[3/4] w-full object-cover"
            />
          </picture>
        </div>
        <figcaption className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Avant
        </figcaption>
      </figure>
      <figure className="flex flex-col gap-2">
        <div className="overflow-hidden rounded-xl border border-border bg-muted">
          <picture>
            <source
              srcSet={`${env.NEXT_PUBLIC_BASE_PATH}${afterSrc.replace(/\.(jpe?g|png)$/i, '.webp')}`}
              type="image/webp"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${env.NEXT_PUBLIC_BASE_PATH}${afterSrc}`}
              alt={`Après — ${clientName}`}
              className="aspect-[3/4] w-full object-cover"
            />
          </picture>
        </div>
        <figcaption className="text-xs font-semibold uppercase tracking-widest text-primary">
          Après
        </figcaption>
      </figure>
    </div>
  );
}
