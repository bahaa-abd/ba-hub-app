import { createQueryKeys } from "@lukemorales/query-key-factory";
import API from "./api";
import { SubscriptionAllParams } from "./type";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
export const keys = createQueryKeys("subscription", {
  all: (params: SubscriptionAllParams) => ({
    queryFn: () => API.getAll(params),
    queryKey: [params],
  }),
  details: (id: string) => ({
    queryFn: () => API.get(id),
    queryKey: [id],
  }),
  mine: (params: SubscriptionAllParams) => ({
    queryFn: () => API.mine(params),
    queryKey: [params],
  }),
});

export const queries = {
  useAll: (params: SubscriptionAllParams) => useInfiniteQuery(keys.all(params)),
  useDetails: (id: string) => useQuery({ ...keys.details(id), enabled: !!id }),
  useEdit: () => useMutation(API.edit),
  useAdd: () => useMutation(API.add),
  useMine: (params: SubscriptionAllParams) =>
    useInfiniteQuery(keys.mine(params)),
};
