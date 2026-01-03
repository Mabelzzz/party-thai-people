"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import BackButton from "@/shared/components/ui/BackButton";
import { policyData } from "@/shared/mock/policy";

export default function PolicyItemPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const rawId = params?.id;

  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug || "";
  const id = Array.isArray(rawId) ? rawId[0] : rawId || "";

  // ✅ ดึงข้อมูลจริงจาก policyData
  const category = policyData.promises.find((p) => p.slug === slug);
  const policyItem = category?.policies.find((pol) => pol.id === Number(id));

  // ✅ เก็บคอมเมนต์ใน state (ไม่บันทึกจริง)
  const [comments, setComments] = useState([
    { name: "สมชาย ใจดี", comment: "นโยบายดีมากครับ หวังว่าจะทำได้จริงนะครับ" },
    { name: "มาลี รักไทย", comment: "ชอบไอเดียมากค่ะ อยากเห็นประเทศไทยพัฒนาค่ะ" },
  ]);
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);

  if (!policyItem) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-2xl font-bold text-[#65349C]">ไม่พบนโยบายนี้</p>
        <BackButton href={`/about/policy/${slug}`} />
      </div>
    );
  }

  // ✅ เมื่อส่งคอมเมนต์
  const handleComment = () => {
    if (!comment.trim()) return;

    // เพิ่มคอมเมนต์ใหม่เข้า list (แสดงเฉพาะเครื่องนี้)
    const newComment = {
      name: "ประชาชน",
      comment: comment.trim(),
    };
    setComments((prev) => [newComment, ...prev]); // แสดงด้านบนสุด

    setShowModal(true);
    setComment("");
    setTimeout(() => setShowModal(false), 2000);
  };

  return (
    <div className="min-h-screen pb-20 relative">
      <BackButton href={`/about/policy/${slug}`} />

      {/* 🔹 Header */}
      <div className="max-w-4xl mx-auto mt-6 px-6">
        <h2 className="text-[#af78ee] text-lg font-semibold mb-1">นโยบาย</h2>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          {policyItem.title}
        </h1>

        <div className="mt-4 w-full aspect-[16/9] relative rounded-xl overflow-hidden shadow-md">
          <Image
            src={category?.image || "/images/default.jpg"}
            alt={policyItem.title}
            fill
            className="object-cover"
          />
        </div>

        {/* 🔹 Highlight */}
        <div className="bg-[#af78ee] text-white p-6 mt-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">HIGHLIGHT</h3>
          <p>{policyItem.description}</p>
        </div>

        {/* 🔹 Detail list */}
        <div className="mt-10 leading-relaxed space-y-3 text-[1rem]">
          {policyItem.details.map((line, i) => (
            <p key={i}>• {line}</p>
          ))}
        </div>
      </div>

      {/* 💬 Comment Section */}
      <div className="max-w-4xl mx-auto mt-16 px-6">
        <h2 className="text-2xl font-semibold text-[#af78ee] mb-4">
          แสดงความคิดเห็น
        </h2>
        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#af78ee] text-white flex items-center justify-center font-bold">
            ป
          </div>
          <div className="flex-1 text-[#af78ee]">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="เขียนความคิดเห็น..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#65349C] resize-none"
              rows={3}
            />
            <button
              onClick={handleComment}
              className="mt-2 px-4 py-2 bg-[#af78ee] text-white rounded-lg hover:bg-[#4f2f7f] transition"
            >
              แสดงความคิดเห็น
            </button>
          </div>
        </div>

        {/* ✅ แสดงคอมเมนต์ในเครื่อง */}
        <div className="space-y-6">
          {comments.map((c, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">
                {c.name[0]}
              </div>
              <div className="bg-gray-200 p-4 rounded-lg w-full">
                <p className="font-semibold text-sm text-[#65349C] mb-1">
                  {c.name}
                </p>
                <p className="text-sm text-gray-700">{c.comment}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Popup แจ้งเมื่อส่งคอมเมนต์ */}
        {showModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white text-[#65349C] px-6 py-5 rounded-xl shadow-xl border border-[#e4d5f5] scale-100 animate-pop text-center max-w-sm mx-auto">
              <p className="text-lg font-semibold mb-1">
                ✅ ระบบได้รับความคิดเห็นของท่านเรียบร้อยแล้ว
              </p>
              <p className="text-sm text-gray-600">
                ขอบพระคุณสำหรับข้อเสนอแนะอันมีคุณค่านี้
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ✨ Animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in;
        }
        .animate-pop {
          animation: popUp 0.2s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes popUp {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
