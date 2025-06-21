"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import Modal from "../Modal";
import SearchSkeleton from "../SearchSkeleton";

interface CoinResult {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  market_cap_rank: number | null;
}

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [trending, setTrending] = useState<CoinResult[]>([]);
  const [results, setResults] = useState<CoinResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const router = useRouter();

  // Fetch trending coins on open
  useEffect(() => {
    if (!open) return;
    fetch("https://api.coingecko.com/api/v3/search/trending")
      .then((res) => res.json())
      .then((data) => setTrending(data.coins.map((coin: any) => coin.item)))
      .catch((err) => console.error("Failed to fetch trending", err));
  }, [open]);

  // Debounced search
  useEffect(() => {
    if (term.trim() === "") {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      setLoading(true);
      fetch(`https://api.coingecko.com/api/v3/search?query=${term}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.coins || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Search failed", err);
          setLoading(false);
        });
    }, 400);

    return () => clearTimeout(timeout);
  }, [term]);

  const handleSelect = (id: string) => {
    setFadingOut(true);
    setTimeout(() => {
      setOpen(false);
      setTerm("");
      setFadingOut(false);
      router.push(`/main/coin-info/${id}`);
    }, 200); // Small delay for fade
  };

  const renderList = (coins: CoinResult[]) => (
    <ul className="space-y-2">
      {coins.map((coin) => (
        <li
          key={coin.id}
          className="flex items-center gap-2 p-2 rounded hover:bg-hover cursor-pointer"
          onClick={() => handleSelect(coin.id)}
        >
          <img src={coin.thumb} alt={coin.name} className="w-5 h-5" />
          <span className="text-sm font-medium text-light">
            {coin.name} ({coin.symbol.toUpperCase()})
          </span>
          {coin.market_cap_rank !== null && (
            <span className="ml-auto text-xs text-gray-400">
              #{coin.market_cap_rank}
            </span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div
        className="relative w-full bg-white mx-auto rounded-lg cursor-text"
        onClick={() => setOpen(true)}
      >
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow text-gray-800"
          readOnly
        />
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div
          className={`w-11/12 relative max-h-[75vh] overflow-y-auto scroll-hidden transition-opacity duration-200 ${
            fadingOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="w-full sticky top-0 bg-background z-10">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              autoFocus
              placeholder="Search for a coin..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-yellow text-gray-800 bg-white"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>

          {loading && <SearchSkeleton />}

          {!loading && term && results.length > 0 && (
            <div className="mt-4">
              <h2 className="text-sm text-yellow pb-1 border-b border-yellow mb-2">
                Search Results
              </h2>
              {renderList(results)}
            </div>
          )}

          {!loading && term && results.length === 0 && (
            <p className="text-sm text-gray-500 mt-4">No results found.</p>
          )}

          {!term && trending.length > 0 && (
            <div className="mt-4">
              <h2 className="text-sm text-yellow pb-1 border-b border-yellow mb-2">
                Trending Searches 🔥
              </h2>
              {renderList(trending)}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
