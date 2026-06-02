"use client";

import { formatCurrency } from "@/lib/format";
import { FormattedNumberInput } from "./formatted-number-input";

type LoanStructureAmountsProps = {
  loanAmount: string;
  fixedLoanAmount: string;
  revolvingCreditAmount: string;
  onFixedChange: (value: string) => void;
  onRevolvingChange: (value: string) => void;
};

export function loanAmountsExceedTotal(
  loanAmount: string,
  fixedLoanAmount: string,
  revolvingCreditAmount: string
): boolean {
  const total = Number(loanAmount) || 0;
  const fixed = Number(fixedLoanAmount) || 0;
  const revolving = Number(revolvingCreditAmount) || 0;
  return fixed + revolving > total;
}

export function calculateFloatingAmount(
  loanAmount: string,
  fixedLoanAmount: string,
  revolvingCreditAmount: string
): number {
  const total = Number(loanAmount) || 0;
  const fixed = Number(fixedLoanAmount) || 0;
  const revolving = Number(revolvingCreditAmount) || 0;
  return total - fixed - revolving;
}

export function LoanStructureAmounts({
  loanAmount,
  fixedLoanAmount,
  revolvingCreditAmount,
  onFixedChange,
  onRevolvingChange,
}: LoanStructureAmountsProps) {
  const exceeds = loanAmountsExceedTotal(
    loanAmount,
    fixedLoanAmount,
    revolvingCreditAmount
  );
  const floating = calculateFloatingAmount(
    loanAmount,
    fixedLoanAmount,
    revolvingCreditAmount
  );

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">
        Split your loan between fixed, floating, and revolving credit. Leave
        revolving blank if you don&apos;t use it.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        <FormattedNumberInput
          id="fixedLoanAmount"
          label="Fixed loan amount ($)"
          placeholder="e.g. 400,000"
          value={fixedLoanAmount}
          onChange={onFixedChange}
          required={false}
          hasError={exceeds}
        />
        <FormattedNumberInput
          id="revolvingCreditAmount"
          label="Revolving credit amount ($)"
          placeholder="e.g. 0"
          value={revolvingCreditAmount}
          onChange={onRevolvingChange}
          required={false}
          hasError={exceeds}
        />
      </div>
      {exceeds && (
        <p className="text-sm font-medium text-danger" role="alert">
          Amount exceeds your total loan
        </p>
      )}
      <div
        className={`rounded-xl border px-4 py-3 ${
          exceeds
            ? "border-violet/40 bg-violet-light/50"
            : "border-border bg-background"
        }`}
      >
        <p className="text-sm text-muted">Calculated automatically</p>
        <p
          className={`mt-1 text-lg font-semibold ${
            exceeds ? "text-danger" : "text-foreground"
          }`}
        >
          Floating / offset: {formatCurrency(Math.max(0, floating))}
        </p>
      </div>
    </div>
  );
}
