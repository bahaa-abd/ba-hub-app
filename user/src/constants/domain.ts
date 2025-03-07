export const DEVELOPMENT_BASE_URL = import.meta.env
  .VITE_DEVELOPMENT_BASE_URL as string;
export const DEVELOPMENT_API_BASE_URL = import.meta.env
  .VITE_DEVELOPMENT_API_BASE_URL as string;

export const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL as string;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const NODE_ENV: "development" | "production" = import.meta.env
  .VITE_NODE_ENV as "development" | "production";
