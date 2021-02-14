import { ResponseStatus } from "./ResponseStatus";

export interface TransactionResponse {
  newBalance: number;
  status: ResponseStatus;
}