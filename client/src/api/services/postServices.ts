import { AxiosResponse } from "axios";
import axiosInstance from "../axios";
import { API_PAY } from "../api";
import type { IPaymentSchema } from "../../shared/validation/schema/schema";
import type { IPayResponse } from "../types/pay";

const pay = async (
  id: string,
  params: IPaymentSchema
): Promise<IPayResponse> => {
  const result: AxiosResponse<IPayResponse> = await axiosInstance.post(
    API_PAY,
    {
      jsonrpc: "2.0",
      id,
      method: "pay",
      params,
    }
  );
  return result.data;
};

export default pay;
