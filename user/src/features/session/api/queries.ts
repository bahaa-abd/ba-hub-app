import { createQueryKeys } from "@lukemorales/query-key-factory";
import API from "./api";
import { SessionAllParams } from "./type";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
export const keys = createQueryKeys("session", {
  all: (params: SessionAllParams) => ({
    queryFn: () => API.getAll(params),
    queryKey: [params],
  }),
  details: (id: string) => ({
    queryFn: () => API.get(id),
    queryKey: [id],
  }),
});

export const queries = {
  useAll: (params: SessionAllParams) => useInfiniteQuery(keys.all(params)),
  useDetails: (id: string) => useQuery({ ...keys.details(id), enabled: !!id }),
  useEdit: () => useMutation(API.edit),
  useAdd: () => useMutation(API.add),
  useEnd: () => useMutation(API.end),
  useAddDessert: () => useMutation(API.addDessert),
};
