import API_ROUTES from "constants/apiRoutes";
import axios from "lib/axios";
import { RevenueStats, StatisticsParams } from "./type";
import { storage } from "utils/storage";

const API = {
  getStatistics: async (params: StatisticsParams) => {
    const { data } = await axios.get<{ data: RevenueStats }>(
      API_ROUTES.ORGANIZATIONS.STATISTICS,
      {
        params,
        headers: {
          "organization-id": storage.getOrg(),
        },
      }
    );
    return data.data;
  },
};

export default API;
