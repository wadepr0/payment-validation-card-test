import { AxiosResponse } from "axios";
import axiosInstance from "../axios";
import { API_CHECK_PAY } from "../api";
import { type ICheckPay } from "../types/checkPay";

const checkPay = async (pid: string): Promise<ICheckPay> => {
  const result: AxiosResponse<ICheckPay> = await axiosInstance.get(
    `${API_CHECK_PAY}/${pid}`
  );
  return result.data;
};

export default checkPay;
