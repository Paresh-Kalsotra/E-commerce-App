import React, { useEffect, useState } from "react";
import { getOrders } from "../features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import OrderListItem from "../components/OrderListItem";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const userOrders = useSelector((state) => state.order.userOrders);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    let { payload } = await dispatch(getOrders());

    if (payload.message) {
      if (payload.message === "Unauthorised") {
        alert("You are not authorised. Please login again");
        navigate("/");
      }
      setMessage(payload.message);
    } else {
      setMessage("");
    }
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
            {message ? (
              <p>{message}</p>
            ) : (
              <>
                <p>No orders yet.</p>
                <p>Explore our products and start shopping!</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
