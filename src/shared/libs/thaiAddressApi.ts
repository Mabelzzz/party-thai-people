import { ProvinceTreeNode } from "@/shared/types/thaiAddress.types";

const URL_TREE =
  "https://raw.githubusercontent.com/kongvut/thai-province-data/refs/heads/master/api/latest/province_with_district_and_sub_district.json";

export async function getProvinceTreeLatest(): Promise<ProvinceTreeNode[]> {
  const res = await fetch(URL_TREE, { cache: "force-cache" });
  if (!res.ok) 
    throw new Error(`Failed to fetch: ${URL_TREE}`);
  
  const data = (await res.json()) as unknown;
  if (!Array.isArray(data)) {
    throw new Error("Invalid province tree payload");
  }

  return data as ProvinceTreeNode[];
}
