export type LoanBalancePoint = {
  year: number;
  current: number;
  restructured: number;
  gap: number;
};

export function generateLoanBalanceCurve(
  loanAmount: number,
  annualRatePercent: number,
  extraMonthly = 500
): {
  points: LoanBalancePoint[];
  currentPayoffYears: number;
  restructuredPayoffYears: number;
} {
  if (loanAmount <= 0) {
    return { points: [], currentPayoffYears: 0, restructuredPayoffYears: 0 };
  }

  const r = annualRatePercent / 100 / 12;
  const termMonths = 25 * 12;
  const payment =
    r > 0
      ? (loanAmount * r * Math.pow(1 + r, termMonths)) /
        (Math.pow(1 + r, termMonths) - 1)
      : loanAmount / termMonths;

  const sampleMonth = (months: number) => {
    let balance = loanAmount;
    for (let m = 0; m < months && balance > 0.5; m++) {
      balance = balance * (1 + r) - payment;
    }
    return Math.max(0, balance);
  };

  const sampleRestructuredMonth = (months: number) => {
    let balance = loanAmount;
    for (let m = 0; m < months && balance > 0.5; m++) {
      balance = balance * (1 + r) - payment - extraMonthly;
    }
    return Math.max(0, balance);
  };

  let currentMonths = 0;
  let balance = loanAmount;
  while (balance > 0.5 && currentMonths < 600) {
    balance = balance * (1 + r) - payment;
    currentMonths++;
  }

  let restructuredMonths = 0;
  balance = loanAmount;
  while (balance > 0.5 && restructuredMonths < 600) {
    balance = balance * (1 + r) - payment - extraMonthly;
    restructuredMonths++;
  }

  const maxMonths = currentMonths;
  const step = Math.max(1, Math.floor(maxMonths / 24));
  const points: LoanBalancePoint[] = [];

  for (let m = 0; m <= maxMonths; m += step) {
    const current = Math.round(sampleMonth(m));
    const restructured = Math.round(sampleRestructuredMonth(m));
    points.push({
      year: Math.round((m / 12) * 10) / 10,
      current,
      restructured,
      gap: Math.max(0, current - restructured),
    });
  }

  const lastYear = Math.ceil(currentMonths / 12);
  if (points[points.length - 1]?.year !== lastYear) {
    points.push({
      year: lastYear,
      current: 0,
      restructured: 0,
      gap: 0,
    });
  }

  return {
    points,
    currentPayoffYears: Math.round((currentMonths / 12) * 10) / 10,
    restructuredPayoffYears: Math.round((restructuredMonths / 12) * 10) / 10,
  };
}
