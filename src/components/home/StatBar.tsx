import { BUSINESS } from "@/lib/business-data";

const STATS = [
  {
    count: BUSINESS.coach.yearsOfExperience,
    suffix: "",
    label: "ans de pratique",
    detail: "Pas une certification générique — 13 ans de pratique personnelle confirmée.",
  },
  {
    count: 125,
    suffix: "$",
    label: "plan nutritionnel · à vie",
    detail: "Un paiement unique. Toutes les mises à jour futures incluses.",
  },
  {
    count: 5,
    suffix: "",
    label: "étapes claires",
    detail: "Du premier contact au premier résultat. Aucune surprise.",
  },
];

export function StatBar() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="grid grid-cols-1 divide-y divide-white/8 bg-[var(--dark)] sm:grid-cols-3 sm:divide-x sm:divide-y-0"
    >
      <h2 id="stats-heading" className="sr-only">
        Chiffres clés
      </h2>
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="relative px-6 py-8 before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-primary before:opacity-20 before:transition-opacity hover:before:opacity-100 md:px-12 md:py-10"
        >
          <dl>
            <dd
              className="reveal text-[52px] font-black leading-none tracking-[-0.04em] text-primary"
              data-count={stat.count}
              data-suffix={stat.suffix}
            >
              {stat.count}
              {stat.suffix}
            </dd>
            <dt className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">
              {stat.label}
            </dt>
          </dl>
          <p className="mt-2 text-[13px] leading-[1.55] text-white/65">
            {stat.detail}
          </p>
        </div>
      ))}
    </section>
  );
}
