import React from "react";
import {
  Sidebar,
  Menu,
  SubMenu,
  MenuItem,
  useProSidebar,
} from "react-pro-sidebar";
import { Link, Outlet } from "react-router-dom";
// import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const { collapseSidebar } = useProSidebar();

  return (
    <div style={{ display: "flex", minWidth: "100wh", minHeight: "100vh" }}>
      <Sidebar style={{ width: "10%" }}>
        <Menu>
          <SubMenu label="Ventas">
            <MenuItem routerLink={<Link to={`./clientes-atendidos`} />}>
              Clientes atendidos
            </MenuItem>
            <MenuItem routerLink={<Link to={`./ticket-promedio`} />}>
              Ticket promedio
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
      <main style={{ width: "90%" }}>
        {/* <button onClick={() => collapseSidebar()}>Collapse</button> */}
        {children}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
