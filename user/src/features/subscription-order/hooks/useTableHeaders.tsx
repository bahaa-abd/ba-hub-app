import { Role } from "constants/enums";
import "lib/i18next";
import { useTranslation } from "react-i18next";
import { storage } from "utils/storage";
const useTableHeader = () => {
  const { t: tCommon } = useTranslation();
  const { t } = useTranslation("subscription-order", { keyPrefix: "table" });
  return [
    t("organization"),
    t("plan"),
    t("status"),
    t("price"),
    storage.getRole() === Role.admin ? tCommon("action") : undefined,
  ];
};

export default useTableHeader;
