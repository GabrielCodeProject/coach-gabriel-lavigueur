import { Quote } from "lucide-react";

type TransformationTestimonialProps = {
  shortTestimonial: string;
  clientName: string;
};

export function TransformationTestimonial({
  shortTestimonial,
  clientName,
}: TransformationTestimonialProps) {
  return (
    <blockquote className="relative flex flex-col gap-4 rounded-xl border border-border bg-card p-6 md:p-8">
      <Quote
        className="size-6 text-primary/70"
        aria-hidden="true"
      />
      <p className="text-pretty text-lg leading-relaxed text-foreground md:text-xl">
        {shortTestimonial}
      </p>
      <footer className="text-sm font-semibold text-muted-foreground">
        — {clientName}
      </footer>
    </blockquote>
  );
}
