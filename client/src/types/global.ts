export const api =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEV_SERVER_URL
    : process.env.NEXT_PUBLIC_PROD_SERVER_URL;

export type Form = "login" | "register";
