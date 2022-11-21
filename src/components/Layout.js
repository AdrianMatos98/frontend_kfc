import React from "react";
import {
  Sidebar,
  Menu,
  SubMenu,
  MenuItem,
  useProSidebar,
} from "react-pro-sidebar";
// import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const { collapseSidebar } = useProSidebar();

  return (
    <div style={{ display: "flex", minWidth: "100wh", minHeight: "100vh" }}>
      <Sidebar style={{ width: "10%" }}>
        <Menu>
          <SubMenu label="Ventas">
            <MenuItem> Clientes atendidos</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
      <main style={{ width: "90%" }}>
        {/* <button onClick={() => collapseSidebar()}>Collapse</button> */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
