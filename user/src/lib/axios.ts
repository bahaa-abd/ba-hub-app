import ax from "axios";
import {
  API_BASE_URL,
  DEVELOPMENT_API_BASE_URL,
  NODE_ENV,
} from "constants/domain";
import i18n from "lib/i18next";
let token = localStorage.getItem("token");
const axios = ax.create({
  baseURL: NODE_ENV === "development" ? DEVELOPMENT_API_BASE_URL : API_BASE_URL,
});
axios.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers = {
        ...config.headers,
        "accept-language": i18n.language,
        Authorization: `Bearer ${token}`,
      } as any;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
export function refreshAxiosToken() {
  token = localStorage.getItem("token");
}
axios.interceptors.response.use((response) => response);
export default axios;
