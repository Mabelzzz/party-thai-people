export const REGIONS = [
  { key: "north", label: "ภาคเหนือ" },
  { key: "northeast", label: "ภาคตะวันออกเฉียงเหนือ" },
  { key: "central", label: "ภาคกลาง" },
  { key: "east", label: "ภาคตะวันออก" },
  { key: "west", label: "ภาคตะวันตก" },
  { key: "south", label: "ภาคใต้" },
  { key: "bangkok", label: "กรุงเทพมหานคร" },
];

export const REGION_TO_PROVINCES: Record<string, string[]> = {
  north: ["เชียงใหม่", "เชียงราย", "ลำพูน", "ลำปาง", "แพร่", "น่าน", "แม่ฮ่องสอน", "พะเยา", "อุตรดิตถ์"],
  northeast: ["ขอนแก่น", "อุดรธานี", "นครราชสีมา", "อุบลราชธานี"],
  central: ["พระนครศรีอยุธยา", "นครปฐม", "ลพบุรี"],
  east: ["ชลบุรี", "ระยอง", "จันทบุรี"],
  west: ["กาญจนบุรี", "ราชบุรี", "เพชรบุรี"],
  south: ["ภูเก็ต", "สุราษฎร์ธานี", "สงขลา"],
  bangkok: ["กรุงเทพมหานคร"],
};

export function labelOfRegion(key: string) {
  return REGIONS.find((r) => r.key === key)?.label || "-";
}
