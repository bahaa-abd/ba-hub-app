import "lib/i18next";
import { useTranslation } from "react-i18next";
const useTableHeader = () => {
  const { t: tCommon } = useTranslation();
  const { t } = useTranslation("dessert", { keyPrefix: "table" });
  return [t("name"), t("type"), t("price"), tCommon("action")];
};

export default useTableHeader;
