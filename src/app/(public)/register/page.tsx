"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import InputField from '@/shared/components/ui/InputField'
import LaserIdInfo from '@/shared/components/ui/register/LaserIdInfo'
import { RegisterFormData } from '@/shared/types/register.types'
import { validateCitizenId } from '@/shared/utils/validateCitizenId'

type Step1Data = Pick<
  RegisterFormData,
  "firstName" | "middleName" | "lastName" | "dob" | "citizenId" | "laserId"
>;

function RegisterPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const firstNameRef = useRef<HTMLDivElement>(null);
  const lastNameRef = useRef<HTMLDivElement>(null);
  const dobRef = useRef<HTMLDivElement>(null);
  const citizenIdRef = useRef<HTMLDivElement>(null);
  const laserIdRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<Step1Data>({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    citizenId: "",
    laserId: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ ฟังก์ชันตรวจสอบความถูกต้อง + scroll ไปยัง error แรก
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) newErrors.firstName = "กรุณากรอกชื่อจริง";
    if (!formData.lastName) newErrors.lastName = "กรุณากรอกนามสกุล";

    if (!formData.dob) {
      newErrors.dob = "กรุณากรอกวันเกิด";
    } else {
      const dob = new Date(formData.dob);
      if (dob > new Date()) newErrors.dob = "วันเกิดไม่สามารถเป็นอนาคตได้";
    }

    if (!validateCitizenId(formData.citizenId)) {
      newErrors.citizenId = "เลขบัตรประชาชนไม่ถูกต้อง";
    }

    if (!/^[A-Z]{2}[0-9]{10}$/.test(formData.laserId)) {
      newErrors.laserId = "Laser ID ต้องเป็น 2 ตัวอักษรภาษาอังกฤษ + 10 ตัวเลข";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (newErrors.firstName) {
        firstNameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (newErrors.lastName) {
        lastNameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (newErrors.dob) {
        dobRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (newErrors.citizenId) {
        citizenIdRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (newErrors.laserId) {
        laserIdRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // ส่งเฉพาะฟิลด์ของสเต็ปนี้ไปเป็น query
      const query = new URLSearchParams(formData as Record<string, string>).toString();
      router.push(`/register/step2?${query}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-[#65349C] mb-6 text-center">
          สมัครสมาชิกคณะคนไทย
        </h1>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <div ref={firstNameRef}>
            <InputField
              label="ชื่อ (ภาษาไทย)"
              required
              value={formData.firstName}
              onChange={(v) => setFormData({ ...formData, firstName: v })}
              error={errors.firstName}
            />
          </div>

          <InputField
            label="ชื่อกลาง (ถ้ามี)"
            value={formData.middleName || ""}
            onChange={(v) => setFormData({ ...formData, middleName: v })}
          />

          <div ref={lastNameRef}>
            <InputField
              label="นามสกุล (ภาษาไทย)"
              required
              value={formData.lastName}
              onChange={(v) => setFormData({ ...formData, lastName: v })}
              error={errors.lastName}
            />
          </div>

          <div ref={dobRef}>
            <InputField
              label="วันเดือนปีเกิด"
              required
              type="date"
              value={formData.dob}
              onChange={(v) => setFormData({ ...formData, dob: v })}
              error={errors.dob}
            />
          </div>

          <div ref={citizenIdRef}>
            <InputField
              label="เลขประจำตัวประชาชน"
              required
              value={formData.citizenId}
              maxLength={13}
              onChange={(v) => setFormData({ ...formData, citizenId: v })}
              error={errors.citizenId}
            />
          </div>

          <div ref={laserIdRef}>
            <InputField
              label="Laser ID"
              required
              value={formData.laserId}
              maxLength={12}
              placeholder="เช่น AB1234567890"
              onChange={(v) =>
                setFormData({ ...formData, laserId: v.toUpperCase() })
              }
              error={errors.laserId}
            />
          </div>

          <LaserIdInfo />

          <button
            type="submit"
            className="w-full py-3 bg-[#65349C] text-white font-semibold rounded-lg hover:bg-[#532c85] transition"
          >
            ดำเนินการต่อ
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
