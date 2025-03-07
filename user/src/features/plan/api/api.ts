import API_ROUTES from "constants/apiRoutes";
import axios from "lib/axios";
import { APIList, APIListParams, WithId } from "types/api";
import { Plan, PlanAction } from "./type";
import { paginateParams } from "utils/apiHelpers";

const API = {
  getAll: async (params: APIListParams) => {
    const { data } = await axios.get<{ data: APIList<Plan> }>(
      API_ROUTES.PLANS.GET_ALL,
      {
        params: paginateParams(params),
      }
    );
    return data.data;
  },
  get: async (id: string) => {
    const { data } = await axios.get<{ data: Plan }>(API_ROUTES.PLANS.GET(id));
    return data.data;
  },
  edit: async ({ id, ...body }: WithId<PlanAction>) => {
    const { data } = await axios.patch<Plan>(API_ROUTES.PLANS.EDIT(id), body);
    return data;
  },
  add: async (body: PlanAction) => {
    const { data } = await axios.post(API_ROUTES.PLANS.ADD, body);
    return data;
  },
  remove: async (id: string) => {
    const { data } = await axios.delete(API_ROUTES.PLANS.DELETE(id));
    return data;
  },
};

export default API;
