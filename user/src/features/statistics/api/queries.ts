import { createQueryKeys } from "@lukemorales/query-key-factory";
import API from "./api";
import { StatisticsParams } from "./type";
import { useQuery } from "@tanstack/react-query";
export const keys = createQueryKeys("statistics", {
  statistics: (params: StatisticsParams) => ({
    queryFn: () => API.getStatistics(params),
    queryKey: [params],
  }),
});

export const queries = {
  useStatistics: (params: StatisticsParams) =>
    useQuery(keys.statistics(params)),
};
