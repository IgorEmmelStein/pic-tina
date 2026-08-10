const SCHOOL_RANDOM_ID = import.meta.env.SCHOOL_RANDOM_ID;

// Format the date to a string
function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString(undefined, options);
}
// Capitalize the first letter
function capitalize(str: string): string {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function validateRequestBody<T extends object>(
  body: Partial<T>,
  requiredKeys: (keyof T)[],
): string[] {
  const invalidKeys: string[] = [];

  for (const key of requiredKeys) {
    if (body[key] === undefined || body[key] === null) {
      invalidKeys.push(String(key));
    }
  }

  for (const key of Object.keys(body) as (keyof T)[]) {
    if (key === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(String(body[key]))) {
        invalidKeys.push(String(key));
      }
    }

    if (key === "confirm_email" && String(body[key]) !== "") {
      invalidKeys.push("The confirm_email prop is present: Bot detected.");
    }
  }

  return invalidKeys;
}

function generatePortalPostBody(body: any, campaign: string) {
  const portalBody = JSON.parse(JSON.stringify(body));

  const excludedFields = [
    "first_name",
    "last_name",
    "email",
    "phone",
    "confirm_email",
    "agree_to_terms_and_conditions",
  ];

  const metadata: any = {};

  for (const key in portalBody) {
    const value = portalBody[key];
    if (!excludedFields.includes(key)) {
      metadata[key] = value?.trim?.() ?? value;
    }
  }

  portalBody.campaign = campaign;
  portalBody.account_random_id = SCHOOL_RANDOM_ID;
  portalBody.metadata = metadata;

  return portalBody;
}

export const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text

export { formatDate, capitalize, validateRequestBody, generatePortalPostBody };
