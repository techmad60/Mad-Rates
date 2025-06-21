import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import MadConverter from "@/components/MadConverter";
import MadIndex from "@/components/MadIndex";
import CoinInfoSkeleton from "@/components/CoinInfoSkeleton";

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
    high_24h: { usd: number };
    low_24h: { usd: number };
    price_change_percentage_24h: number;
  };
  image: { small: string };
}

async function getCoinData(id: string): Promise<CoinData> {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
  if (!res.ok) throw new Error("Failed to fetch coin data");
  return res.json();
}

export default async function CoinInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let coin: CoinData | null = null;

  try {
    coin = await getCoinData(id);
  } catch {}

  if (!coin) {
    return <CoinInfoSkeleton />;
  }

  const price = coin.market_data.current_price.usd.toLocaleString();
  const priceChange = coin.market_data.price_change_percentage_24h;
  const isUp = priceChange >= 0;

  return (
    <div className="flex flex-col items-center justify-center mt-32 bg-background p-4 sm:px-6 md:px-0 lg:py-4">
      <div className="flex flex-col max-w-[74.5rem] xl:max-w-[74rem] w-full font-sans">
        <div className="flex flex-col">
          <div className="flex flex-col space-y-1.5">
            <div className="font-sans text-[1.25rem] flex space-x-4 mt-3 items-center">
              <img src={coin.image.small} alt={coin.name} className="w-8 h-8" />
              <p className="text-light font-bold">{coin.name}</p>
              <p className="text-yellow">{coin.symbol.toUpperCase()} Price</p>
              <p className="text-light">#{coin.market_cap_rank}</p>
            </div>

            <div className="flex space-x-4 items-center">
              <p className="font-bold text-3xl tracking-wide text-light">
                ${price}
              </p>
              <p
                className={`flex items-center ${
                  isUp ? "text-green-500" : "text-red-500"
                } font-semibold`}
              >
                {isUp ? (
                  <IoMdArrowDropup className="text-3xl" />
                ) : (
                  <IoMdArrowDropdown className="text-3xl" />
                )}
                {priceChange.toFixed(2)}%
              </p>
              <p className="text-light font-semibold">(24hr)</p>
            </div>

            <p className="text-base text-light">
              1.0000{" "}
              <span className="text-yellow">{coin.symbol.toUpperCase()}</span>
            </p>
          </div>

          <div className="mt-12">
            <p className="font-semibold text-2xl text-light pb-2 border-b border-hover">
              {coin.name} Statistics
            </p>

            <div className="flex justify-between py-3 border-b border-hover">
              <p className="text-yellow">Market Cap</p>
              <p className="text-light font-medium">
                ${coin.market_data.market_cap.usd.toLocaleString()}
              </p>
            </div>
            <div className="flex justify-between py-3 border-b border-hover">
              <p className="text-yellow">24 Hour Trading Vol</p>
              <p className="text-light font-medium">
                ${coin.market_data.total_volume.usd.toLocaleString()}
              </p>
            </div>
            <div className="flex justify-between py-3 border-b border-hover">
              <p className="text-yellow">Circulating Supply</p>
              <p className="text-light font-medium">
                {coin.market_data.circulating_supply.toLocaleString()}
              </p>
            </div>
            <div className="flex justify-between py-3 border-b border-hover">
              <p className="text-yellow">Total Supply</p>
              <p className="text-light font-medium">
                {coin.market_data.total_supply?.toLocaleString() || "N/A"}
              </p>
            </div>
            <div className="flex justify-between py-3 border-b border-hover">
              <p className="text-yellow">Max Supply</p>
              <p className="text-light font-medium">
                {coin.market_data.max_supply?.toLocaleString() || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div>
          <MadConverter coinId={coin.id} coinSymbol={coin.symbol} />
          <MadIndex
            high24h={coin.market_data.high_24h.usd}
            low24h={coin.market_data.low_24h.usd}
            coinSymbol={coin.symbol}
          />
        </div>
      </div>
    </div>
  );
}
