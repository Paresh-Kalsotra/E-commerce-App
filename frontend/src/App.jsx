import React from "react";
import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Orderpage from "./pages/OrderPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/NavBar";

const route = [
  { path: "/", element: <LoginPage /> },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Outlet />
      </div>
    ),
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      { path: "/orders", element: <Orderpage /> },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter(route);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
