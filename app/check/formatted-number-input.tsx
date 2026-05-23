"use client";

import {
  formatNumberWithCommas,
  parseFormattedNumber,
} from "@/lib/format/number-input";

const baseClassName =
  "mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-foreground shadow-sm transition-colors placeholder:text-muted/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

type FormattedNumberInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (plainValue: string) => void;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  hasError?: boolean;
};

export function FormattedNumberInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = true,
  hint,
  hasError = false,
}: FormattedNumberInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        required={required}
        autoComplete="off"
        placeholder={placeholder}
        className={`${baseClassName} ${
          hasError
            ? "border-accent focus:border-accent focus:ring-accent/20"
            : ""
        }`}
        value={formatNumberWithCommas(value)}
        onChange={(e) => onChange(parseFormattedNumber(e.target.value))}
      />
      {hint && <p className="mt-2 text-sm text-muted">{hint}</p>}
    </div>
  );
}
