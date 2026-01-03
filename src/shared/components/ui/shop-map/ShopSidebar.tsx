"use client";
import React from "react";
import { Search } from "lucide-react";
import { REGIONS, REGION_TO_PROVINCES, labelOfRegion } from "@/shared/utils/regions";
import { Shop } from "@/shared/types/shop.type";

type Props = {
  region: string;
  province: string;
  q: string;
  setRegion: (v: string) => void;
  setProvince: (v: string) => void;
  setQ: (v: string) => void;
  filtered: Shop[];
};

export default function ShopSidebar({
  region, province, q, setRegion, setProvince, setQ, filtered
}: Props) {
  const provinces = region ? REGION_TO_PROVINCES[region] : Object.values(REGION_TO_PROVINCES).flat();

  return (
    <aside className="bg-white border border-violet-100 rounded-xl shadow-sm p-4 sm:p-6 flex flex-col gap-4 order-1 lg:order-none lg:h-full overflow-y-auto">
      <h2 className="text-2xl font-extrabold text-[#65349C]">แผนที่ร้านค้าคนไทย</h2>
      <p className="text-gray-600 text-sm sm:text-base">ค้นหาจุดร้านค้าทั่วประเทศ</p>

      <div className="flex flex-col gap-3 mt-2">
        <label className="text-sm font-medium">ภาค</label>
        <select
          value={region}
          onChange={(e) => { setRegion(e.target.value); setProvince(""); }}
          className="p-2 rounded-lg border border-gray-200 text-sm sm:text-base"
        >
          <option value="">ทั้งหมด</option>
          {REGIONS.map(r => <option key={r.key} value={r.key}>{r.label}</option>)}
        </select>

        <label className="text-sm font-medium">จังหวัด</label>
        <select
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className="p-2 rounded-lg border border-gray-200 text-sm sm:text-base"
        >
          <option value="">ทั้งหมด</option>
          {provinces.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        {/* ช่องค้นหา */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="ค้นหาชื่อร้านหรือจังหวัด"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#65349C] focus:border-[#65349C] text-sm sm:text-base"
          />
        </div>

        <button
          onClick={() => { setRegion(""); setProvince(""); setQ(""); }}
          className="bg-[#65349C] text-white rounded-lg py-2 text-sm sm:text-base hover:opacity-90 transition"
        >
          ล้างตัวกรอง
        </button>
      </div>

      <div className="mt-3 max-h-[40vh] overflow-auto border rounded-lg">
        {filtered.length ? filtered.map(s => (
          <div key={s.id} className="p-3 border-b last:border-none hover:bg-violet-50/40 transition">
            <div className="font-semibold text-sm sm:text-base">{s.name}</div>
            <div className="text-sm text-gray-600">{s.province} · {labelOfRegion(s.region)}</div>
          </div>
        )) : (
          <div className="p-4 text-gray-400 text-center text-sm">ไม่พบร้านค้าตามตัวกรอง</div>
        )}
      </div>
    </aside>
  );
}
