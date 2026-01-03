"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PersonalInfoSection from "@/shared/components/ui/register/PersonalInfoSection";
import HomeAddressSection from "@/shared/components/ui/register/HomeAddressSection";
import DocumentUploadSection from "@/shared/components/ui/register/DocumentUploadSection";
import { RegisterFormData } from "@/shared/types/register.types";

function RegisterStep2Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const formRef = useRef<HTMLFormElement>(null);
  const personalInfoRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    citizenId: "",
    laserId: "",
    citizenCard: null,
    selfWithCard: null,
    houseReg: null,
    nameChange: null,
    otherDocs: null,
    title: "",
    gender: "",
    formerFullName: "",
    nationalityType: "",
    ethnicity: "",
    houseNumber: "",
    building: "",
    village: "",
    alley: "",
    road: "",
    province: "",
    district: "",
    subDistrict: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) newErrors.firstName = "กรุณากรอกชื่อจริง";
    if (!formData.lastName) newErrors.lastName = "กรุณากรอกนามสกุล";
    if (!formData.dob) {
      newErrors.dob = "กรุณากรอกวันเกิด";
    } else if (new Date(formData.dob) > new Date()) {
      newErrors.dob = "วันเกิดไม่สามารถเป็นอนาคตได้";
    }
    if (!/^[0-9]{13}$/.test(formData.citizenId)) {
      newErrors.citizenId = "เลขบัตรประชาชนต้องมี 13 หลัก";
    }
    if (!/^[A-Z]{2}[0-9]{10}$/.test(formData.laserId)) {
      newErrors.laserId = "Laser ID ต้องเป็น 2 ตัวอักษรภาษาอังกฤษ + 10 ตัวเลข";
    }
    if (!formData.houseNumber) newErrors.houseNumber = "กรุณากรอกบ้านเลขที่";
    if (!formData.province) newErrors.province = "กรุณากรอกจังหวัด";
    if (!formData.district) newErrors.district = "กรุณากรอกอำเภอ/เขต";
    if (!formData.subDistrict) newErrors.subDistrict = "กรุณากรอกตำบล/แขวง";
    if (!formData.postalCode) newErrors.postalCode = "กรุณากรอกรหัสไปรษณีย์";
    if (!formData.citizenCard) newErrors.citizenCard = "กรุณาอัปโหลดบัตรประชาชน";
    if (!formData.selfWithCard) newErrors.selfWithCard = "กรุณาอัปโหลดรูปถ่ายคู่กับบัตรประชาชน";

    setErrors(newErrors);

    // Scroll to the related section
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.firstName || newErrors.lastName || newErrors.dob || newErrors.citizenId || newErrors.laserId) {
        personalInfoRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (newErrors.houseNumber || newErrors.province || newErrors.district || newErrors.subDistrict || newErrors.postalCode) {
        addressRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (newErrors.citizenCard || newErrors.selfWithCard) {
        documentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const queryData = Object.fromEntries(searchParams.entries());
    setFormData((prev) => ({
      ...prev,
      ...queryData,
    }));
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && checkedOne && checkedTwo) {
      setShowSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6 text-gray-700 relative">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-[#65349C] mb-6 text-center">
          ข้อมูลการสมัครสมาชิก
        </h1>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <div ref={documentRef}>
            <DocumentUploadSection formData={formData} setFormData={setFormData} errors={errors} />
          </div>

          <div ref={personalInfoRef}>
            <PersonalInfoSection formData={formData} setFormData={setFormData} errors={errors} />
          </div>

          <div ref={addressRef}>
            <HomeAddressSection formData={formData} setFormData={setFormData} errors={errors} />
          </div>

          <div className="mt-6 space-y-2">
            <h2 className="text-lg font-bold text-[#65349C]">
              ข้อความยืนยันถ้อยแถลง
            </h2>
            <div className="space-y-2">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  className="mr-2 mt-1"
                  checked={checkedOne}
                  onChange={(e) => setCheckedOne(e.target.checked)}
                />
                ข้าพเจ้ายืนยันว่าข้อมูลที่กรอกเป็นความจริง และยอมให้พรรคประชาชนใช้ข้อมูลในการติดต่อสื่อสาร
              </label>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  className="mr-2 mt-1"
                  checked={checkedTwo}
                  onChange={(e) => setCheckedTwo(e.target.checked)}
                />
                ข้าพเจ้าอนุญาตให้พรรคประชาชนเก็บข้อมูลและปฏิบัติตามข้อกฎหมายคุ้มครองข้อมูลส่วนบุคคล
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={!(checkedOne && checkedTwo)}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              !(checkedOne && checkedTwo)
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#65349C] text-white hover:bg-[#532c85]"
            }`}
          >
            ยืนยันข้อมูล
          </button>
        </form>
      </div>

      {showSuccess && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              สมัครสมาชิกสำเร็จ!
            </h2>
            <p className="text-gray-700">
              ระบบจะพาคุณไปยังหน้าแรกภายในไม่กี่วินาที...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterStep2Page;