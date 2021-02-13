import './App.css';
import WalletList from './wallet/WalletList';
import { WalletService } from './wallet/WalletService';

const App = () => {

  return (
    <WalletList walletService={new WalletService()} />
  );
}

export default App;
