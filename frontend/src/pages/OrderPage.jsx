import React, { useEffect, useState } from "react";
import { getOrders } from "../features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import OrderListItem from "../components/OrderListItem";

const OrderPage = () => {
  // const userOrders = useSelector((state) => state.order.userOrders);
  const [userOrders, setUserOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { payload } = await dispatch(getOrders());
    setUserOrders(payload);
  }

  return (
    <div style={{ border: "1px solid #378eeb", margin: "4% 8%" }}>
      <h3
        style={{
          background: "#378eeb",
          color: "#f0f0f0",
          textAlign: "center",
          padding: "10px",
          marginTop: "0",
        }}
      >
        Your Orders
      </h3>
      <div className="orderList">
        {userOrders && userOrders.length > 0 ? (
          <div>
            {userOrders.map((order) => (
              <OrderListItem key={order._id} order={order} />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "100px",
            }}
          >
            <p>No orders yet.</p>
            <p>Explore our products and start shopping!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
