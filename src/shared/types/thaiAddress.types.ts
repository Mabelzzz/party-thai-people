export interface SubDistrictNode {
  id: number;
  name_th: string;
  name_en: string;
  zip_code: number;
}

export interface DistrictNode {
  id: number;
  name_th: string;
  name_en: string;
  sub_districts: SubDistrictNode[];
}

export interface ProvinceTreeNode {
  id: number;
  name_th: string;
  name_en: string;
  geography_id?: number;
  districts: DistrictNode[];
}
