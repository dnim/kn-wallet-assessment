import { Component } from "react";
import { Wallet } from "./types/Wallet";
import { WalletService } from "./WalletService";
import { Table } from 'reactstrap';
import { WalletRow } from "./WalletRow";
import { Container, Row, Col, Button } from 'reactstrap';
import "./Wallet.css";

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

  delete = (id: number) => {
    this.props.walletService.delete(id)
      .then(() => this.setState({ wallets: this.state.wallets.filter((wallet: Wallet) => wallet.id != id) }))
      .catch(() => alert(`Can't delete wallet account with ID ${id}`));
  }

  create = (wallet: Wallet) => {

  }

  render() {
    const { wallets, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    let rowCounter: number = 0;

    return (
      <Container>
        <Row>
          <Col>
            <h3>List of Wallets</h3>
          </Col>
          <Col>
            <Button outline color="primary" title="Create new wallet">create</Button>{' '}
            <Button outline color="secondary" title="Transfer money between two wallets">transfer</Button>{' '}
          </Col>
        </Row>
        <div className="container">

          <div>
          </div>
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
              {wallets.map((wallet: Wallet) => <WalletRow
                key={wallet.id}
                rowNumber={++rowCounter}
                wallet={wallet}
                onDelete={(id: number) => this.delete(id)} />)}
            </tbody>
          </Table>
        </div>
      </Container>
    );
  }
}

export default WalletList;