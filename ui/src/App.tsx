import './App.css';
import WalletList from './wallet/WalletList';
import { WalletService } from './wallet/WalletService';
import { Container, Row, Col, Button } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { TransferMoneyPage } from './transfer-money/TransferMoneyPage';
import CreateWalletPage from './create-wallet/CreateWalletPage';

const App = () => {

  const walletService = new WalletService();

  return (
    <Container>
      <Router>
        <Row>
          <Col>
            <h3>List of Wallets</h3>
          </Col>
          <Col>
            <Link to="/">
              <Button outline color="primary" title="Dispay wallets">list of wallets</Button>{' '}
            </Link>
            <Link to="/create">
              <Button outline color="primary" title="Create new wallet">create</Button>{' '}
            </Link>
            <Link to="/transfer">
              <Button outline color="secondary" title="Transfer money between two wallets">transfer</Button>{' '}
            </Link>
          </Col>
        </Row>
        <Switch>
          <Route path="/transfer">
            <TransferMoneyPage />
          </Route>
          <Route path="/create">
            <CreateWalletPage walletService={walletService} />
          </Route>
          <Route path="/">
            <WalletList walletService={walletService} />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
