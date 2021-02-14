import { Wallet } from "../wallet/types/Wallet";
import { ResponseStatus } from "./ResponseStatus";

export interface TransferMoneyResponse {
  from: Wallet;
  to: Wallet;
  status: ResponseStatus;
}