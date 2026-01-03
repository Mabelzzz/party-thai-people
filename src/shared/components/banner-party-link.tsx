import React from 'react'
import { PUBLIC_ROUTES } from '../constants/menus.constants'
import Link from 'next/link'
import { policyData } from "@/shared/mock/policy";
import Image from "next/image";

export default function BannerPartyLink() {
  const policies = policyData.promises.map((p) => ({
    key: p.key,
    title: p.title,
    subtitle1: p.subtitle1,
    subtitle2: p.subtitle2,
    slug: p.slug,
    category: p.category,
  }));

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 py-16 md:py-24 overflow-hidden">
      {/* 🔹 Background Pattern */}
      <div className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"></div>

      {/* 🔹 Title */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-[#af78ee] mb-5 drop-shadow-sm relative z-10">
        พรรคคนไทย
      </h1>

      {/* 🔹 Vision */}
      <p className="text-lg md:text-2xl max-w-5xl leading-relaxed relative z-10 mb-8">
        ประเทศที่ทุกคนมีศักดิ์ศรี พึ่งพาตัวเองได้ และมีรัฐที่{" "}
        <span className="font-semibold text-[#af78ee]">
          “ทำเลย รวดเร็วและโปร่งใส”
        </span>{" "}
        สำหรับประชาชน
      </p>

      {/* 🔹 3 Promises (3P) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-6 relative z-10 max-w-7xl">
        {policies.map((policy) => (
          <div
            key={policy.key}
            className="bg-white/90 backdrop-blur-sm border border-[#e6d9f7] rounded-2xl p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-500 flex flex-col items-center text-center"
          >
            <div className="p-4 bg-gradient-to-r from-[#865ec1] to-[#b98ff7] rounded-lg mb-4 shadow-inner flex items-center justify-center">
              <Image
                src={`/${policy.key}.svg`}
                alt={policy.title}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>

            <h4 className="text-xl font-semibold text-[#65349C] mb-2">
              {policy.title}
            </h4>

            <p className="text-gray-700 text-base leading-relaxed mb-2">
              {policy.subtitle1}
            </p>

            <p className="text-[#65349C] text-base font-medium leading-relaxed">
              “{policy.subtitle2}”
            </p>
          </div>
        ))}
      </div>

      {/* 🔹 Links to People */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16 text-white max-w-6xl relative z-10">
        <Link
          href={PUBLIC_ROUTES.PERSON_BOARD}
          className="bg-ora-100 hover:bg-white hover:text-ora-100 transition-colors font-semibold p-4 rounded-lg flex justify-center items-center text-md md:text-xl"
        >
          กรรมการบริหาร และ บุคลากรพรรคคนไทย
        </Link>

        <Link
          href={PUBLIC_ROUTES.PERSON_PARLIAMENT}
          className="bg-ora-100 hover:bg-white hover:text-ora-100 transition-colors font-semibold p-4 rounded-lg flex justify-center items-center text-md md:text-xl"
        >
          สมาชิกสภาผู้แทนราษฎร พรรคคนไทย
        </Link>
      </div>
    </section>
  )
}
