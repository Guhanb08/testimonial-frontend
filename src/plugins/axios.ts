import router from "@/router";
import axios, { type AxiosInstance } from "axios";
const apiURL = import.meta.env.VITE_BASE_API;
import toastService from "@/plugins/toast";

console.log(apiURL);
const axiosIns: AxiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    accept: "application/json",
    common: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  },
});

axiosIns.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = token ? `Bearer ${JSON.parse(token)}` : "";
  }
  return config;
});

/* axiosIns.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
     if (error.response.status === 401) {
      localStorage.removeItem("userData");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userAbilities");
      router.push("/login");
    } else {
      return Promise.reject(error);
    }
  }
); */

export default axiosIns;
