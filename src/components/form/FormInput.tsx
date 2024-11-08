import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import { FormInputProps } from "@/types/form";


export default function FormInput({
  label,
  name,
  type = "text",
  className,
  error,
  ...props
}: FormInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name} className="capitalize">
          {label}
        </Label>
      )}
      <Input
        id={name}
        name={name}
        type={type}
        required
        className={cn(
          error && "border-red-500 focus-visible:ring-red-500",
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
