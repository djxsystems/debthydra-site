export const SITE_NAME = "DebtHydra";
export const SITE_URL = "https://debthydra.com";
export const CONTACT_EMAIL = "hello@debthydra.com";
export const ORGANIZATION_NAME = "DebtHydra Editorial Team";

export function formatDisplayDate(value: string) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}
