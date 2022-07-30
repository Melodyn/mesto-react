import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App_header">
        <img src={logo} className="App_logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.js</code>
          {' '}
          and save to reload.
        </p>
        <a
          className="App_link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
