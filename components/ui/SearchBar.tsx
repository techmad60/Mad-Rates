// components/SearchBar.tsx
"use client";

import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Modal from "../Modal";

interface TrendingCoin {
  item: {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
    market_cap_rank: number;
  };
}

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [trending, setTrending] = useState<TrendingCoin[]>([]);

  useEffect(() => {
    if (!open) return;

    fetch("https://api.coingecko.com/api/v3/search/trending")
      .then((res) => res.json())
      .then((data) => setTrending(data.coins || []))
      .catch((err) => console.error("Failed to fetch trending", err));
  }, [open]);

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
        <div className="w-11/12 relative">
          <div className="w-full sticky top-0 bg-background">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              autoFocus
              placeholder="Search for a coin..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow text-gray-800 bg-white"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>

          {term === "" && trending.length > 0 && (
            <div className="">
              <h2 className="text-sm text-yellow my-4 pb-1 border-b border-yellow">Trending Searches 🔥</h2>
              <ul className="space-y-2">
                {trending.map(({ item }) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-2 p-2 rounded hover:bg-hover cursor-pointer"
                  >
                    <img src={item.thumb} alt={item.name} className="w-5 h-5" />
                    <span className="text-sm font-medium text-light">
                      {item.name} ({item.symbol.toUpperCase()})
                    </span>
                    <span className="ml-auto text-xs text-gray-400">
                      #{item.market_cap_rank}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
