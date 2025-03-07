import "lib/i18next";
import { useTranslation } from "react-i18next";
const useTableHeader = () => {
  const { t: tCommon } = useTranslation();
  const { t } = useTranslation("organization", { keyPrefix: "table" });
  return [
    t("name"),
    t("username"),
    t("status"),
    t("sessionHourlyRate"),
    tCommon("action"),
  ];
};

export default useTableHeader;
