export const WEBAPP_URL = process.env.NEXT_PUBLIC_WEBAPP_URL || `https://${process.env.VERCEL_URL}`;
export const IS_PRODUCTION = process.env.NODE_ENV === "production";
