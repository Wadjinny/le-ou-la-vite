import Fuse from "fuse.js";
import type { FuseResult } from "fuse.js";
import { useEffect, useRef, useState } from "react";
import { Search, Loader } from "lucide-react";
import { NavBar } from "../components/NavBar";

type WordEntry = {
  s: string;
  g: string;
  w: string;
};

const fuseOptions = {
  keys: ["s"],
};

function Word({
  genre,
  word,
  exact,
}: {
  genre: string;
  word: string;
  exact: boolean;
}) {
  const isFem = genre !== "m";
  const article = isFem ? "la" : "le";

  return (
    <div className={`sr-result ${exact ? `feature${isFem ? " fem" : ""}` : ""}`}>
      <div className="sr-result__row">
        <span className={`sr-result__article ${isFem ? "fem" : ""}`}>{article}</span>
        <p className="sr-result__word">{word}</p>
      </div>
      {exact && <p className="sr-result__meta">Correspondance exacte</p>}
    </div>
  );
}

const french_chars_simple: Record<string, string> = {
  à: "a",
  â: "a",
  ä: "a",
  ç: "c",
  é: "e",
  è: "e",
  ê: "e",
  ë: "e",
  î: "i",
  ï: "i",
  ô: "o",
  ö: "o",
  ù: "u",
  û: "u",
  ü: "u",
  ÿ: "y",
  œ: "oe",
  æ: "ae",
};

function SearchWords({ frenchDict }: { frenchDict: WordEntry[] }) {
  const WORD_PARAM = "word";
  const [fuse, setFuse] = useState<Fuse<WordEntry> | null>(null);
  const [searchInput, setSearchInput] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get(WORD_PARAM) ?? "";
  });
  const [searchResult, setSearchResult] = useState<FuseResult<WordEntry>[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const myIndex = Fuse.createIndex<WordEntry>(["s"], frenchDict);
    const new_fuse = new Fuse<WordEntry>(frenchDict, fuseOptions, myIndex);
    setFuse(new_fuse);
    inputRef.current?.focus();
  }, [frenchDict]);

  useEffect(() => {
    const trimmedSearch = searchInput.trim();
    if (!trimmedSearch) {
      setSearchResult([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeout = setTimeout(() => {
      if (!fuse) return;

      const normalizedSearch = trimmedSearch
        .toLowerCase()
        .replace(/[àâäçéèêëîïôöùûüÿœæ]/g, (char) => french_chars_simple[char]);

      const result = fuse.search(normalizedSearch);
      setSearchResult(result.slice(0, 5));
      setIsSearching(false);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchInput, fuse]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (searchInput) {
        params.set(WORD_PARAM, searchInput);
      } else {
        params.delete(WORD_PARAM);
      }
      const qs = params.toString();
      window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchInput]);

  const trimmed = searchInput.trim();
  const dictReady = frenchDict.length > 0 && fuse !== null;

  return (
    <>
      <NavBar />
      <main className="mx-auto flex w-full max-w-3xl flex-col px-4 pb-16 pt-4">
        <div className="sr-search mb-6">
          <Search className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Rechercher un nom…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Rechercher un nom"
          />
        </div>

        <div className="flex w-full flex-col items-center gap-3.5">
          {!trimmed && (
            <p className="py-8 text-center text-[13px]" style={{ color: "var(--g400)" }}>
              Tapez un mot pour voir s&apos;il prend le ou la.
            </p>
          )}

          {trimmed && (!dictReady || isSearching) && (
            <p
              className="flex items-center justify-center gap-2 py-8 text-[13px]"
              style={{ color: "var(--g500)" }}
            >
              <Loader className="h-4 w-4 animate-spin" style={{ color: "var(--indigo)" }} />
              Recherche…
            </p>
          )}

          {trimmed && dictReady && !isSearching && searchResult.length === 0 && (
            <div className="sr-card w-full max-w-md text-center">
              <p className="text-[14px] font-bold" style={{ color: "var(--g900)" }}>
                Aucun résultat
              </p>
              <p className="mt-1 text-[12.5px]" style={{ color: "var(--g500)" }}>
                Essayez une autre orthographe ou un synonyme.
              </p>
            </div>
          )}

          {trimmed &&
            dictReady &&
            !isSearching &&
            searchResult.map((result) => (
              <Word
                key={`${result.item.w}-${result.refIndex}`}
                genre={result.item.g}
                word={result.item.w}
                exact={trimmed.toLowerCase() === result.item.w.toLowerCase()}
              />
            ))}
        </div>
      </main>
    </>
  );
}

export default SearchWords;
