import logo from "./logo.svg";
import "./App.css";
import GraficoBarras from "./reporte/grafico-barras";
import ReporteClientesAtendidos from "./pantalla/ReporteClientesAtendidos";
import moment from 'moment';
import localization from 'moment/locale/es';

moment.updateLocale('es', localization);

function App() {
  return (
    <div className="App">
      <ReporteClientesAtendidos />
      {/* <GraficoBarras /> */}
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
