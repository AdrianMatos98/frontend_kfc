import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import ReporteClientesAtendidos from "../pantalla/ReporteClientesAtendidos";
import ReporteTicketPromedio from "../pantalla/ReporteTicketPromedio";

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="clientes-atendidos"
            element={<ReporteClientesAtendidos />}
          />
          <Route path="ticket-promedio" element={<ReporteTicketPromedio />} />
          <Route path="*" element={<ReporteClientesAtendidos />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRouter;
