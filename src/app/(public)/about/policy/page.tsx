"use client";

import Image from "next/image";
import Link from "next/link";
import { policyData } from "@/shared/mock/policy";

export default function PolicyPage() {
  const policies = policyData.promises.map((p) => ({
    key: p.key,
    title: p.title,
    subtitle1: p.subtitle1,
    subtitle2: p.subtitle2,
    image: p.image,
    slug: p.slug,
    category: p.category,
  }));

  return (
    <div className="relative min-h-screen flex flex-col items-center text-center py-16 bg-gradient-to-b from-[#f4e8ff] via-[#f7f0ff] to-[#f9f6ff]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none"></div>

      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#65349C] mb-4 drop-shadow-sm relative z-10">
        นโยบายหลักของคณะคนไทย
      </h1>
      <p className="text-lg md:text-xl text-[#7a5ab5] mb-10 relative z-10">
        Message House: <span className="font-semibold">คนไทยไม่ทิ้งกัน</span>
      </p>

      {/* Vision Box */}
      <div className="relative z-10 backdrop-blur-md border border-[#e2d3f5] rounded-3xl shadow-xl px-10 py-10 max-w-4xl w-full mb-16">
        <h2 className="text-2xl font-bold text-[#65349C] mb-4">วิสัยทัศน์</h2>
        <p className="text-gray-800 text-lg leading-relaxed">
          ประเทศที่ทุกคนมีศักดิ์ศรี พึ่งพาตัวเองได้ และมีรัฐที่{" "}
          <span className="font-semibold text-[#65349C]">
            “ทำเลย รวดเร็วและโปร่งใส”
          </span>{" "}
          สำหรับประชาชน
        </p>
      </div>

      {/* Policy Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl px-6">
        {policies.map((policy) => {
          return (
            <Link
              key={policy.key}
              href={`/about/policy/${policy.slug}`}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-[#e4d5f5] hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={policy.image}
                  alt={policy.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold drop-shadow-lg text-center px-4">
                    {policy.category}
                  </h3>
                </div>
              </div>


              {/* Content */}
              <div className="p-6 flex flex-col items-center text-center">
                <div className="p-3 bg-gradient-to-r from-[#865ec1] to-[#b98ff7] rounded-sm mb-3">
                  <Image
                    src={`/${policy.key}.svg`}
                    alt={policy.title}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h4 className="text-lg font-semibold text-[#65349C] mb-2">
                  {policy.title}
                </h4>
                <p className="text-gray-700 text-base leading-relaxed mb-2">
                  {policy.subtitle1}
                </p>
                <p className="text-[#65349C] text-base font-medium leading-relaxed">
                  “{policy.subtitle2}”
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
