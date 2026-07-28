import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const fieldClasses =
  "w-full rounded-sm border border-border bg-surface px-4 py-3 text-body text-foreground " +
  "transition-colors duration-200 ease-standard placeholder:text-muted " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  suffix?: string;
}

export function Field({ label, suffix, id, className, ...props }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-caption uppercase tracking-[0.1em] text-muted">
        {label}
      </label>
      <div className="relative mt-3">
        <input
          id={id}
          className={cn(fieldClasses, suffix ? "pr-12" : "", className)}
          {...props}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-body-sm text-muted">
            {suffix}
          </span>
        ) : null}
      </div>
    </div>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export function SelectField({ label, id, options, className, ...props }: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-caption uppercase tracking-[0.1em] text-muted">
        {label}
      </label>
      <select id={id} className={cn(fieldClasses, "mt-3 cursor-pointer", className)} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function TextareaField({ label, id, className, ...props }: TextareaFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-caption uppercase tracking-[0.1em] text-muted">
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        className={cn(fieldClasses, "mt-3 resize-none", className)}
        {...props}
      />
    </div>
  );
}
