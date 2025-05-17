export function formatLargeNumber(value: string): string {
  const num = parseFloat(value);

  if (isNaN(num)) return "Invalid Input";

  const abs = Math.abs(num);

  if (abs >= 1e12) return (num / 1e12).toFixed(2) + "t";
  if (abs >= 1e9) return (num / 1e9).toFixed(2) + "b";
  if (abs >= 1e6) return (num / 1e6).toFixed(2) + "m";
  if (abs >= 1e3) return (num / 1e3).toFixed(2) + "k";

  return num.toString();
}

export function formatUSD(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num)) return "Invalid Input";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(num);
}
