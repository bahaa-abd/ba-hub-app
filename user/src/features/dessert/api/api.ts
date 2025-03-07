import API_ROUTES from "constants/apiRoutes";
import axios from "lib/axios";
import { APIList, WithId } from "types/api";
import { paginateParams } from "utils/apiHelpers";
import { Dessert, DessertAction, DessertAllParams } from "./type";
import { storage } from "utils/storage";

const API = {
  add: async (body: DessertAction) => {
    const { data } = await axios.post(API_ROUTES.DESSERTS.ADD, body, {
      headers: {
        "organization-id": storage.getOrg(),
      },
    });
    return data;
  },
  getAll: async (params: DessertAllParams) => {
    const { data } = await axios.get<{ data: APIList<Dessert> }>(
      API_ROUTES.DESSERTS.GET_ALL,
      {
        params: paginateParams(params),
        headers: {
          "organization-id": storage.getOrg(),
        },
      }
    );
    return data.data;
  },
  get: async (id: string) => {
    const { data } = await axios.get<{ data: Dessert }>(
      API_ROUTES.DESSERTS.GET(id),
      {
        headers: {
          "organization-id": storage.getOrg(),
        },
      }
    );
    return data.data;
  },
  edit: async ({ id: id, ...body }: WithId<DessertAction>) => {
    const { data } = await axios.patch<Dessert>(
      API_ROUTES.DESSERTS.EDIT(id),
      body,
      {
        headers: {
          "organization-id": storage.getOrg(),
        },
      }
    );
    return data;
  },
  remove: async (id: string) => {
    const { data } = await axios.delete(API_ROUTES.DESSERTS.DELETE(id), {
      headers: {
        "organization-id": storage.getOrg(),
      },
    });
    return data;
  },
  select: async () => {
    const { data } = await axios.get<{ data: APIList<Dessert> }>(
      API_ROUTES.DESSERTS.GET_ALL,
      {
        headers: {
          "organization-id": storage.getOrg(),
        },
      }
    );
    return data.data.results;
  },
};

export default API;
