"use client";

import { useEffect, useState } from "react";

interface MadConverterProps {
  coinId: string;
  coinSymbol: string;
}

const fiatOptions = [
  { code: "usd", label: "USD" },
  { code: "eur", label: "EUR" },
  { code: "ngn", label: "NGN" },
  { code: "gbp", label: "GBP" },
];

export default function MadConverter({ coinId, coinSymbol }: MadConverterProps) {
  const [selectedFiat, setSelectedFiat] = useState("usd");
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState<number | null>(null);

  useEffect(() => {
    if (!coinId || !selectedFiat) return;

    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=${selectedFiat}`
    )
      .then((res) => res.json())
      .then((data) => {
        const rate = data[coinId]?.[selectedFiat];
        if (rate) {
          setConverted(amount * rate);
        }
      })
      .catch((err) => console.error("Conversion failed", err));
  }, [coinId, selectedFiat, amount]);

  return (
    <div className="mt-12">
      <p className="font-semibold text-2xl text-light pb-2 border-b border-hover mb-4">
        Mad Converter
      </p>
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
        {/* Fiat dropdown */}
        <select
          value={selectedFiat}
          onChange={(e) => setSelectedFiat(e.target.value)}
          className="p-2 rounded border border-yellow bg-background appearance-none text-light focus:outline-none focus:ring-2 focus:ring-yellow"
        >
          {fiatOptions.map((fiat) => (
            <option key={fiat.code} value={fiat.code}>
              {fiat.label}
            </option>
          ))}
          
        </select>

        {/* Amount input */}
        <input
          type="number"
          min="0"
          step="0.0001"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="p-2 rounded border border-yellow bg-background text-light"
        />
      </div>

      {/* Result */}
      <div className="mt-4">
        {converted !== null ? (
          <p className="text-light">
            {amount} {coinSymbol.toUpperCase()} ≈{" "}
            <span className="text-yellow">
              {converted.toLocaleString()} {selectedFiat.toUpperCase()}
            </span>
          </p>
        ) : (
          <p className="text-gray-500">Enter amount and select a currency.</p>
        )}
      </div>
    </div>
  );
}
