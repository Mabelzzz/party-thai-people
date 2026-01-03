"use client";

import Link from "next/link";

export default function DonationHero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 py-32">
      {/* 🖼️ พื้นหลัง */}
      <div className="absolute inset-0 bg-[url('/images/donate-bg.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-[rgba(90,46,145,0.4)]" />

      {/* กล่องข้อความ */}
      <div className="relative z-10 bg-white rounded-2xl shadow-lg p-10 max-w-2xl text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#65349C] mb-4">
          ร่วมเป็นส่วนหนึ่งในการสร้าง “พรรคคนไทย”
        </h1>

        <p className="text-gray-600 leading-relaxed mb-6">
          ทุกยอดบริจาค คือพลังในการสร้างพรรคการเมืองของประชาชน เพื่อความเปลี่ยนแปลงที่ยั่งยืนและโปร่งใส
          เพราะอนาคตไม่ใช่ของใครคนใดคนหนึ่ง แต่เป็นของ
          <span className="text-[#65349C]"> “เราทุกคน”</span>
        </p>

        {/* ปุ่มลิงก์ไปหน้า /donation/now */}
        <Link
          href="/donation/now"
          className="inline-block bg-[#65349C] hover:bg-[#542d85] text-white font-semibold px-10 py-3 rounded-lg transition-all duration-300 shadow-md"
        >
          บริจาค
        </Link>
      </div>
    </section>
  );
}
