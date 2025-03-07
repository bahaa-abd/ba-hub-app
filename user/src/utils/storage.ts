import { Role } from "constants/enums";
import { refreshAxiosToken } from "lib/axios";

export const storage = {
  setToken(token: string) {
    localStorage.setItem("token", token);
    refreshAxiosToken();
  },
  clearToken() {
    localStorage.setItem("token", "");
    refreshAxiosToken();
  },
  getToken() {
    return localStorage.getItem("token");
  },
  setLanguage(language: string) {
    localStorage.setItem("language", language);
  },
  getLanguage() {
    return localStorage.getItem("language");
  },
  setOrg(orgId: string) {
    localStorage.setItem("orgId", orgId);
  },
  getOrg(): string {
    return localStorage.getItem("orgId") as string;
  },
  clearOrg() {
    localStorage.setItem("orgId", "");
  },
  setRole(role: Role) {
    localStorage.setItem("role", role);
  },
  getRole(): Role {
    return localStorage.getItem("role") as Role;
  },
  clearRole() {
    localStorage.setItem("role", "");
  },
  clearAll() {
    storage.clearOrg();
    storage.clearRole();
    storage.clearToken();
  },
};
