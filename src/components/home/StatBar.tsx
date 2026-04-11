import { BUSINESS } from "@/lib/business-data";

export function StatBar() {
  return (
    <div className="w-full bg-muted">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 py-10 md:flex-row md:justify-center md:px-6">
        {BUSINESS.stats.map((stat, index) => (
          <div key={stat.label} className="flex items-center gap-8">
            {index > 0 && (
              <span
                className="hidden h-10 w-px shrink-0 bg-border md:block"
                aria-hidden="true"
              />
            )}
            <div className="flex flex-col items-center gap-1">
              <span className="text-4xl font-bold text-primary">{stat.value}</span>
              <span className="text-center text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
