import React, { useState } from "react";
import Image from "next/image";
import { RegisterFormData } from "@/shared/types/register.types";
import { X } from "lucide-react";

interface DocumentUploadSectionProps {
  formData: RegisterFormData;
  setFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>;
  errors?: Record<string, string>;
}

const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({
  // formData,
  setFormData,
  errors,
}) => {
  const [previews, setPreviews] = useState<Record<string, string>>({});

  const handleFileChange = (field: keyof RegisterFormData, file: File | null) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, [field]: file }));
      setPreviews((prev) => ({ ...prev, [field]: previewUrl }));
    } else {
      // ลบไฟล์
      setFormData((prev) => ({ ...prev, [field]: null }));
      setPreviews((prev) => {
        const newPreviews = { ...prev };
        delete newPreviews[field as string];
        return newPreviews;
      });
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-bold text-[#65349C]">เอกสารประกอบพร้อมลงลายมือชื่อรับรองสำเนาถูกต้อง</h2>
      <p className="text-gray-600 dark:text-gray-300">
        กรุณาอัปโหลดเอกสารพร้อมลายเซ็นต์รับรองสำเนาถูกต้อง ระบบรองรับไฟล์ jpg หรือ png
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
        {[
          { label: "บัตรประชาชน", field: "citizenCard", detail: "พร้อมลายเซ็นต์รับรองสำเนาถูกต้อง", require: true },
          { label: "ถ่ายรูปตนเองกับบัตรประชาชน", field: "selfWithCard", detail: "", require: true},
          { label: "ทะเบียนบ้าน", field: "houseReg", detail: "", require: false },
          { label: "ใบเปลี่ยนชื่อ", field: "nameChange", detail: "ถ้ามี", require: false },
          { label: "เอกสารอื่นๆ", field: "otherDocs", detail: "ถ้ามี", require: false },
        ].map(({ label, field }) => {
          const previewUrl = previews[field];
          return (
            <div
              key={field}
              className="border border-gray-300 dark:border-gray-600 rounded-sm p-3 text-center bg-white dark:bg-gray-800 relative"
            >
              {previewUrl ? (
                <div className="relative h-32 w-full flex items-center justify-center">
                  <Image
                    src={previewUrl}
                    alt={label}
                    fill
                    className="object-contain rounded"
                  />
                  {
                    <button
                      type="button"
                      onClick={() => handleFileChange(field as keyof RegisterFormData, null)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition"
                    >
                      <X size={16} />
                    </button>
                  }
                  <p>ภาพถ่าย</p>
                </div>
              ) : (
                <label
                  className={`flex flex-col items-center justify-center h-32 w-full border-2 border-dashed rounded-sm cursor-pointer transition
                      ? "border-gray-300 bg-purple-50 cursor-not-allowed"
                      : "border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="text-3xl text-gray-400">+</span>
                  <span className="text-sm mt-1">{label}</span>
                  {/* <span className="">{detail}</span> */}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFileChange(
                        field as keyof RegisterFormData,
                        e.target.files?.[0] || null
                      )
                    }
                  />
                </label>
              )}
              {errors?.[field] && (
                <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentUploadSection;