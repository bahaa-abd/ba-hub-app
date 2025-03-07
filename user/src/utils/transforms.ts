import i18n from "lib/i18next";
import { LocalString } from "types/api";

export const objectToFormData = (object: { [k: string]: any }) => {
  const formData = new FormData();
  for (const key in object) {
    Array.isArray(object[key])
      ? object[key].forEach((value: string | Blob) =>
          formData.append(key, value)
        )
      : formData.append(key, object[key]);
  }
  return formData;
};
export function getCurrencySign(locale: string) {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "SYP",
  });
  const parts = formatter.formatToParts(1); // Format a dummy value to extract currency sign
  const currencySign = parts.find((part) => part.type === "currency")?.value;
  return currencySign ?? "SYP";
}

export const priceFormatter = new Intl.NumberFormat(i18n.language, {
  style: "currency",
  currency: "SYP",
});

export const diffInDays = (date: string) =>
  Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

export const transformFiled = (item: LocalString) => {
  return item[`${i18n.language as keyof LocalString}`] as string;
};

export const transformKey = (key: string) => {
  return `${key}.${i18n.language}`;
};
