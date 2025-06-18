// components/CoinTable.tsx
import Image from "next/image";
import { Coin } from "@/types/type";



export default function CoinTable({ coins }: { coins: Coin[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-light overflow-hidden mt-36 sm:mt-44">
        <thead className="text-light">
          <tr>
            <th className="p-4">#</th>
            <th className="p-4">Coin</th>
            <th className="p-4">Price</th>
            <th className="p-4">1h %</th>
            <th className="p-4">24h %</th>
            <th className="p-4">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr
              key={coin.id}
              className="border-t border-yellow hover:bg-hover cursor-pointer"
            >
              <td className="p-4">{coin?.market_cap_rank}</td>
              <td className="p-4 flex items-center gap-2">
                <Image
                  src={coin?.image}
                  alt={coin?.name}
                  width={24}
                  height={24}
                />
                <span>{coin?.name}</span>
                <span className="text-yellow uppercase text-sm">
                  ({coin?.symbol})
                </span>
              </td>
              <td className="p-4">${coin?.current_price?.toLocaleString()}</td>
              <td
                className={`p-4 ${
                  coin.price_change_percentage_1h_in_currency === null || coin.price_change_percentage_1h_in_currency === undefined
                    ? ""
                    : coin.price_change_percentage_1h_in_currency >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {coin.price_change_percentage_1h_in_currency !== null && coin.price_change_percentage_1h_in_currency !== undefined
                  ? `${coin.price_change_percentage_1h_in_currency.toFixed(2)}%`
                  : "N/A"}
              </td>

              <td
                className={`p-4 ${
                  coin.price_change_percentage_24h === null
                    ? ""
                    : coin.price_change_percentage_24h >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {coin.price_change_percentage_24h !== null
                  ? `${coin.price_change_percentage_24h.toFixed(2)}%`
                  : "N/A"}
              </td>

              <td className="p-4">${coin.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
