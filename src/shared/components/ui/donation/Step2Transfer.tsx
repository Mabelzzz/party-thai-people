"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Step2TransferProps {
  form: { amount: string; slip: File | null };
  setForm: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      citizenId: string;
      amount: string;
      slip: File | null;
    }>
  >;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Transfer({
  form,
  setForm,
  onNext,
  onBack,
}: Step2TransferProps) {
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setForm((prev) => ({ ...prev, slip: file }));
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleRemoveSlip = () => {
    setForm((prev) => ({ ...prev, slip: null }));
    setPreviewUrl(null);
  };

  const handleSubmit = () => {
    if (!form.amount || !form.slip) {
      setError("กรุณากรอกจำนวนเงินและแนบสลิปหลักฐานก่อนดำเนินการต่อ");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div
      className="
        flex flex-col justify-between
        bg-white rounded-2xl shadow-md border border-violet-100
        px-5 sm:px-8 py-6 sm:py-8
        space-y-8
        h-auto
        transition-all duration-300
      "
    >
      {/* 🔹 บัญชีสำหรับโอน */}
      <section className="space-y-3">
        <p className="font-semibold text-gray-700 text-lg sm:text-xl">
          บัญชีสำหรับโอนเงินบริจาค
        </p>

        <div
          className="
            border rounded-2xl p-5 sm:p-6 
            bg-gradient-to-br from-[#faf8ff] to-[#ffffff]
            border-violet-200 shadow-sm
            flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6
          "
        >
          <div className="relative w-16 h-16 flex-shrink-0 mx-auto sm:mx-0">
            <Image
              src="/scb.svg"
              alt="SCB"
              fill
              sizes="64px"
              className="object-contain"
            />
          </div>

          <div className="text-center sm:text-left text-[#65349C]">
            <p className="text-gray-900 font-bold text-lg sm:text-xl">
              ธนาคารไทยพาณิชย์ (SCB)
            </p>
            <p className="font-extrabold text-2xl sm:text-3xl mt-1 tracking-wider">
              365-287114-8
            </p>
            <p className="font-medium mt-2 text-gray-700 text-sm sm:text-base">
              ชื่อบัญชี: นายพิชญา ศรีเสน และ นายกฤษฎา เฉลิมสุข
            </p>
          </div>
        </div>
      </section>

      {/* 🔹 จำนวนเงิน */}
      <section>
        <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
          จำนวนเงินที่บริจาค (บาท)
        </label>
        <input
          type="text" // ✅ ใช้ text แทน number เพื่อควบคุม input เอง
          inputMode="numeric" // ✅ แสดงคีย์บอร์ดตัวเลขบนมือถือ
          placeholder="กรอกจำนวนเงินที่โอน"
          value={form.amount}
          onChange={(e) => {
            let value = e.target.value;

            // ✅ ลบทุกอักขระที่ไม่ใช่ตัวเลข
            value = value.replace(/\D/g, "");

            // ✅ ลบเลขศูนย์นำหน้า (เช่น 0005 → 5)
            if (value.length > 1 && value.startsWith("0")) {
              value = value.replace(/^0+/, "");
            }

            // ✅ ตั้งค่ากลับลง state
            setForm((prev) => ({ ...prev, amount: value }));
          }}
          className="
            w-full border rounded-lg px-4 py-3 text-base sm:text-lg text-gray-700
            focus:ring-2 focus:ring-[#65349C] focus:outline-none
            border-gray-300 transition-all placeholder:text-gray-400
          "
        />
      </section>

      {/* 🔹 แนบสลิป */}
      <section>
        <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">
          แนบหลักฐานการโอน (สลิป)
        </label>

        <AnimatePresence mode="wait">
          {!previewUrl ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="
                flex flex-col items-center justify-center border-2 border-dashed 
                border-[#65349C]/40 rounded-lg p-8 sm:p-10 bg-[#faf8ff]
                hover:bg-[#f4f0ff] transition cursor-pointer
              "
            >
              <label
                htmlFor="slip-upload"
                className="cursor-pointer flex flex-col items-center text-[#65349C] text-center"
              >
                <div className="w-14 h-14 mb-3 bg-[#65349C]/10 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <p className="font-semibold">คลิกเพื่อเลือกไฟล์สลิป</p>
                <p className="text-sm text-gray-500 mt-1">
                  รองรับไฟล์ภาพ .jpg .jpeg .png
                </p>
              </label>
              <input
                id="slip-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-2 relative w-full max-w-xs sm:max-w-sm mx-auto text-[#65349C]"
            >
              <Image
                src={previewUrl}
                alt="Slip Preview"
                width={300}
                height={400}
                className="rounded-lg border border-gray-300 shadow-sm object-contain w-full h-auto"
              />
              <motion.button
                type="button"
                onClick={handleRemoveSlip}
                whileTap={{ scale: 0.95 }}
                className="
                  absolute top-2 right-2 bg-white/90 hover:bg-white
                  text-[#65349C] text-xs font-semibold
                  px-2 py-1 rounded-md shadow-sm transition-all
                "
              >
                ลบรูป
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 🔹 Error */}
      {error && (
        <p className="text-red-500 text-center text-sm sm:text-base font-medium">
          {error}
        </p>
      )}

      {/* 🔹 ปุ่มนำทาง */}
      <div
        className="
          flex flex-col sm:flex-row justify-between gap-3 sm:gap-0
          pt-6 border-t border-gray-100
        "
      >
        <button
          onClick={onBack}
          className="
            px-6 py-3 rounded-lg border border-[#65349C] font-semibold 
            hover:bg-[#f5f0ff] text-[#65349C] transition-all
            w-full sm:w-auto
          "
        >
          ย้อนกลับ
        </button>
        <button
          onClick={handleSubmit}
          className="
            bg-[#65349C] hover:bg-[#542d85]
            text-white font-semibold
            px-6 py-3 rounded-lg shadow-md hover:shadow-lg
            transition-all
            w-full sm:w-auto
          "
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
}
