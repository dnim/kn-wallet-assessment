import { Component } from "react"
import { Wallet } from "./types/Wallet";
import { Button } from 'reactstrap';

interface WalletRowState {

}

interface WalletRowProps {
  rowNumber: number;
  wallet: Wallet;
  onDelete: (id: number) => void;
}


export class WalletRow extends Component<WalletRowProps, WalletRowState> {

  render() {
    const { wallet, rowNumber, onDelete } = this.props;
    return (
      <tr>
        <th scope="row">{rowNumber}</th>
        <td>{wallet.id}</td>
        <td>{wallet.name}</td>
        <td>{wallet.balance}</td>
        <div className="wallet-buttons">
          <Button size="sm" color="primary">top up</Button>{' '}
          <Button size="sm" color="primary">withdraw</Button>{' '}
          <Button size="sm" color="warning">edit</Button>{' '}
          <Button size="sm" color="danger" onClick={() => onDelete(wallet.id)}>delete</Button>{' '}
        </div>
      </tr>
    );
  }

  private handleDelete = (id: number) => {
    this.props.onDelete(id);
  }
}