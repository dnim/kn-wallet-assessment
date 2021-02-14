import { BalanceChangeResponse } from "../dto/BalanceChangeResponse";
import { TransactionRequest } from "../dto/TransactionRequest";
import { TransferMoneyRequest } from "../dto/TransferMoneyRequest";
import { WalletCreateResponse } from "../dto/WalletCreateResponse";
import { Wallet } from "./types/Wallet";


enum RequestType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

const JsonHeaders = new Headers({
  'Content-Type': 'application/json'
})


interface WalletCrud {

  listWallets(): Promise<Wallet[]>;
  delete(id: number): Promise<any>;
  create(wallet: Wallet): Promise<WalletCreateResponse>;
  update(wallet: Wallet): Promise<Wallet>;
  transaction(request: TransactionRequest): Promise<BalanceChangeResponse>;
  transfer(request: TransferMoneyRequest): Promise<BalanceChangeResponse>;

}

export class WalletService implements WalletCrud {

  private static walletContext = "/api/wallet";

  async listWallets(): Promise<Wallet[]> {
    return fetch(`${WalletService.walletContext}/list`, {
      method: RequestType.GET
    })
      .then(response => response.json())
  }

  async delete(id: number): Promise<any> {
    const response = await fetch(`${WalletService.walletContext}/${id}`, {
      method: RequestType.DELETE
    });
    return response.status;
  }

  async create(wallet: Wallet): Promise<WalletCreateResponse> {
    const response = await fetch(`${WalletService.walletContext}/create`, {
      method: RequestType.POST,
      headers: JsonHeaders,
      body: JSON.stringify(wallet)
    });
    return await response.json();
  }

  update(wallet: Wallet): Promise<Wallet> {
    throw new Error("Method not implemented.");
  }

  async transaction(request: TransactionRequest): Promise<BalanceChangeResponse> {
    const response = await fetch(`${WalletService.walletContext}/transaction`, {
      method: RequestType.POST,
      headers: JsonHeaders,
      body: JSON.stringify(request),

    })
    return await response.json();
  }

  transfer(request: TransferMoneyRequest): Promise<BalanceChangeResponse> {
    throw new Error("Method not implemented.");
  }

}