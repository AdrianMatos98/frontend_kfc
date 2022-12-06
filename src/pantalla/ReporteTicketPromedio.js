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
/////aaaaa
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
/////sasasass

import "./ReporteClientesAtendidos.scss";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("es", es);

const ReporteTicketPromedio = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedWeek = moment(selectedDate).week();

  const [pedidos, setPedidos] = useState([]);

  const [vendedores, setVendedores] = useState([]);

  useEffect(() => {
    const execute = async () => {
      const vendedoresHttp = await axios.get(
        "http://localhost:1337/api/vendedors"
      );
      const pedidosHttp = await axios.get(
        "http://localhost:1337/api/pedidos?populate=*"
      );

      setVendedores(vendedoresHttp?.data?.data);
      setPedidos(pedidosHttp?.data?.data);
    };

    execute();
  }, []);

  const semanaPasadaData = pedidos.filter(
    (pedido) => moment(pedido.attributes.fecha).week() === selectedWeek - 1
  );

  const pedidosOrdenados = vendedores.map((vendedor) => {
    const ventas = semanaPasadaData.filter(
      (pedido) => pedido.attributes.vendedor?.data?.id === vendedor.id
    );
    const montoTotal = ventas.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.attributes.monto,
      0
    );

    return {
      id: vendedor.id,
      nombre: vendedor.attributes.nombre,
      numeroVentas: ventas.length,
      montoTotal: montoTotal,
      ticketPromedio: Math.round(
        ventas.length ? montoTotal / ventas.length : 0
      ),
    };
  });

  return (
    <div className="container">
      <div className="title_container">
        <h3>Reporte de ticket promedio</h3>
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
        </Stack>
      </div>
      <div className="grafico_container">
        <div className="grafico_70">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Vendedor</TableCell>
                  <TableCell align="right"># de ventas</TableCell>
                  <TableCell align="right">Monto total</TableCell>
                  <TableCell align="right">Monto promedio</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pedidosOrdenados.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.nombre}
                    </TableCell>
                    <TableCell align="right">{row.numeroVentas}</TableCell>
                    <TableCell align="right">{row.montoTotal}</TableCell>
                    <TableCell align="right">{row.ticketPromedio}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default ReporteTicketPromedio;
