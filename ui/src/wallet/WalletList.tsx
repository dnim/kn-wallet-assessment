import { Component } from "react";
import { Wallet } from "./types/Wallet";
import { WalletService } from "./WalletService";
import { Table } from 'reactstrap';
import { WalletRow } from "./WalletRow";
import "./Wallet.css";
import { TransactionRequest } from "../dto/TransactionRequest";
import resolve from "resolve";
import { BalanceChangeResponse } from "../dto/BalanceChangeResponse";

interface WalletListProps {
  walletService: WalletService;
}

interface WalletListState {
  isLoading: boolean,
  wallets: Wallet[]
}

class WalletList extends Component<WalletListProps, WalletListState> {

  state = {
    isLoading: true,
    wallets: [],
  }

  async componentDidMount() {
    const wallets: Wallet[] = await this.props.walletService.listWallets();
    this.setState({ wallets, isLoading: false });
  }

  delete = async (id: number) => {
    const deleteStatus = await this.props.walletService.delete(id);
    if (deleteStatus === 200) {
      this.setState({ wallets: this.state.wallets.filter((wallet: Wallet) => wallet.id !== id) })
    } else {
      alert(`Can't delete wallet account with ID ${id}`);
    }
  }

  transaction = async (request: TransactionRequest) => {
    const response = await this.props.walletService.transaction(request);
    console.log("Transfer resp: ", response);
    if (response.status.isError) {
      alert(response.status.message)
    } else {
      this.setState({
        wallets: this.state.wallets.map((wallet: Wallet) => {
          return wallet.id === request.walletId ? { ...wallet, ...{ balance: response.newBalance } } : wallet;
        })
      })
    }
  }

  create = (wallet: Wallet) => {
    // TODO: implement me! 
  }

  render() {
    const { wallets, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    let rowCounter: number = 0;

    return (
      <div className="container">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Account Name</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wallets.map((wallet: Wallet) =>
              <WalletRow
                key={wallet.id}
                rowNumber={++rowCounter}
                wallet={wallet}
                onDelete={(id: number) => this.delete(id)}
                onTransaction={(transaction: TransactionRequest) => this.transaction(transaction)} />)}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default WalletList;