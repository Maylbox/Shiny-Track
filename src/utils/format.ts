export function formatPercent(probability: number) {
  return `${(probability * 100).toFixed(probability >= 0.1 ? 1 : 2)}%`;
}

export function formatOdds(denominator: number) {
  return `1/${denominator.toFixed(2).replace(/\.00$/, "")}`;
}