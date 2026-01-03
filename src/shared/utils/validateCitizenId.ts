export function validateCitizenId(id: string): boolean {
  if (!/^\d{13}$/.test(id)) return false;

  const digits = id.split("").map(Number);
  let sum = 0;

  for (let i = 0; i < 12; i++) {
    sum += digits[i] * (13 - i);
  }

  const checkDigit = (11 - (sum % 11)) % 10;
  return checkDigit === digits[12];
}
