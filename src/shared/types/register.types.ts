export interface RegisterFormData {
  title?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  formerFullName?: string;
  dob: string;
  dobDay?: string;
  dobMonth?: string;
  dobYear?: string;
  gender?: string;
  citizenId: string;
  nationalityType?: string;
  ethnicity?: string;
  laserId: string;
  citizenCard?: File | null;
  selfWithCard?: File | null;
  houseReg?: File | null;
  nameChange?: File | null;
  otherDocs?: File | null;

  houseNumber: string;
  building?: string;
  village?: string;
  alley?: string;
  road?: string;
  province: string;
  district: string;
  subDistrict: string;
  postalCode: string;
}
