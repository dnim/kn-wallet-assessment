import React, { Component } from "react"
import { Button, Col, Container, Input, Label, Row } from "reactstrap"
import { Wallet } from "../wallet/types/Wallet"
import WalletList from "../wallet/WalletList"
import { WalletService } from "../wallet/WalletService"


interface TransferMoneyPageProps {
  walletService: WalletService;
}

interface TransferMoneyPageState {
  from: number;
  to: number;
  availableWallets: Wallet[];
  amount: number;
}

export default class TransferMoneyPage extends Component<TransferMoneyPageProps, TransferMoneyPageState> {

  state = {
    from: -1,
    to: -1,
    availableWallets: [],
    amount: 0.00
  }

  async componentDidMount() {
    const availableWallets: Wallet[] = await this.props.walletService.listWallets();
    this.setState({ availableWallets });
  }

  handleFromChange = (event: any) => {
    this.setState({
      from: event.target.value
    })
  }

  handleToChange = (event: any) => {
    this.setState({
      to: event.target.value
    })
  }

  handleAmountChange = (event: any) => {
    this.setState({
      amount: event.target.value
    })
  }

  handleTransfer = async () => {
    const response = await this.props.walletService.transfer({
      fromId: this.state.from,
      toId: this.state.to,
      amount: this.state.amount
    });
    if (response.status.isError) {
      alert(response.status.message)
    } else {
      this.setState({
        availableWallets: this.state.availableWallets.reduce((updatedWallets: Wallet[], wallet: Wallet) => {
          if (wallet.id === response.from.id) {
            updatedWallets.push({ ...wallet, ...{ balance: response.from.balance } })
          } else if (wallet.id === response.to.id) {
            updatedWallets.push({ ...wallet, ...{ balance: response.to.balance } })
          } else {
            updatedWallets.push(wallet);
          }
          return updatedWallets;
        }, [])
      })
    }
  }

  renderOptions = (idToExclude: number) => {
    const result = this.state.availableWallets.reduce((list: any[], wallet: Wallet) => {
      if (wallet.id != idToExclude) {
        const option = (<option key={wallet.id} value={wallet.id}>{wallet.balance}: {wallet.name}</option>)
        list.push(option);
      }
      return list
    }, [])

    return result;
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Label for="from">from</Label>
            <Input type="select" name="from" id="from" onChange={this.handleFromChange}>
              <option value={-1}></option>
              {this.renderOptions(this.state.to)}
            </Input>

            <Label for="to">to</Label>
            <Input type="select" name="to" id="to" onChange={this.handleToChange} >
              <option value={-1}></option>
              {this.renderOptions(this.state.from)}
            </Input>

            <Label for="amount">amount</Label>
            <Input
              type="number"
              id="amount-to-transfer"
              min={0}
              placeholder="amount to transfer"
              onChange={this.handleAmountChange} />
            <br />
            <Button
              color="primary"
              disabled={this.state.from === -1 || this.state.to === -1 || !this.state.amount}
              onClick={this.handleTransfer}
            >Transfer</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}