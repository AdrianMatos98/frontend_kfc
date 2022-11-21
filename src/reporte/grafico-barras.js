import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Clientes atendidos",
    },
  },
};

const labels = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

const GraficoBarras = ({ selectedWeek }) => {
  const [pedidos, setPedidos] = useState([]);

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
  const filtroxturno = (pedidosSemana, turno) => {
    return pedidosSemana.filter(
      (x) => moment(x.attributes.fecha).day() === turno
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

  const graficoData = {
    labels,
    datasets: [
      {
        label: "Turno mañana",
        data: turnos.manana.map((dia) => dia.length),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Turno tarde",
        data: turnos.tarde.map((dia) => dia.length),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Turno noche",
        data: turnos.noche.map((dia) => dia.length),
        backgroundColor: "rgba( 82, 255, 51 , 0.5)",
      },
    ],
  };

  return <Bar options={options} data={graficoData} />;
};

export default GraficoBarras;
