import { createQueryKeys } from "@lukemorales/query-key-factory";
import API from "./api";
import { SubscriptionOrderAllParams } from "./type";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
export const keys = createQueryKeys("subscription-order", {
  all: (params: SubscriptionOrderAllParams) => ({
    queryFn: () => API.getAll(params),
    queryKey: [params],
  }),
  details: (id: string) => ({
    queryFn: () => API.get(id),
    queryKey: [id],
  }),
  mine: (params: SubscriptionOrderAllParams) => ({
    queryFn: () => API.mine(params),
    queryKey: [params],
  }),
});

export const queries = {
  useAll: (params: SubscriptionOrderAllParams) =>
    useInfiniteQuery(keys.all(params)),
  useDetails: (id: string) => useQuery({ ...keys.details(id), enabled: !!id }),
  useEdit: () => useMutation(API.edit),
  useAdd: () => useMutation(API.add),
  useApprove: () => useMutation(API.approve),
  useRefuse: () => useMutation(API.refuse),
  useMine: (params: SubscriptionOrderAllParams) =>
    useInfiniteQuery(keys.mine(params)),
};
