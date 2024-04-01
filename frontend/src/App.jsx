import React from "react";
import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import MainDecisionPage from "./pages/MainDecisionPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Orderpage from "./pages/OrderPage";
import NotFoundPage from "./pages/NotFoundPage";
import WishlistPage from "./pages/WishlistPage";
import SellerHomePage from "./pages/SellerHomePage";
import SellerOrderpage from "./pages/SellerOrdersPage";

import Navbar from "./components/NavBar";
import SellerProductPage from "./pages/SellerProductPage";

const route = [
  { path: "/", element: <MainDecisionPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Outlet />
      </div>
    ),
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/wishlist", element: <WishlistPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/orders", element: <Orderpage /> },
    ],
  },
  { path: "/seller/home", element: <SellerHomePage /> },
  { path: "/seller/orders", element: <SellerOrderpage /> },
  { path: "/seller/product", element: <SellerProductPage /> },
  { path: "*", element: <NotFoundPage /> },
];

const router = createBrowserRouter(route);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
