import { AxiosError, AxiosInstance } from "axios";

const errorInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error instanceof AxiosError) {
        alert(error.message ?? "Произошла ошибка");
      }

      return Promise.reject();
    }
  );
};

export default errorInterceptor;
