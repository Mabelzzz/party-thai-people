"use client";

import Image from "next/image";
import { ReceiptText } from "lucide-react";

interface Step3ConfirmProps {
  form: {
    firstName: string;
    lastName: string;
    citizenId: string;
    amount: string;
    slip: File | null;
  };
  onBack: () => void;
  onNext: () => void;
}

export default function Step3Confirm({ form, onBack, onNext }: Step3ConfirmProps) {
  const slipPreview = form.slip ? URL.createObjectURL(form.slip) : null;

  return (
    <div
      className="
        flex flex-col justify-between
        bg-white rounded-2xl shadow-md border border-violet-100
        px-5 sm:px-8 py-6 sm:py-8
        space-y-8
        transition-all duration-300
      "
    >
      {/* 🔹 คำอธิบาย */}
      <div className="text-center">
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          โปรดยืนยันข้อมูลการบริจาคก่อนส่งข้อมูล
        </p>
      </div>

      {/* 🔹 กล่องยืนยันข้อมูล */}
      <div
        className="
          p-5 sm:p-6
          bg-[#faf8ff] rounded-xl border border-violet-100 shadow-sm
          text-gray-700 text-sm sm:text-base
          space-y-4
        "
      >
        {/* 🧾 ข้อมูลผู้บริจาค */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-gray-600 sm:w-48">ชื่อ:</span>
            <span className="font-medium text-[#65349C] break-words">
              {form.firstName} {form.lastName}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-gray-600 sm:w-48">
              เลขบัตรประชาชน:
            </span>
            <span className="font-medium text-[#65349C] break-all">
              {form.citizenId}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-gray-600 sm:w-48">จำนวนเงิน:</span>
            <span className="font-medium text-[#65349C]">
              {Number(form.amount).toLocaleString()} บาท
            </span>
          </div>
        </div>

        {/* 🧾 สลิป Preview */}
        {form.slip && (
          <div className="pt-4 border-t border-violet-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 bg-[#65349C]/10 rounded-md">
                <ReceiptText className="w-5 h-5 text-[#65349C]" />
              </div>

              {/* Image + Info */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                {slipPreview && (
                  <div className="relative w-full sm:w-28 h-40 sm:h-36 rounded-md overflow-hidden border border-gray-200 shadow-sm mx-auto sm:mx-0">
                    <Image
                      src={slipPreview}
                      alt="Slip Preview"
                      fill
                      className="object-contain bg-white"
                      sizes="(max-width: 640px) 100vw, 200px"
                    />
                  </div>
                )}

                <div className="text-center sm:text-left">
                  <p className="text-sm text-gray-600">หลักฐานการโอน</p>
                  <p className="font-medium text-[#65349C] text-sm sm:text-base truncate max-w-[220px] sm:max-w-[280px]">
                    {form.slip.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🔹 ปุ่ม */}
      <div
        className="
          flex flex-col sm:flex-row justify-between gap-3 sm:gap-0
          pt-4 sm:pt-6 border-t border-gray-100
        "
      >
        <button
          onClick={onBack}
          className="
            px-6 py-3 rounded-lg border border-[#65349C]
            text-[#65349C] font-semibold hover:bg-[#f5f0ff]
            transition-all w-full sm:w-auto
          "
        >
          ย้อนกลับ
        </button>
        <button
          onClick={onNext}
          className="
            bg-[#65349C] hover:bg-[#542d85] text-white
            px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg
            transition-all w-full sm:w-auto
          "
        >
          ยืนยันการบริจาค
        </button>
      </div>
    </div>
  );
}
