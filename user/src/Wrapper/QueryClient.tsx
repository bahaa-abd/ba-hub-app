import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PAGE_SIZE } from "constants/apiList";
import { FC, ReactNode } from "react";
import { APIList } from "types/api";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
      getNextPageParam: (lastPage, allPages) => {
        const lastPageData = lastPage as APIList<unknown>;
        // Check if the next page exists by comparing the current number of pages with total items
        return allPages.length * PAGE_SIZE < lastPageData.total
          ? allPages.length + 1
          : undefined;
      },
      getPreviousPageParam: (firstPage, allPages) => {
        // Check if there are previous pages
        return allPages.length > 0 ? allPages.length - 1 : undefined;
      },
    },
  },
});

type Props = { children: ReactNode };
const QueryClientContext: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools
        initialIsOpen={false}
        toggleButtonProps={{ style: { width: "1.5rem", position: "fixed", bottom: 0, right: 0 } }}
      /> */}
      {children}
    </QueryClientProvider>
  );
};
export default QueryClientContext;
