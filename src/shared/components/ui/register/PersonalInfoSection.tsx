import React from "react";
import { RegisterFormData } from "@/shared/types/register.types";
import InputField from "@/shared/components/ui/InputField";
import SelectField from "@/shared/components/ui/SelectField";

interface PersonalInfoSectionProps {
  formData: RegisterFormData;
  setFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>;
  errors: Record<string, string>;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  setFormData,
  errors,
}) => {
  return (
    <div className="space-y-4 text-gray-700">
      <h2 className="text-lg font-bold text-[#65349C]">
        ส่วนที่ 1 ข้อมูลส่วนบุคคล
      </h2>

      {/* Row 1: Title + Middle Name */}
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="คำนำหน้าชื่อ"
          required
          value={formData.title || ""}
          onChange={(v) => setFormData((prev) => ({ ...prev, title: v }))}
          options={[
            { label: "นาย", value: "นาย" },
            { label: "นางสาว", value: "นางสาว" },
            { label: "นาง", value: "นาง" },
          ]}
          error={errors.title}
        />

        <InputField
          label="ชื่อกลาง"
          value={formData.middleName || ""}
          onChange={(v) => setFormData((prev) => ({ ...prev, middleName: v }))}
        />
      </div>

      {/* Row 2: Firstname + Lastname */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="ชื่อ (ภาษาไทย)"
          required
          value={formData.firstName}
          onChange={(v) => setFormData((prev) => ({ ...prev, firstName: v }))}
          error={errors.firstName}
        />
        <InputField
          label="นามสกุล (ภาษาไทย)"
          required
          value={formData.lastName}
          onChange={(v) => setFormData((prev) => ({ ...prev, lastName: v }))}
          error={errors.lastName}
        />
      </div>

      {/* Row 3: Former full name */}
      <InputField
        label="ชื่อและนามสกุลเดิม (ถ้ามี)"
        value={formData.formerFullName || ""}
        onChange={(v) => setFormData((prev) => ({ ...prev, formerFullName: v }))}
      />

      {/* Row 4: Birthdate */}
      <InputField
        label="วันเดือนปีเกิด"
        required
        type="date"
        value={formData.dob || ""}
        onChange={(v) => setFormData((prev) => ({ ...prev, dob: v }))}
        error={errors.dob}
      />

      {/* Row 5: Gender */}
      <SelectField
        label="เพศ"
        required
        value={formData.gender || ""}
        onChange={(v) => setFormData((prev) => ({ ...prev, gender: v }))}
        options={[
          { label: "ชาย", value: "ชาย" },
          { label: "หญิง", value: "หญิง" },
          { label: "อื่นๆ", value: "อื่นๆ" },
        ]}
        error={errors.gender}
      />

      {/* Row 6: Citizen ID */}
      <InputField
        label="เลขประจำตัวประชาชน"
        required
        value={formData.citizenId}
        onChange={(v) => setFormData((prev) => ({ ...prev, citizenId: v }))}
        error={errors.citizenId}
        maxLength={13}
      />

      {/* Row 7: Nationality Type + Ethnicity */}
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="มีสัญชาติไทย"
          required
          value={formData.nationalityType || ""}
          onChange={(v) => setFormData((prev) => ({ ...prev, nationalityType: v }))}
          options={[
            { label: "โดยการเกิด", value: "โดยการเกิด" },
            { label: "แปลงสัญชาติ", value: "แปลงสัญชาติ" },
          ]}
          error={errors.nationalityType}
        />
        <InputField
          label="เชื้อชาติ"
          required
          value={formData.ethnicity || ""}
          onChange={(v) => setFormData((prev) => ({ ...prev, ethnicity: v }))}
          error={errors.ethnicity}
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;
