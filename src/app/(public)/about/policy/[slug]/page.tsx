"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import BackButton from "@/shared/components/ui/BackButton";
import { policyData } from "@/shared/mock/policy";

export default function PolicyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slugParam = params?.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam || "";

  // ✅ ดึงข้อมูลจาก policyData จริง
  const selectedPolicy = policyData.promises.find((p) => p.slug === slug);

  // ✅ ถ้าไม่พบ slug ให้แสดงหน้า default
  if (!selectedPolicy) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <p className="text-2xl font-bold text-[#65349C]">ไม่พบนโยบายที่เลือก</p>
        <BackButton href="/about/policy" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      {/* 🔹 Back Button */}
      <BackButton href="/about/policy" />

      {/* 🔹 Banner Section */}
      <div className="relative w-full h-72 sm:h-96 mt-4">
        <Image
          src={selectedPolicy.image}
          alt={selectedPolicy.category}
          fill
          className="object-cover brightness-90"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl font-bold drop-shadow-md">
            {selectedPolicy.category}
          </h1>
          <p className="mt-3 text-lg opacity-90 max-w-2xl">
            {selectedPolicy.subtitle1} – “{selectedPolicy.subtitle2}”
          </p>
        </div>
      </div>

      {/* 🔹 Policy Cards */}
      <div className="max-w-6xl mx-auto mt-12 px-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {selectedPolicy.policies.map((p) => (
          <div
            key={p.id}
            onClick={() =>
              router.push(`/about/policy/${slug}/${p.id}`)
            }
            className="cursor-pointer bg-white border border-[#e9d9f7] rounded-xl shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-[#65349C] mb-2">
              {p.title}
            </h2>
            <p className="text-gray-600 text-sm">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
