import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import GraficoBarras from "../reporte/grafico-barras";
import es from "date-fns/locale/es";
import moment from "moment";
import "./ReporteClientesAtendidos.scss";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
registerLocale("es", es);

const labels = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

const ReporteClientesAtendidos = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedWeek = moment(selectedDate).week();

  const [pedidos, setPedidos] = useState([]);
  const [valorGrafico, setValorGrafico] = useState("Montos");

  useEffect(() => {
    const execute = async () => {
      const pedidosHttp = await axios.get("http://localhost:1337/api/pedidos");

      setPedidos(pedidosHttp?.data?.data);
    };

    execute();
  }, []);

  const semanaPasadaData = pedidos.filter(
    (pedido) => moment(pedido.attributes.fecha).week() === selectedWeek - 1
  );

  const filtroxdia = (pedidosSemana, day) => {
    return pedidosSemana.filter(
      (x) => moment(x.attributes.fecha).day() === day
    );
  };

  const turnos = {
    manana: [
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "mañana"
        ),
        1
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "mañana"
        ),
        2
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "mañana"
        ),
        3
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "mañana"
        ),
        4
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "mañana"
        ),
        5
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "mañana"
        ),
        6
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "mañana"
        ),
        0
      ),
    ],

    tarde: [
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "tarde"
        ),
        1
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "tarde"
        ),
        2
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "tarde"
        ),
        3
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "tarde"
        ),
        4
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "tarde"
        ),
        5
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "tarde"
        ),
        6
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "tarde"
        ),
        0
      ),
    ],
    noche: [
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "noche"
        ),
        1
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "noche"
        ),
        2
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "noche"
        ),
        3
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "noche"
        ),
        4
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "noche"
        ),
        5
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "noche"
        ),
        6
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "noche"
        ),
        0
      ),
    ],
  };

  console.log("turnos");
  console.log(turnos);

  console.log("montos");
  console.log(
    turnos.tarde.map((dia) => dia.reduce((a, b) => a + b?.attributes?.monto, 0))
  );

  const graficoData = {
    labels,
    datasets: [
      {
        label: "Turno mañana",
        // data: turnos.manana.map((dia) => dia.length),
        data: turnos.manana.map((dia) =>
          valorGrafico === "Montos"
            ? dia.reduce((a, b) => a + b?.attributes?.monto, 0)
            : dia.length
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Turno tarde",
        // data: turnos.tarde.map((dia) => dia.length),
        data: turnos.tarde.map((dia) =>
          valorGrafico === "Montos"
            ? dia.reduce((a, b) => a + b.attributes.monto, 0)
            : dia.length
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Turno noche",
        data: turnos.noche.map((dia) =>
          valorGrafico === "Montos"
            ? dia.reduce((a, b) => a + b?.attributes?.monto, 0)
            : dia.length
        ),
        backgroundColor: "rgba( 82, 255, 51 , 0.5)",
      },
    ],
  };

  const toggleValorGrafico = () => {
    setValorGrafico((x) => (x === "Montos" ? "Cantidad" : "Montos"));
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Clientes atendidos - ${valorGrafico}`,
      },
    },
  };

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
        <div>
          <button onClick={toggleValorGrafico}>
            {valorGrafico === "Montos" ? "Mostrar cantidad" : "Mostrar montos"}
          </button>
        </div>
      </div>
      <div className="grafico_container">
        <div className="grafico_70">
          <GraficoBarras graficoData={graficoData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ReporteClientesAtendidos;
