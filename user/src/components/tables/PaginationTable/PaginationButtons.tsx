import TablePagination from "@mui/material/TablePagination";
import { InfiniteData } from "@tanstack/react-query";
import { PAGE_SIZE } from "constants/apiList";
import React from "react";
import { useTranslation } from "react-i18next";
import { APIList } from "types/api";

interface PaginationTableProps {
  data?: InfiniteData<APIList<unknown>>;
  page: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
}

const PaginationButtons = ({
  data,
  page,
  handleChangePage,
}: PaginationTableProps) => {
  const isDisabled = !data;
  const { t } = useTranslation();

  return (
    <TablePagination
      rowsPerPageOptions={[PAGE_SIZE]}
      labelDisplayedRows={({ from, to, count }) =>
        t("pagination", { from, to, count })
      }
      component="div"
      count={data?.pages[0]?.total ?? 0}
      rowsPerPage={PAGE_SIZE}
      page={Math.max(page - 1, 0)} // Ensure the page index is not negative
      onPageChange={(_, newPage) => handleChangePage(null, newPage + 1)}
      SelectProps={{
        disabled: isDisabled,
      }}
    />
  );
};

export default PaginationButtons;
