"use client";

import { useRef, useState } from "react";
import { validateCitizenId } from "@/shared/utils/validateCitizenId";

interface Step1UserInfoProps {
  form: {
    firstName: string;
    lastName: string;
    citizenId: string;
    amount: string;
    slip: File | null;
  };
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
}

export default function Step1UserInfo({
  form,
  setForm,
  onNext,
}: Step1UserInfoProps) {
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    citizenId: "",
  });

  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const citizenIdRef = useRef<HTMLInputElement | null>(null);

  // 🧮 Format เลขบัตรประชาชน
  const formatCitizenId = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 13);
    const parts = [];
    if (digits.length > 0) parts.push(digits.slice(0, 1));
    if (digits.length > 1) parts.push(digits.slice(1, 5));
    if (digits.length > 5) parts.push(digits.slice(5, 10));
    if (digits.length > 10) parts.push(digits.slice(10, 12));
    if (digits.length > 12) parts.push(digits.slice(12));
    return parts.join("-");
  };

  const handleNext = () => {
    const newErrors = { firstName: "", lastName: "", citizenId: "" };
    let valid = true;
    let firstErrorRef: HTMLInputElement | null = null;

    const cleanCitizenId = form.citizenId.replace(/\D/g, "");

    if (!form.firstName.trim()) {
      newErrors.firstName = "กรุณากรอกชื่อ";
      valid = false;
      if (!firstErrorRef) firstErrorRef = firstNameRef.current;
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "กรุณากรอกนามสกุล";
      valid = false;
      if (!firstErrorRef) firstErrorRef = lastNameRef.current;
    }

    if (!cleanCitizenId) {
      newErrors.citizenId = "กรุณากรอกเลขบัตรประชาชน";
      valid = false;
      if (!firstErrorRef) firstErrorRef = citizenIdRef.current;
    } else if (!validateCitizenId(cleanCitizenId)) {
      newErrors.citizenId = "เลขบัตรประชาชนไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง";
      valid = false;
      if (!firstErrorRef) firstErrorRef = citizenIdRef.current;
    }

    setErrors(newErrors);

    if (valid) {
      onNext();
    } else if (firstErrorRef) {
      firstErrorRef.scrollIntoView({ behavior: "smooth", block: "center" });
      firstErrorRef.focus({ preventScroll: true });
    }
  };

  const inputClass = (field: keyof typeof errors) =>
    `w-full border rounded-lg px-4 py-3 text-gray-700 placeholder:text-gray-400 
     focus:placeholder:text-gray-300 focus:ring-2 focus:outline-none 
     transition-all duration-200 text-base sm:text-lg ${
       errors[field]
         ? "border-red-500 focus:ring-red-300"
         : "border-gray-300 focus:ring-[#65349C]"
     }`;

  return (
    <div
      className="
        flex flex-col
        bg-white rounded-2xl shadow-md border border-violet-100
        p-2 sm:p-3 
        overflow-visible
        h-auto
      "
    >
      {/* 🔹 ส่วนฟอร์ม (auto height, ไม่จำกัดความสูง) */}
      <div
        className="
          flex-1 overflow-visible
          px-5 sm:px-8 py-6 sm:py-8
          space-y-6 sm:space-y-8
        "
      >
        {/* 🔸 ชื่อ - นามสกุล */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* ชื่อ */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
              ชื่อ
            </label>
            <input
              ref={firstNameRef}
              type="text"
              placeholder="กรอกชื่อจริง"
              value={form.firstName}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, firstName: e.target.value }))
              }
              className={inputClass("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.firstName}
              </p>
            )}
          </div>

          {/* นามสกุล */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
              นามสกุล
            </label>
            <input
              ref={lastNameRef}
              type="text"
              placeholder="กรอกนามสกุล"
              value={form.lastName}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, lastName: e.target.value }))
              }
              className={inputClass("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* 🔸 เลขบัตรประชาชน */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
            เลขบัตรประชาชน
          </label>
          <input
            ref={citizenIdRef}
            type="text"
            inputMode="numeric"
            placeholder="1-2345-67890-12-3"
            value={form.citizenId}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                citizenId: formatCitizenId(e.target.value),
              }))
            }
            className={inputClass("citizenId")}
          />
          {errors.citizenId && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.citizenId}
            </p>
          )}
        </div>
      </div>

      {/* 🔹 ปุ่ม “ถัดไป” — อยู่ใน card ตลอด */}
      <div className="flex justify-end px-5 sm:px-8 py-4 border-t border-gray-100 bg-white">
        <button
          onClick={handleNext}
          className="
            bg-[#65349C] hover:bg-[#542d85]
            text-white font-semibold 
            px-8 sm:px-10 py-3 sm:py-3 
            rounded-lg shadow-md hover:shadow-lg 
            transition-all duration-300
            w-full sm:w-auto
          "
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
}
