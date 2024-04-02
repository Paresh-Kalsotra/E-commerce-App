import React from "react";
import SellerNavbar from "../components/SellerNavbar";
import { useSelector } from "react-redux";
import SellerOrderCard from "../components/SellerOrderCard";
import OrderListItem from "../components/OrderListItem";

const SellerOrdersPage = () => {
  const sellerOrders = useSelector((state) => state.seller.sellerOrders);

  return (
    <div>
      <SellerNavbar />
      <h2 style={{ margin: "20px" }}>Orders for you: </h2>
      {sellerOrders && sellerOrders.length > 0 ? (
        <div>
          {sellerOrders.map((order) => (
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
          <p>You haven't got any orders yet. </p>
        </div>
      )}
    </div>
  );
};

export default SellerOrdersPage;
