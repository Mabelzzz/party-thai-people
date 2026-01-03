import React, { useEffect, useMemo, useState } from "react";
import { RegisterFormData } from "@/shared/types/register.types";
import InputField from "@/shared/components/ui/InputField";
import SelectField from "@/shared/components/ui/SelectField";
import {
  ProvinceTreeNode,
  DistrictNode,
  SubDistrictNode,
} from "@/shared/types/thaiAddress.types";
import { getProvinceTreeLatest } from "@/shared/libs/thaiAddressApi";
import { useAutoSaveForm } from "@/shared/hooks/useAutoSaveForm";

interface HomeAddressSectionProps {
  formData: RegisterFormData;
  setFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>;
  errors: Record<string, string>;
}

const HomeAddressSection: React.FC<HomeAddressSectionProps> = ({
  formData,
  setFormData,
  errors,
}) => {
  const [tree, setTree] = useState<ProvinceTreeNode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // เก็บ id สำหรับคุม dropdown ภายใน (type-safe)
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | undefined>(undefined);
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | undefined>(undefined);

  // Auto-save ฟอร์มนี้
  useAutoSaveForm<RegisterFormData>(
    "register_step2_form",
    formData,
    (loaded) => setFormData(loaded)
  );

  // โหลด tree ครั้งเดียว
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const data = await getProvinceTreeLatest();
        if (!cancelled) {
          // sort provinces เพื่อ UX ที่ดีขึ้น
          const sorted = data.slice().sort((a, b) =>
            (a.name_th || "").localeCompare(b.name_th || "", "th")
          );
          setTree(sorted);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // ให้ selectedProvinceId สอดคล้องกับ formData.province (ชื่อ)
  useEffect(() => {
    if (!formData.province) {
      setSelectedProvinceId(undefined);
      return;
    }
    const p = tree.find((x) => x.name_th === formData.province);
    setSelectedProvinceId(p?.id);
  }, [formData.province, tree]);

  // ให้ selectedDistrictId สอดคล้องกับ formData.district (ชื่อ)
  useEffect(() => {
    if (!formData.district || selectedProvinceId === undefined) {
      setSelectedDistrictId(undefined);
      return;
    }
    const districts = tree.find((p) => p.id === selectedProvinceId)?.districts ?? [];
    const d = districts.find((x) => x.name_th === formData.district);
    setSelectedDistrictId(d?.id);
  }, [formData.district, selectedProvinceId, tree]);

  // options
  const provinceOptions = useMemo(
    () =>
      tree.map((p) => ({
        label: p.name_th,
        value: String(p.id),
      })),
    [tree]
  );

  const districtOptions = useMemo(() => {
    if (selectedProvinceId === undefined) return [];
    const ds = tree.find((p) => p.id === selectedProvinceId)?.districts ?? [];
    const sorted = ds.slice().sort((a, b) =>
      (a.name_th || "").localeCompare(b.name_th || "", "th")
    );
    return sorted.map((d) => ({ label: d.name_th, value: String(d.id) }));
  }, [selectedProvinceId, tree]);

  const subDistrictOptions = useMemo(() => {
    if (selectedProvinceId === undefined || selectedDistrictId === undefined) return [];
    const d: DistrictNode | undefined = tree
      .find((p) => p.id === selectedProvinceId)
      ?.districts.find((x) => x.id === selectedDistrictId);
    const sds: SubDistrictNode[] = d?.sub_districts ?? [];
    const sorted = sds.slice().sort((a, b) =>
      (a.name_th || "").localeCompare(b.name_th || "", "th")
    );
    return sorted.map((s) => ({ label: s.name_th, value: String(s.id) }));
  }, [selectedProvinceId, selectedDistrictId, tree]);

  // handlers
  const handleProvinceChange = (provinceIdStr: string) => {
    const pid = provinceIdStr ? Number(provinceIdStr) : undefined;
    setSelectedProvinceId(pid);
    setSelectedDistrictId(undefined);

    const provinceName = pid
      ? tree.find((p) => p.id === pid)?.name_th ?? ""
      : "";

    // reset ลูกหลานในฟอร์ม
    setFormData((prev) => ({
      ...prev,
      province: provinceName,
      district: "",
      subDistrict: "",
      postalCode: "",
    }));
  };

  const handleDistrictChange = (districtIdStr: string) => {
    const did = districtIdStr ? Number(districtIdStr) : undefined;
    setSelectedDistrictId(did);

    const districtName =
      did && selectedProvinceId !== undefined
        ? tree
            .find((p) => p.id === selectedProvinceId)
            ?.districts.find((d) => d.id === did)?.name_th ?? ""
        : "";

    setFormData((prev) => ({
      ...prev,
      district: districtName,
      subDistrict: "",
      postalCode: "",
    }));
  };

  const handleSubDistrictChange = (subDistrictIdStr: string) => {
    const sid = subDistrictIdStr ? Number(subDistrictIdStr) : undefined;
    if (sid === undefined || selectedProvinceId === undefined || selectedDistrictId === undefined) {
      setFormData((prev) => ({ ...prev, subDistrict: "", postalCode: "" }));
      return;
    }
    const d = tree
      .find((p) => p.id === selectedProvinceId)
      ?.districts.find((x) => x.id === selectedDistrictId);

    const sd = d?.sub_districts.find((s) => s.id === sid);
    setFormData((prev) => ({
      ...prev,
      subDistrict: sd?.name_th ?? "",
      postalCode: sd ? String(sd.zip_code) : "",
    }));
  };

  return (
    <div className="space-y-4 text-gray-700">
      <h2 className="text-lg font-bold text-[#65349C]">
        ส่วนที่ 2 ที่อยู่ตามทะเบียนบ้าน
      </h2>

      {/* Row 1: บ้านเลขที่ + อาคาร */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="บ้านเลขที่"
          required
          value={formData.houseNumber || ""}
          onChange={(v) => setFormData({ ...formData, houseNumber: v })}
          error={errors.houseNumber}
        />
        <InputField
          label="หมู่บ้าน/อาคาร"
          value={formData.building || ""}
          onChange={(v) => setFormData({ ...formData, building: v })}
        />
      </div>

      {/* Row 2: หมู่ที่ + ตรอก/ซอย */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="หมู่ที่"
          value={formData.village || ""}
          onChange={(v) => setFormData({ ...formData, village: v })}
        />
        <InputField
          label="ตรอก/ซอย"
          value={formData.alley || ""}
          onChange={(v) => setFormData({ ...formData, alley: v })}
        />
      </div>

      {/* Row 3: ถนน */}
      <InputField
        label="ถนน"
        value={formData.road || ""}
        onChange={(v) => setFormData({ ...formData, road: v })}
      />

      {/* Row 4: จังหวัด + อำเภอ/เขต */}
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="จังหวัด"
          required
          value={selectedProvinceId ? String(selectedProvinceId) : ""}
          onChange={handleProvinceChange}
          options={provinceOptions}
          error={errors.province}
        />
        <SelectField
          label="อำเภอ/เขต"
          required
          value={selectedDistrictId ? String(selectedDistrictId) : ""}
          onChange={handleDistrictChange}
          options={districtOptions}
          error={errors.district}
        />
      </div>

      {/* Row 5: ตำบล/แขวง + รหัสไปรษณีย์ */}
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="ตำบล/แขวง"
          required
          value={
            // แปลงกลับเป็น id ของ sub-district ถ้าตรงชื่อ (เพื่อให้เป็น controlled)
            useMemo(() => {
              if (selectedProvinceId === undefined || selectedDistrictId === undefined) return "";
              const d = tree
                .find((p) => p.id === selectedProvinceId)
                ?.districts.find((x) => x.id === selectedDistrictId);
              const sd = d?.sub_districts.find((s) => s.name_th === formData.subDistrict);
              return sd ? String(sd.id) : "";
            }, [formData.subDistrict, selectedProvinceId, selectedDistrictId, tree])
          }
          onChange={handleSubDistrictChange}
          options={subDistrictOptions}
          error={errors.subDistrict}
        />
        <InputField
          label="รหัสไปรษณีย์"
          required
          value={formData.postalCode || ""}
          onChange={(v) => setFormData({ ...formData, postalCode: v })}
          error={errors.postalCode}
          maxLength={5}
        />
      </div>

      {loading && <p className="text-sm text-gray-500">กำลังโหลดข้อมูลจังหวัด…</p>}
    </div>
  );
};

export default HomeAddressSection;
