import "./App.css";
import GraficoBarras from "./reporte/grafico-barras";
import moment from "moment";
import localization from "moment/locale/es";
import Layout from "./components/Layout";
import ReporteClientesAtendidos from "./pantalla/ReporteClientesAtendidos";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routers/AppRouter";

moment.updateLocale("es", localization);

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
