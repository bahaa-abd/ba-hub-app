import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIconButton from "components/buttons/EditIconButton";
import ButtonsStack from "components/layout/ButtonsStack";
import PaginationTable from "components/tables/PaginationTable";
import TableRowStriped from "components/tables/PaginationTable/TableRowStriped";
import useEventSearchParams from "hooks/useEventSearchParams";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import { FC } from "react";
import { getPage } from "utils/apiHelpers";
import { dessertQueries } from "..";
import useTableHeader from "../hooks/useTableHeaders";
import { useTranslation } from "react-i18next";
import { transformFiled } from "utils/transforms";
type Props = {};
export const Table: FC<Props> = ({}) => {
  const { t: tCommon } = useTranslation();
  const search = useQuerySearchParam();
  const page = usePageNumberSearchParam();
  const { edit } = useEventSearchParams();
  const query = dessertQueries.useAll({
    search,
    page,
  });
  const { data } = query;
  const tableHeaders = useTableHeader();
  const currentPage = getPage(data, page);
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
            {tableHeaders.map((cellHeader) => (
              <TableCell
                key={cellHeader}
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
            <TableCell>{transformFiled(row.name)}</TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              {tCommon(row.type)}
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>{row.price}</TableCell>
            <TableCell>
              <ButtonsStack>
                <EditIconButton onClick={() => edit(row.id)} />
                {/* <RemoveIconButton onClick={() => remove(row.id)} /> */}
              </ButtonsStack>
            </TableCell>
          </TableRowStriped>
        ))}
      </TableBody>
    </PaginationTable>
  );
};
