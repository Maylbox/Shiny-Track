import { Search } from "lucide-react";
import { STARTERS } from "../data/starters";
import { getSpriteUrl, titleCasePokemonName } from "../utils/pokemon";

type PokemonPanelProps = {
  pokemonQuery: string;
  setPokemonQuery: (value: string) => void;
  targetPokemon: string;
  setTargetPokemon: (value: string) => void;
  spriteOk: boolean;
  setSpriteOk: (value: boolean) => void;
};

export default function PokemonPanel({
  pokemonQuery,
  setPokemonQuery,
  targetPokemon,
  setTargetPokemon,
  spriteOk,
  setSpriteOk,
}: PokemonPanelProps) {
  const spriteUrl = getSpriteUrl(targetPokemon);

  return (
    <section className="rounded-[24px] sm:rounded-[28px] border-4 border-slate-900 bg-slate-900 p-4 sm:p-5 text-white shadow-[6px_6px_0_0_rgba(15,23,42,1)] sm:shadow-[8px_8px_0_0_rgba(15,23,42,1)]">
      <div className="grid gap-4 md:grid-cols-[260px,1fr] md:items-center lg:grid-cols-[280px,1fr]">
        <div className="rounded-[22px] sm:rounded-[24px] border-4 border-white/20 bg-[linear-gradient(180deg,#0f172a_0%,#1e293b_100%)] p-3 sm:p-4">
          <div className="mb-3 rounded-2xl border-4 border-slate-900 bg-white p-3 shadow-[5px_5px_0_0_rgba(15,23,42,1)]">
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Target Pokémon
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  value={pokemonQuery}
                  onChange={(e) => setPokemonQuery(e.target.value.toLowerCase())}
                  placeholder="ralts"
                  className="w-full rounded-xl border-4 border-slate-900 bg-sky-100 py-2 pl-9 pr-3 text-sm font-bold text-slate-900 outline-none"
                />
              </div>

              <button
                onClick={() => {
                  setTargetPokemon(pokemonQuery.trim().toLowerCase() || "ralts");
                  setSpriteOk(true);
                }}
                className="rounded-xl border-4 border-slate-900 bg-slate-900 px-4 py-2 text-sm font-black text-white transition hover:-translate-y-0.5"
              >
                Set
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {STARTERS.map((name) => (
                <button
                  key={name}
                  onClick={() => {
                    setPokemonQuery(name);
                    setTargetPokemon(name);
                    setSpriteOk(true);
                  }}
                  className="rounded-full border-4 border-slate-900 bg-yellow-100 px-3 py-1 text-[11px] sm:text-xs font-black uppercase tracking-[0.12em] text-slate-900 transition hover:-translate-y-0.5"
                >
                  {titleCasePokemonName(name)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex aspect-square min-h-[230px] sm:min-h-[300px] md:min-h-[340px] items-center justify-center overflow-hidden rounded-[18px] sm:rounded-[20px] border-4 border-dashed border-white/20 bg-slate-800">
            {spriteUrl && spriteOk ? (
              <img
                src={spriteUrl}
                alt={targetPokemon}
                onError={() => setSpriteOk(false)}
                className="max-h-[220px] scale-[2.1] sm:max-h-[360px] sm:scale-[3] md:max-h-[420px] md:scale-[3.5] origin-center image-rendering-pixelated [image-rendering:pixelated]"
              />
            ) : (
              <div className="px-3 text-center">
                <div className="text-base sm:text-lg font-black">No sprite found</div>
                <div className="mt-1 text-xs sm:text-sm text-slate-300">
                  Try a standard Pokémon name like ralts or poochyena.
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 sm:mt-4 text-center text-lg sm:text-xl font-black">
            {titleCasePokemonName(targetPokemon)}
          </div>
        </div>
      </div>
    </section>
  );
}