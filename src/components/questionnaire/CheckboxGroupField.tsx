import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type CheckboxGroupFieldProps = {
  legend: string;
  optional?: boolean;
  idPrefix: string;
  options: Record<string, string>;
  value: string[];
  onChange: (checked: boolean, value: string) => void;
};

export function CheckboxGroupField({
  legend,
  optional,
  idPrefix,
  options,
  value,
  onChange,
}: CheckboxGroupFieldProps) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-sm font-medium">
        {legend}{" "}
        {optional ? (
          <span className="text-xs font-normal text-muted-foreground">(facultatif)</span>
        ) : null}
      </legend>
      <div className="flex flex-col gap-2">
        {Object.entries(options).map(([optValue, label]) => (
          <div key={optValue} className="flex items-center gap-2">
            <Checkbox
              id={`${idPrefix}-${optValue}`}
              checked={value.includes(optValue)}
              onCheckedChange={(checked) => onChange(checked === true, optValue)}
            />
            <Label htmlFor={`${idPrefix}-${optValue}`} className="text-sm font-normal">
              {label}
            </Label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
