import axios, { AxiosInstance } from "axios";
import errorInterceptor from "./interceptors/errorInterceptor";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const setInterceptors = (instance: AxiosInstance) => {
  errorInterceptor(instance);
};

const getAxiosInstance = () => {
  setInterceptors(instance);
  return instance;
};

const axiosInstance = getAxiosInstance();

export default axiosInstance;
