import React, { useEffect, useState } from "react";
import { getOrders } from "../features/order/orderSlice";
import { useDispatch } from "react-redux";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { payload } = await dispatch(getOrders());
    setOrders(payload.message);
  }

  console.log(orders);
  return <div>OrderPage</div>;
};

export default OrderPage;
