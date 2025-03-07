import { createQueryKeys } from "@lukemorales/query-key-factory";
import API from "./api";
import { OrganizationAllParams } from "./type";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
export const keys = createQueryKeys("organization", {
  all: (params: OrganizationAllParams) => ({
    queryFn: () => API.getAll(params),
    queryKey: [params],
  }),
  details: (id: string) => ({
    queryFn: () => API.get(id),
    queryKey: [id],
  }),
});

export const queries = {
  useAll: (params: OrganizationAllParams) => useInfiniteQuery(keys.all(params)),
  useDetails: (id: string) =>
    useQuery({
      ...keys.details(id),
      enabled: !!id,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }),
  useAdd: () => useMutation(API.add),
  useEdit: () => useMutation(API.edit),
  useApprove: () => useMutation(API.approve),
  useRefuse: () => useMutation(API.refuse),
};
