export type Shop = {
  id: string;
  name: string;
  region:
    | "north"
    | "northeast"
    | "central"
    | "east"
    | "west"
    | "south"
    | "bangkok";
  province: string;
  lat: number;
  lng: number;
  address?: string;
};
