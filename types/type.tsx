// types/coin.ts
export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number | null;
  price_change_percentage_1h_in_currency?: number | null;
  market_cap_rank: number;
}
