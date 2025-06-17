// lib/getCoins.ts
export async function getCoins(page: number = 1) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=false&price_change_percentage=1h,24h,7d`,
    { next: { revalidate: 90000 } }
  );

  if (!res.ok) throw new Error("Failed to fetch CoinGecko data");

  return res.json();
}
