import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import GraficoBarras from "../reporte/grafico-barras";
import es from "date-fns/locale/es";
import moment from "moment";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./ReporteClientesAtendidos.scss";
import "react-datepicker/dist/react-datepicker.css";
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

  //Filtro por tipo de venta - Inicio

  const [tipo, setTipo] = useState("");

  const handleChangeTipo = (event) => {
    setTipo(event.target.value);
  };
  //Filtro por tipo de venta - Fin

  console.log(selectedDate);
  useEffect(() => {
    const execute = async () => {
      const pedidosHttp = await axios.get("http://localhost:1337/api/pedidos");

      setPedidos(pedidosHttp?.data?.data);
    };

    execute();
  }, []);

  console.log(tipo);
  const semanaPasadaData = pedidos
    .filter(
      (pedido) => moment(pedido.attributes.fecha).week() === selectedWeek - 1
    )
    .filter((pedido) => (tipo === "" ? true : pedido.attributes.tipo === tipo));

  const filtroxdia = (pedidosSemana, day) => {
    return pedidosSemana.filter(
      (x) => moment(x.attributes.fecha).day() === day
    );
  };

  const turnos = {
    manana: [
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "apertura"
        ),
        1
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "apertura"
        ),
        2
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "apertura"
        ),
        3
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "apertura"
        ),
        4
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "apertura"
        ),
        5
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "apertura"
        ),
        6
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "apertura"
        ),
        0
      ),
    ],

    intermedio: [
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "intermedio"
        ),
        1
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "intermedio"
        ),
        2
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "intermedio"
        ),
        3
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "intermedio"
        ),
        4
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "intermedio"
        ),
        5
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "intermedio"
        ),
        6
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "intermedio"
        ),
        0
      ),
    ],
    cierre: [
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "cierre"
        ),
        1
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "cierre"
        ),
        2
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "cierre"
        ),
        3
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "cierre"
        ),
        4
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "cierre"
        ),
        5
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "cierre"
        ),
        6
      ),
      filtroxdia(
        semanaPasadaData.filter(
          (pedido) => pedido.attributes.turno === "cierre"
        ),
        0
      ),
    ],
  };

  const graficoData = {
    labels,
    datasets: [
      {
        label: "Turno apertura",
        // data: turnos.manana.map((dia) => dia.length),
        data: turnos.manana.map((dia) =>
          valorGrafico === "Montos"
            ? dia.reduce((a, b) => a + b?.attributes?.monto, 0)
            : dia.length
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Turno intermedio",
        // data: turnos.intermedio.map((dia) => dia.length),
        data: turnos.intermedio.map((dia) =>
          valorGrafico === "Montos"
            ? dia.reduce((a, b) => a + b.attributes.monto, 0)
            : dia.length
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Turno cierre",
        data: turnos.cierre.map((dia) =>
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
        text: `Clientes atendidos - ${tipo} - ${valorGrafico}`,
      },
    },
  };

  return (
    <div className="container">
      <div className="title_container">
        <h3>Reporte de clientes atendidos</h3>
      </div>
      <div style={{ height: "100px" }} className="filtros-container">
        <Stack spacing={2} direction="row">
          <div>
            <DatePicker
              locale={es}
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </div>

          <Button variant="contained" size="small" onClick={toggleValorGrafico}>
            {valorGrafico === "Montos" ? "Mostrar cantidad" : "Mostrar montos"}
          </Button>

          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-select-small">Tipo de venta</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={tipo}
              label="Tipo de venta"
              onChange={handleChangeTipo}
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              <MenuItem value={`local`}>Local</MenuItem>
              <MenuItem value={`automovil`}>Automovil</MenuItem>
              <MenuItem value={`delivery`}>Delivery</MenuItem>
            </Select>
          </FormControl>
        </Stack>
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
