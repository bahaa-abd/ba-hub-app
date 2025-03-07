import API_ROUTES from "constants/apiRoutes";
import axios from "lib/axios";
import { APIList, APIListParams, WithId } from "types/api";
import { Subscription, SubscriptionAction } from "./type";
import { paginateParams } from "utils/apiHelpers";
import { storage } from "utils/storage";

const API = {
  getAll: async (params: APIListParams) => {
    const { data } = await axios.get<{ data: APIList<Subscription> }>(
      API_ROUTES.SUBSCRIPTIONS.GET_ALL,
      {
        params: paginateParams(params),
      }
    );
    return data.data;
  },
  get: async (id: string) => {
    const { data } = await axios.get<{ data: Subscription }>(
      API_ROUTES.SUBSCRIPTIONS.GET(id)
    );
    return data.data;
  },
  edit: async ({ id, ...body }: WithId<SubscriptionAction>) => {
    const { data } = await axios.patch<{ data: Subscription }>(
      API_ROUTES.SUBSCRIPTIONS.EDIT(id),
      body
    );
    return data.data;
  },
  add: async (body: SubscriptionAction) => {
    const { data } = await axios.post(API_ROUTES.SUBSCRIPTIONS.ADD, body);
    return data;
  },
  mine: async (params: APIListParams) => {
    const { data } = await axios.get<{ data: APIList<Subscription> }>(
      API_ROUTES.SUBSCRIPTIONS.GET_MINE,
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
