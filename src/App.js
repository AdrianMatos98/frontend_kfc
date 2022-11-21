import "./App.css";
import GraficoBarras from "./reporte/grafico-barras";
import moment from "moment";
import localization from "moment/locale/es";
import Layout from "./components/Layout";
import ReporteClientesAtendidos from "./pantalla/ReporteClientesAtendidos";

moment.updateLocale("es", localization);

function App() {
  return (
    <Layout>
      <ReporteClientesAtendidos />
    </Layout>
  );
}

export default App;
