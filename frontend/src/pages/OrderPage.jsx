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
  return (
    <div style={{ border: "1px solid #378eeb", margin: "4% 8%" }}>
      <h3
        style={{
          background: "#378eeb",
          color: "#f0f0f0",
          textAlign: "center",
          padding: "10px",
        }}
      >
        Your Orders
      </h3>
      <div className="orderList">
        {orders && orders.length > 0 ? (
          <div>
            {orders.map((item) => (
              <orderListItem key={item.id} item={item} />
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
