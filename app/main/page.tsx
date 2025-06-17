import { getCoins } from "@/lib/getCoin";
import CoinTable from "@/components/CoinTable";

export default async function MainLayout() {
  const coins = await getCoins();

  return (
    <div className="flex flex-col justify-center items-center px-4">
      <div className="max-w-[74.5rem] xl:max-w-[74rem] w-full">
        <CoinTable coins={coins} />
      </div>
    </div>
  );
}
