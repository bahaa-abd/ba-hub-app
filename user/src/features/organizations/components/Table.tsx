import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RemoveIconButton from "components/buttons/RemoveIconButton";
import ButtonsStack from "components/layout/ButtonsStack";
import PaginationTable from "components/tables/PaginationTable";
import TableRowStriped from "components/tables/PaginationTable/TableRowStriped";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { FC } from "react";
import { getPage } from "utils/apiHelpers";
import { organizationQueries } from "..";
import useTableHeader from "./hooks/useTableHeaders";
import { useQueryClient } from "@tanstack/react-query";
import { queryStore } from "features/shared";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { useTranslation } from "react-i18next";
import { OrganizationStatus } from "constants/enums";
import { IconButton, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green } from "@mui/material/colors";

type Props = {};
export const Table: FC<Props> = ({}) => {
  const { t } = useTranslation("organization");
  const search = useQuerySearchParam();
  const page = usePageNumberSearchParam();
  const queryClient = useQueryClient();
  const query = organizationQueries.useAll({
    search,
    page,
  });

  const approve = organizationQueries.useApprove();
  const refuse = organizationQueries.useRefuse();

  const { data } = query;
  const tableHeaders = useTableHeader();
  const currentPage = getPage(data, page);
  const successSnackbar = useSuccessSnackbar();

  const handelApprove = async (id: string) => {
    approve.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(queryStore.organization.all._def);

        queryClient.invalidateQueries(queryStore.organization.details(id));
        successSnackbar(t("message.success.approve"));
      },
    });
  };

  const handelRefuse = async (id: string) => {
    refuse.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(queryStore.organization.all._def);
        queryClient.invalidateQueries(queryStore.organization.details(id));
        successSnackbar(t("message.success.refuse"));
      },
    });
  };

  return (
    <PaginationTable
      sx={{
        "td:nth-of-type(2) .MuiSkeleton-root": {
          m: 0,
        },
      }}
      pageNumber={page}
      tableHead={
        <TableHead>
          <TableRow>
            {tableHeaders.map((cellHeader, index) => (
              <TableCell
                key={index}
                sx={{
                  "&.MuiTableCell-root": {
                    textAlign: "center",
                  },
                }}
              >
                {cellHeader}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      }
      skeleton={true}
      cellCount={tableHeaders.length}
      infiniteQuery={query}
    >
      <TableBody>
        {currentPage.map((row) => (
          <TableRowStriped key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell sx={{ textAlign: "center" }}>{row.user.name}</TableCell>
            <TableCell sx={{ textAlign: "center" }}>{row.status}</TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              {row.sessionHourlyRate}
            </TableCell>
            <TableCell>
              <ButtonsStack>
                <Tooltip title={t("approve")}>
                  <IconButton
                    onClick={() => handelApprove(row.id)}
                    disabled={
                      approve.isLoading ||
                      row.status !== OrganizationStatus.pending
                    }
                  >
                    <CheckCircleIcon sx={{ color: green[500], fontSize: 21 }} />
                  </IconButton>
                </Tooltip>
                <RemoveIconButton
                  onClick={() => handelRefuse(row.id)}
                  disabled={
                    refuse.isLoading ||
                    row.status !== OrganizationStatus.pending
                  }
                />
              </ButtonsStack>
            </TableCell>
          </TableRowStriped>
        ))}
      </TableBody>
    </PaginationTable>
  );
};
