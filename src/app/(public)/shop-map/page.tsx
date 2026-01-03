"use client";
import dynamic from "next/dynamic";

const ThailandShopMapFeature = dynamic(
  () => import("@/shared/components/ui/shop-map/ThailandShopMapFeature"),
  { ssr: false }
);

export default function Page() {
  return (
    <main className="min-h-screen bg-[#faf8ff] flex flex-col items-center py-4">
      <ThailandShopMapFeature />
    </main>
  );
}
