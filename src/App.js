import logo from './logo.svg';
import './App.css';
import Options from './pages/entry/Options';
import OrderSummary from './pages/summary/OrderSummary';

function App() {
  return (
      <div className="App">
          <Options optionType='scoops' />
          <Options optionType='toppings' />
          <OrderSummary />
          {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      </div>
  );
}

export default App;
