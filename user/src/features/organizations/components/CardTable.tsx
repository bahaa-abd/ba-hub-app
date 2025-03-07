import WebIcon from "@mui/icons-material/Web";
import useEventSearchParams from "hooks/useEventSearchParams";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { FC, useMemo } from "react";
import { getPage } from "utils/apiHelpers";
import { organizationQueries } from "..";
import { CardTable } from "components/tables/CardTable";
import { isThereNext, isTherePrev } from "constants/apiList";
import AddFab from "components/buttons/AddFab";
import { OrganizationCard } from "./Card";
import { useTranslation } from "react-i18next";

type Props = {};

export const OrganizationCardTable: FC<Props> = () => {
  const search = useQuerySearchParam();
  const page = usePageNumberSearchParam();
  const { add } = useEventSearchParams();
  const query = organizationQueries.useAll({ search, page });
  const { data } = query;
  const { t: tCommon } = useTranslation();

  const currentPage = getPage(data, page);

  const dataCard = useMemo(
    () =>
      currentPage?.map((e) => ({
        id: e.id,
        icon: <WebIcon sx={{ fontSize: 50, fill: "#F47560" }} />,
        name: e.name.toLocaleUpperCase(),
        status: e.recentSubscription?.status,
        sessionHourlyRate: e.sessionHourlyRate,
        expiresDate: e.recentSubscription?.expiresDate,
      })) || [],
    [currentPage]
  );

  return (
    <>
      <AddFab hideOnScroll onClick={() => add()} />
      <CardTable
        title={tCommon("organizations")}
        pageData={dataCard || []}
        CardContent={OrganizationCard}
        infiniteQuery={query}
        pageNumber={page}
        isThereNext={isThereNext(data?.pages[0].total ?? 0, page)}
        isTherePrev={isTherePrev(page)}
      />
    </>
  );
};
