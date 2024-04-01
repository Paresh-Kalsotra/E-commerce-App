import React from "react";
import { useNavigate } from "react-router-dom";
import { setUserRole } from "../features/user/userRegisterSlice";
import { useDispatch } from "react-redux";

const MainDecisionPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelection = (userType) => {
    if (userType === "customer") {
      dispatch(setUserRole("customer"));
    }
    if (userType === "seller") {
      dispatch(setUserRole("seller"));
    }
    navigate("/login");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "10vh" }}>
        Please select your role:
      </h1>
      <div
        className="box"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          paddingTop: "20px",
        }}
      >
        <button
          style={{ width: "100px", fontSize: "1.2em" }}
          onClick={() => handleSelection("customer")}
        >
          Customer
        </button>
        <button
          style={{ width: "100px", fontSize: "1.2em" }}
          onClick={() => handleSelection("seller")}
        >
          Seller
        </button>
      </div>
    </div>
  );
};

export default MainDecisionPage;
