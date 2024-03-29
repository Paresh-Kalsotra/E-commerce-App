import React from "react";
import { NavLink } from "react-router-dom";
import { IoCart, IoHome } from "react-icons/io5";
import { BsCardChecklist } from "react-icons/bs";

function Navbar() {
  return (
    <nav>
      <h3 style={{ color: "#f0f0f0", fontWeight: "bold", paddingLeft: "3%" }}>
        E-commerce App
      </h3>
      <div>
        <NavLink to="/home">
          <IoHome />
        </NavLink>
        <NavLink to="/cart">
          <IoCart />
        </NavLink>
        <NavLink to="/orders">
          <BsCardChecklist />
        </NavLink>
      </div>
    </nav>
  );
}
export default Navbar;
