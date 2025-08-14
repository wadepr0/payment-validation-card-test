import StatusEnum from "../../shared/enum/status.enum";

export interface ICheckPay {
  status: StatusEnum;
  pid: string;
}
