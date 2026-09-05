/**
 * Formats a number using the Indian digit grouping convention (lakh/crore),
 * e.g. 1234567 -> "12,34,567". Avoids relying on Intl.NumberFormat locale
 * data, which isn't consistently bundled with Hermes across devices.
 */
export function formatIndianNumber(value: number): string {
  const isNegative = value < 0;
  const [wholePart, decimalPart] = Math.abs(Math.round(value)).toString().split('.');

  const lastThree = wholePart.slice(-3);
  const rest = wholePart.slice(0, -3);
  const grouped = rest ? `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${lastThree}` : lastThree;

  return `${isNegative ? '-' : ''}${grouped}${decimalPart ? `.${decimalPart}` : ''}`;
}

export function formatCurrency(value: number): string {
  return `₹${formatIndianNumber(value)}`;
}
