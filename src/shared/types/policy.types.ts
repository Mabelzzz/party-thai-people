export interface PolicyDetail {
  /** รหัสนโยบายย่อย */
  id: number;

  /** ชื่อนโยบาย */
  title: string;

  /** คำอธิบายสั้น */
  description: string;

  /** รายละเอียดเชิงลึกของนโยบาย */
  details: string[];
}

export interface PolicyCategory {
  /** key ใช้ภายใน เช่น "protection" */
  key: string;

  /** slug สำหรับใช้เป็น URL เช่น "security" */
  slug: string;

  /** ชื่อหัวข้อหลัก เช่น Protection */
  title: string;

  /** คำอธิบายย่อย เช่น “คุ้มครองความเสี่ยงชีวิตฐานราก” */
  subtitle1: string;
  subtitle2: string;

  /** หมวดหมู่ เช่น “เศรษฐกิจ”, “การเมือง” */
  category: string;

  /** รูปภาพประกอบ (path หรือ URL) */
  image: string;

  /** รายการนโยบายในหมวดนั้น ๆ */
  policies: PolicyDetail[];
}

export interface PolicyData {
  /** วิสัยทัศน์หลัก */
  vision: string;

  /** Message House เช่น “คนไทยไม่ทิ้งกัน” */
  messageHouse: string;

  /** รายการคำสัญญา 3P */
  promises: PolicyCategory[];
}
