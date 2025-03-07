import API_ROUTES from "constants/apiRoutes";
import axios from "lib/axios";
import { APIList, APIListParams, WithId } from "types/api";
import { SubscriptionOrder, SubscriptionOrderAction } from "./type";
import { paginateParams } from "utils/apiHelpers";
import { storage } from "utils/storage";

const API = {
  getAll: async (params: APIListParams) => {
    const { data } = await axios.get<{ data: APIList<SubscriptionOrder> }>(
      API_ROUTES.SUBSCRIPTION_ORDERS.GET_ALL,
      {
        params: paginateParams(params),
      }
    );
    return data.data;
  },
  get: async (id: string) => {
    const { data } = await axios.get<{ data: SubscriptionOrder }>(
      API_ROUTES.SUBSCRIPTION_ORDERS.GET(id)
    );
    return data.data;
  },
  edit: async ({ id, ...body }: WithId<SubscriptionOrderAction>) => {
    const { data } = await axios.patch<{ data: SubscriptionOrder }>(
      API_ROUTES.SUBSCRIPTION_ORDERS.EDIT(id),
      body
    );
    return data.data;
  },
  add: async (body: SubscriptionOrderAction) => {
    const { data } = await axios.post(API_ROUTES.SUBSCRIPTION_ORDERS.ADD, body);
    return data;
  },
  approve: async ({ id }: WithId<{}>) => {
    const { data } = await axios.post<{ message: string }>(
      API_ROUTES.SUBSCRIPTION_ORDERS.APPROVE(id)
    );
    return data;
  },
  refuse: async ({ id }: WithId<{}>) => {
    const { data } = await axios.post<{ message: string }>(
      API_ROUTES.SUBSCRIPTION_ORDERS.REFUSE(id)
    );
    return data;
  },
  mine: async (params: APIListParams) => {
    const { data } = await axios.get<{ data: APIList<SubscriptionOrder> }>(
      API_ROUTES.SUBSCRIPTION_ORDERS.GET_MINE,
      {
        params: paginateParams(params),
        headers: {
          "organization-id": storage.getOrg(),
        },
      }
    );
    return data.data;
  },
};

export default API;
