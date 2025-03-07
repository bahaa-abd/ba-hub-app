import {
  Box,
  Card,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import SomethingWentWrong from "components/feedback/SomethingWentWrong";
import { useHandlePageChange } from "./PaginationTable/useHandlePageChange";
import NoData from "components/feedback/NoData";
import { APIList } from "types/api";
import { FC } from "react";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

type CardTableProps<T> = {
  title?: string;
  infiniteQuery: UseInfiniteQueryResult<APIList<unknown>, unknown>;
  CardContent: FC<{ item: any }>;
  pageData: Array<T & { id: string }>;
  pageNumber: number;
  isThereNext: boolean;
  isTherePrev: boolean;
};

export const CardTable = <T,>({
  title,
  infiniteQuery,
  CardContent,
  pageData,
  pageNumber,
  isThereNext,
  isTherePrev,
}: CardTableProps<T>) => {
  const { t: tCommon } = useTranslation();
  const {
    fetchNextPage,
    fetchPreviousPage,
    data,
    isSuccess,
    isError,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = infiniteQuery;
  const handlePageChange = useHandlePageChange({
    fetchNextPage,
    fetchPreviousPage,
    pages: [],
  });
  const noData = !data?.pages[0].results.length && isSuccess;
  const theme = useTheme();
  return (
    <Box sx={{ p: 4, width: "100%", fontFamily: "MontserratArabic" }}>
      {title && (
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            textAlign: "center",
            fontWeight: "bold",
            color: "#5E3B3B",
          }}
        >
          {title}
        </Typography>
      )}
      {noData && (
        <Box sx={{ mx: "auto", my: 2 }}>
          <NoData />
        </Box>
      )}
      {/* Error Handling */}
      {isError && (
        <Box display="flex" justifyContent="center">
          <SomethingWentWrong />
        </Box>
      )}

      {/* Data Grid */}
      {!isError && (
        <Stack
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "stretch",
            flexDirection: "row",
            gap: 2,
          }}
        >
          {pageData.map((item) => (
            <Card
              key={item["id"]}
              sx={{
                borderRadius: "25px",
                boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
                padding: "2px",
                width: { xs: "100%", sm: "75%", md: "300px" }, // Ensures uniform width
                height: "auto", // Makes the height of the card dynamic based on content
                maxWidth: "100%", // Prevents the card from overflowing
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between", // Ensures even spacing
                textAlign: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "90%",
                  textAlign: "center",
                }}
              >
                {<CardContent item={item} />}
              </Box>
            </Card>
          ))}
        </Stack>
      )}
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mt: 4,
        }}
      >
        {/* Previous Button */}
        <Tooltip title={tCommon("Previous Page")}>
          <span>
            <IconButton
              onClick={() => handlePageChange(null, pageNumber - 1)}
              disabled={
                !isTherePrev || isFetchingNextPage || isFetchingPreviousPage
              }
              sx={{
                color: "white",
                borderRadius: "50%",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: `${theme.palette.grey.A400}`,
                },
                "&.Mui-disabled": {
                  backgroundColor: "#A1887F",
                  color: "white", // Ensure text color remains white
                  opacity: 0.6,
                  boxShadow: "none",
                },
              }}
            >
              <ArrowBackIosNew fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>

        {/* Next Button */}
        <Tooltip title={tCommon("Next Page")}>
          <span>
            <IconButton
              onClick={() => handlePageChange(null, pageNumber + 1)}
              disabled={
                !isThereNext || isFetchingNextPage || isFetchingPreviousPage
              }
              sx={{
                color: "white",
                borderRadius: "50%",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: `${theme.palette.grey.A400}`,
                },
                "&.Mui-disabled": {
                  backgroundColor: "#A1887F",
                  color: "white", // Ensure text color remains white
                  opacity: 0.6,
                  boxShadow: "none",
                },
              }}
            >
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
    </Box>
  );
};
