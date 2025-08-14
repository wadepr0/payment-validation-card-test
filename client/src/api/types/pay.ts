import type { IPaymentSchema } from "../../shared/validation/schema/schema";

export interface IPayRequest {
  jsonrpc: string;
  id: string;
  method: "pay";
  params: IPaymentSchema;
}

export interface IPayResponse {
  jsonrpc: string;
  id: string;
  result: {
    pid: string;
  };
}
