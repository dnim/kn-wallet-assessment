import { Wallet } from "../wallet/types/Wallet";
import { ResponseStatus } from "./ResponseStatus";

export interface WalletCreateResponse {
  wallet: Wallet;
  status: ResponseStatus;
}