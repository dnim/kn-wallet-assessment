export enum TransactionType {
  Withdraw = "WITHDRAW",
  Topup = "TOPUP"
}

export interface TransactionRequest {
  type: TransactionType;
  walletId: number;
  amount: number;
}