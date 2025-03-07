import "lib/i18next";
import { useTranslation } from "react-i18next";
const useTableHeader = () => {
  const { t: tCommon } = useTranslation();
  const { t } = useTranslation("plan", { keyPrefix: "table" });
  return [
    t("title"),
    t("description"),
    t("duration"),
    t("price"),
    tCommon("action"),
  ];
};

export default useTableHeader;
