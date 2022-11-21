import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import GraficoBarras from "../reporte/grafico-barras";
import es from "date-fns/locale/es";
import moment from "moment";
import "./ReporteClientesAtendidos.scss";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("es", es);

const ReporteClientesAtendidos = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedWeek = moment(selectedDate).week();
  console.log(moment(selectedDate).format("MMMM"));

  console.log("selectedWeek");
  console.log(selectedWeek);
  return (
    <div className="container">
      <div className="title_container">
        <h3>Reporte de clientes atendidos</h3>
      </div>
      <div style={{ height: "100px" }} className="filtros-container">
        <div>
          <DatePicker
            locale={es}
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
        </div>
      </div>
      <div className="grafico_container">
        <div className="grafico_70">
          <GraficoBarras selectedWeek={selectedWeek} />
        </div>
      </div>
    </div>
  );
};

export default ReporteClientesAtendidos;
