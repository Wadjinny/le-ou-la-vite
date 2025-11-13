import Fuse from "fuse.js";
import type { FuseResult } from "fuse.js";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
type WordEntry = {
    s: string;
    g: string;
    w: string;
};

const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: true,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.8,
    // distance: 100,
    // useExtendedSearch: true,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: ["s"],
};

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
function SearchWords() {
    const WORD_PARAM = "word";
    const [fuse, setFuse] = useState<Fuse<WordEntry> | null>(null);
    const [search, setSearch] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get(WORD_PARAM) ?? "";
    });
    const [searchResult, setSearchResult] = useState<FuseResult<WordEntry>[]>([]);
    // create ref to store the input element
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const link = "french-words.json"
        // get vite base url
        // const base_url = import.meta.env.BASE_URL;
        fetch(link, { signal })
            .then((response) => response.json())
            .then((data) => {
                const myIndex = Fuse.createIndex<WordEntry>(["s"], data);
                const new_fuse = new Fuse<WordEntry>(data, fuseOptions, myIndex);
                setFuse(new_fuse);
            })
            .catch((error) => {
                throw Error(error);
            });

        inputRef.current?.focus();
        return () => {
            controller.abort();
        };
    }, [inputRef]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!fuse) return;

            const trimmedSearch = search.trim();
            if (!trimmedSearch) {
                setSearchResult([]);
                return;
            }

            const normalizedSearch = trimmedSearch
                .toLowerCase()
                .replace(/[àâäçéèêëîïôöùûüÿœæ]/g, (char) => french_chars_simple[char]);

            const result = fuse.search(normalizedSearch);

            setSearchResult(result.slice(0, 5));
        }, 500);
        return () => {
            clearTimeout(timeout);
        };
    }, [search, fuse]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(window.location.search);
            params.set(WORD_PARAM, search);
            window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
        }, 500);
        return () => {
            clearTimeout(timeout);
        };
    }, [search]);


    return (
        <>
            <div className="bg-slate-200 text-center text-4xl py-4 border-b-2 border-slate-200">
                <h1 className="text-4xl text-slate-600 font-light font-serif">Le ou La</h1>
            </div>
            <div id="container" className="container mx-auto flex flex-col py-4 px-4">
                <div id="input" className="flex flex-row items-center justify-center">
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full text-2xl text-slate-800 text-center focus:outline-slate-300 focus:ring-0 rounded-md p-2 bg-white border-2 border-slate-300"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <FaSearch className="text-4xl text-slate-400 p-2" />
                </div>
                <div className="gap-2 pt-2 items-center text-2xl flex flex-col w-full">
                    {searchResult.map((result, index) => {
                        return <Word key={index} genre={result.item.g} word={result.item.w} userInput={search} />;
                    })}
                    {searchResult.length == 0 ? <p className="text-2xl">Start by typing ...</p> : ""}
                </div>
            </div>
        </>
    );
}

export default SearchWords;

function Word({ genre, word, userInput }: { genre: string; word: string; userInput: string }) {
    const prenom =
        genre === "m" ? (
            <b className="text-blue-400 font-bold text-4xl mr-2 capitalize">le</b>
        ) : (
            <b className="text-red-300 font-bold text-4xl mr-2 capitalize">la</b>
        );
    const isExactMatch = userInput === word;
    return (
        <div className={`flex justify-center rounded-md border-2 border-slate-300 text-center bg-slate-200 py-5 ${isExactMatch ? "bg-green-200 w-full h-60" : "w-1/2 min-w-s"}`}>
            <p className={`capitalize ${isExactMatch ? "font-bold text-4xl" : ""}`}>
                <span>{prenom}</span>
                <span className="capitalize">{word}</span>
            </p>
        </div>
    );
}
