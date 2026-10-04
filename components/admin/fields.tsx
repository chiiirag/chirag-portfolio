import type { ReactNode } from "react";
import { FieldError } from "@/components/ui/field-error";
import { cn } from "@/lib/utils";

type BaseProps = {
  name: string;
  label: string;
  hint?: ReactNode;
  errors?: string[];
  className?: string;
};

export function TextField({
  name,
  label,
  hint,
  errors,
  className,
  defaultValue,
  type = "text",
  required,
  maxLength,
  placeholder,
}: BaseProps & {
  defaultValue?: string | number;
  type?: "text" | "email" | "url" | "number" | "tel";
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-invalid={errors?.length ? true : undefined}
        className={cn("input", Boolean(errors?.length) && "border-red-400")}
      />
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      <FieldError errors={errors} />
    </div>
  );
}

export function TextAreaField({
  name,
  label,
  hint,
  errors,
  className,
  defaultValue,
  rows = 4,
  required,
  maxLength,
}: BaseProps & { defaultValue?: string; rows?: number; required?: boolean; maxLength?: number }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        required={required}
        maxLength={maxLength}
        aria-invalid={errors?.length ? true : undefined}
        className={cn("input resize-y", Boolean(errors?.length) && "border-red-400")}
      />
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      <FieldError errors={errors} />
    </div>
  );
}

export function CheckboxField({
  name,
  label,
  hint,
  defaultChecked,
  className,
}: Omit<BaseProps, "errors"> & { defaultChecked?: boolean }) {
  return (
    <label htmlFor={name} className={cn("flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3.5", className)}>
      <input
        id={name}
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="mt-0.5 size-4 rounded border-slate-300 accent-brand-600"
      />
      <span>
        <span className="block text-sm font-medium text-slate-800">{label}</span>
        {hint && <span className="block text-xs text-slate-500">{hint}</span>}
      </span>
    </label>
  );
}

export function SelectField({
  name,
  label,
  hint,
  errors,
  className,
  defaultValue,
  options,
}: BaseProps & { defaultValue?: string; options: Array<{ value: string; label: string }> }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="label">
        {label}
      </label>
      <select id={name} name={name} defaultValue={defaultValue} className="input">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      <FieldError errors={errors} />
    </div>
  );
}

export function FormSection({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="card p-5 sm:p-6">
      <h2 className="text-base font-bold text-ink">{title}</h2>
      {description && <p className="mt-0.5 text-sm text-slate-500">{description}</p>}
      <div className="mt-5 grid gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}
