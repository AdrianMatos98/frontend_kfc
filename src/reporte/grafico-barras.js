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
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "Clientes atendidos",
//     },
//   },
// };

const GraficoBarras = ({ graficoData, options }) => {
  return <Bar options={options} data={graficoData} />;
};

export default GraficoBarras;
