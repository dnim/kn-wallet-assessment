import { Wallet } from "./types/Wallet";



interface WalletCrud {

    listWallets(): Promise<Wallet[]>;
    delete(id: number): Promise<any>;
    create(wallet: Wallet): Promise<Wallet>;
    update(wallet: Wallet): Promise<Wallet>;

}

export class WalletService implements WalletCrud {

  private static walletContext = "/api/wallet";

  async listWallets(): Promise<Wallet[]> {
    return fetch(`${WalletService.walletContext}/list`, {
      method: "GET"
    })
    .then(response => response.json())
  }

  async delete(id: number): Promise<any> {
    const response = await fetch(`${WalletService.walletContext}/${id}`, {
      method: "DELETE"
    });
    return await response.json();
  }

  async create(wallet: Wallet): Promise<Wallet> {
    const response = await fetch(`${WalletService.walletContext}/create`, {
      method: "POST",
      body: JSON.stringify(wallet)
    });
    return await response.json();
  }

  update(wallet: Wallet): Promise<Wallet> {
    throw new Error("Method not implemented.");
  }
  
}