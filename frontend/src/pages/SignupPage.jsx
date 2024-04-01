import React, { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { signupUser } from "../features/user/userRegisterSlice";
import { useSelector } from "react-redux";

const initialState = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const reducer = (signupState, action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...signupState, [action.name]: action.value };
    default:
      return signupState;
  }
};

function SignupPage() {
  const [signupState, dispatch] = useReducer(reducer, initialState);

  const userRole = useSelector((state) => state.userRegister.role);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  //---------------------changing credentials
  const handleChange = (e) => {
    dispatch({ type: "CHANGE", name: e.target.name, value: e.target.value });
  };

  //-------------------submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signupState.password !== signupState.confirmPassword) {
      return setMessage("Passwords do not match");
    }

    const { payload } = await dispatcher(
      signupUser({ data: signupState, role: userRole })
    );

    if (payload.message === "Authenticated") {
      if (userRole == "customer") navigate("/home");
      if (userRole == "seller") navigate("/seller/home");
    }
    setMessage(payload.message);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "10vh", color: "#0364cb" }}>
        Welcome!
      </h1>
      <div className="box">
        <h1>Sign Up </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            value={signupState.userName}
            onChange={handleChange}
            placeholder="UserName"
            required
          />
          <br />
          <input
            type="email"
            name="email"
            value={signupState.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            value={signupState.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={signupState.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
          <br />

          <button type="submit">Submit</button>
        </form>

        <p className="message">{message}</p>
        <p>
          Already a User? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
