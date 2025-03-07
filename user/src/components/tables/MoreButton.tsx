import { Button, Stack } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { InfiniteData } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { APIList } from "types/api";

interface LoadMoreButtonProps {
  data?: InfiniteData<APIList<unknown>>;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const LoadMoreButton = ({
  data,
  isFetchingNextPage,
  fetchNextPage,
}: LoadMoreButtonProps) => {
  const { t } = useTranslation();

  // Check if there's more data to load
  const hasMore = data?.pages?.some((page) => page.results.length !== 0);
  if (!hasMore) return null; // Hide button if no more data

  return (
    <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
      <Button
        variant="contained"
        color="primary"
        endIcon={<ArrowDownwardIcon />}
        onClick={fetchNextPage}
        disabled={isFetchingNextPage}
      >
        {isFetchingNextPage ? t("loading") : t("load_more")}
      </Button>
    </Stack>
  );
};

export default LoadMoreButton;
