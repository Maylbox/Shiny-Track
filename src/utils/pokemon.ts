export function titleCasePokemonName(name: string) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getSpriteUrl(name: string) {
  if (!name) return "";
  const normalized = name.trim().toLowerCase();
  return `https://play.pokemonshowdown.com/sprites/ani-shiny/${normalized}.gif`;
}