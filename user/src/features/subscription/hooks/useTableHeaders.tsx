import "lib/i18next";
import { useTranslation } from "react-i18next";
const useTableHeader = () => {
  const { t } = useTranslation("subscription", { keyPrefix: "table" });
  return [
    t("organization"),
    t("plan"),
    t("status"),
    t("price"),
    t("expiresAt"),
  ];
};

export default useTableHeader;
