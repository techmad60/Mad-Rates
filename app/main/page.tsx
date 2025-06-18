// app/main/page.tsx
import { Suspense } from "react";
import MainClient from "@/components/MainPage";
import CoinTableSkeleton from "@/components/SkeletonTable";

export default function MainPage() {
  return (
    <Suspense fallback={<div><CoinTableSkeleton/></div>}>
      <MainClient />
    </Suspense>
  );
  
}
