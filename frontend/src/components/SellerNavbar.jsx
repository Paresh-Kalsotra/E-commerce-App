import React from "react";
import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BsCardChecklist } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

function SellerNavbar() {
  return (
    <nav style={{ background: "green" }}>
      <h3 style={{ color: "#f0f0f0", fontWeight: "bold", paddingLeft: "3%" }}>
        E-commerce App
      </h3>
      <div>
        <NavLink to="/seller/home">
          <IoHome />
        </NavLink>
        <NavLink to="/seller/product">
          <FaPlus />
        </NavLink>
        <NavLink to="/seller/orders">
          <BsCardChecklist />
        </NavLink>
      </div>
    </nav>
  );
}
export default SellerNavbar;
