"use client";
import React, { useMemo, useState } from "react";
import ShopSidebar from "./ShopSidebar";
import ShopMap from "./ShopMap";
import { MOCK_SHOPS } from "@/shared/mock/shopsData";

export default function ThailandShopMapFeature() {
  const [region, setRegion] = useState("");
  const [province, setProvince] = useState("");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return MOCK_SHOPS.filter((s) => {
      const byRegion = region ? s.region === region : true;
      const byProv = province ? s.province === province : true;
      const byQ = q ? `${s.name} ${s.province}`.toLowerCase().includes(q.toLowerCase()) : true;
      return byRegion && byProv && byQ;
    });
  }, [region, province, q]);

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-6 text-[#65349C]">
      {/* Layout */}
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[380px_1fr] lg:gap-6 min-h-screen lg:min-h-[calc(100vh-2rem)]">
        {/* Sidebar */}
        <div className="flex flex-col h-[50vh] sm:h-[60vh] lg:h-full">
          <ShopSidebar
            region={region}
            province={province}
            q={q}
            setRegion={setRegion}
            setProvince={setProvince}
            setQ={setQ}
            filtered={filtered}
          />
        </div>

        {/* Map */}
        <section className="relative w-full h-[50vh] sm:h-[60vh] lg:h-full">
          <ShopMap filtered={filtered} />
        </section>
      </div>
    </div>
  );
}
