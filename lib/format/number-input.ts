/** Strip to digits only for storage and calculations. */
export function parseFormattedNumber(value: string): string {
  return value.replace(/\D/g, "");
}

/** Format a digit string with thousands separators for display. */
export function formatNumberWithCommas(value: string): string {
  const digits = parseFormattedNumber(value);
  if (!digits) return "";
  return Number(digits).toLocaleString("en-NZ");
}
