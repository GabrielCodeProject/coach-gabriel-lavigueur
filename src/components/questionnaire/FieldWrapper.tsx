import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

type FieldWrapperProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string | undefined;
  helper?: string;
  className?: string;
  children: React.ReactNode;
};

export function FieldWrapper({
  id,
  label,
  required,
  error,
  helper,
  className,
  children,
}: FieldWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>
        <span>
          {label}
          {required ? (
            <span aria-hidden="true" className="text-primary">
              {" *"}
            </span>
          ) : null}
        </span>
      </Label>
      {children}
      {helper ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {helper}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
