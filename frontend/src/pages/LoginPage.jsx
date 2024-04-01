import React, { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../features/user/userRegisterSlice";
import { useSelector } from "react-redux";

const initialState = {
  email: "",
  password: "",
};

const reducer = (loginState, action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...loginState, [action.name]: action.value };
    default:
      return loginState;
  }
};

function LoginPage() {
  const [loginState, dispatch] = useReducer(reducer, initialState);
  const userRole = useSelector((state) => state.userRegister.role);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  //-------------------changing login credentials
  const handleChange = (e) => {
    dispatch({ type: "CHANGE", name: e.target.name, value: e.target.value });
  };

  //-------------------submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { payload } = await dispatcher(
      loginUser({ data: loginState, role: userRole })
    );

    if (payload.message === "Authenticated") {
      if (userRole == "customer") navigate("/home");
      if (userRole == "seller") navigate("/seller/home");
    } else {
      setMessage(payload.message);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "10vh", color: "#0364cb" }}>
        Welcome!
      </h1>
      <div className="box">
        <h1>Login </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={loginState.email}
            onChange={handleChange}
            placeholder="Enter Email"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            value={loginState.password}
            onChange={handleChange}
            placeholder="Enter Password"
            required
          />
          <br />
          <button type="submit">Submit</button>
        </form>

        <p className="message">{message}</p>
        <p>
          New Here? <NavLink to="/signup"> Signup</NavLink>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
