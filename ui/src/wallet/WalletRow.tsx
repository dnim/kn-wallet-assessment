import { Component } from "react"
import { Wallet } from "./types/Wallet";
import { Button, Col, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap';
import { TransactionRequest, TransactionType } from "../dto/TransactionRequest";

interface WalletRowState {
  amount: number;
  amountIsInvalid: boolean;
}

interface WalletRowProps {
  rowNumber: number;
  wallet: Wallet;
  onDelete: (id: number) => void;
  onTransaction: (request: TransactionRequest) => void;
}

export class WalletRow extends Component<WalletRowProps, WalletRowState> {

  state = {
    amount: 0.00,
    amountIsInvalid: false
  }

  private handleDelete = (id: number) => {
    this.props.onDelete(id);
  }

  private handleTransaction = async (type: TransactionType) => {
    await this.props.onTransaction({
      type,
      walletId: this.props.wallet.id,
      amount: this.state.amount
    })
    this.setState({
      amount: 0.00
    })
  }

  private handleChange = (event: any) => {
    const amount = event.target.value;
    this.setState({ amount, amountIsInvalid: amount < 0 })
  }

  render() {
    const { wallet, rowNumber, onDelete } = this.props;
    return (
      <tr>
        <th scope="row">{rowNumber}</th>
        <td>{wallet.id}</td>
        <td>{wallet.name}</td>
        <td>{wallet.balance}</td>
        <td>
          <div className="wallet-buttons">
            <Row>
              <Col>
                <InputGroup size="sm" >
                  <InputGroupAddon addonType="prepend">
                    <Button
                      size="sm"
                      color="primary"
                      onClick={() => this.handleTransaction(TransactionType.Topup)}>↑ top up</Button>
                  </InputGroupAddon>
                  <Input
                    invalid={this.state.amountIsInvalid}
                    type="number"
                    min={0} bsSize="sm"
                    value={this.state.amount}
                    onChange={this.handleChange} />
                  <InputGroupAddon addonType="append">
                    <Button
                      size="sm"
                      color="primary"
                      onClick={() => this.handleTransaction(TransactionType.Withdraw)}>withdraw ↓</Button>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
              <Col>
                {' '}<Button size="sm" color="warning" disabled={true} title="TODO">edit</Button>{' '}
                <Button size="sm" color="danger" onClick={() => this.handleDelete(wallet.id)}>delete</Button>{' '}
              </Col>
            </Row>
          </div>
        </td>
      </tr>
    );
  }
}