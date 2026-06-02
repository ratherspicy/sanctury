"use client";

import {
  formatNumberWithCommas,
  parseFormattedNumber,
} from "@/lib/format/number-input";

const baseClassName =
"mt-1.5 w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground transition-colors placeholder:text-muted/60 focus:border-violet focus:outline-none focus:ring-0";

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
            ? "border-danger focus:border-danger focus:ring-0"
            : ""
        }`}
        value={formatNumberWithCommas(value)}
        onChange={(e) => onChange(parseFormattedNumber(e.target.value))}
      />
      {hint && <p className="mt-2 text-sm text-muted">{hint}</p>}
    </div>
  );
}
