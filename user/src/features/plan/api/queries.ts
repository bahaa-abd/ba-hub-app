import { createQueryKeys } from "@lukemorales/query-key-factory";
import API from "./api";
import { PlanAllParams } from "./type";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
export const keys = createQueryKeys("plan", {
  all: (params: PlanAllParams) => ({
    queryFn: () => API.getAll(params),
    queryKey: [params],
  }),
  details: (id: string) => ({
    queryFn: () => API.get(id),
    queryKey: [id],
  }),
});

export const queries = {
  useAll: (params: PlanAllParams) => useInfiniteQuery(keys.all(params)),
  useDetails: (id: string) => useQuery({ ...keys.details(id), enabled: !!id }),
  useEdit: () => useMutation(API.edit),
  useAdd: () => useMutation(API.add),
  useRemove: () => useMutation(API.remove),
};
