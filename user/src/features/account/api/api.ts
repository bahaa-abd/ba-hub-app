import API_ROUTES from "constants/apiRoutes";
import axios from "lib/axios";
import { User, UserEditBody } from "./type";

const API = {
  profile: async () => {
    const { data } = await axios.get<{ data: User }>(API_ROUTES.USERS.ME);
    return data.data;
  },
  edit: async (body: UserEditBody) => {
    const { data } = await axios.patch<{ data: User }>(
      API_ROUTES.USERS.ME,
      body
    );
    return data.data;
  },
};

export default API;
