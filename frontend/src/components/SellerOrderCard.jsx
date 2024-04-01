import React from "react";

const SellerOrderCard = (prop) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        padding: "10px",
        alignItems: "flex-Start",
        justifyContent: "space-between",
        borderBottom: "1px solid grey",
      }}
    >
      {" "}
      <img
        src={product.images[0]}
        width={100}
        height={100}
        alt={product.title}
      />
      <div className="prod-details">
        <p style={{ width: "200px" }}>Title: {product.title}</p>
        <p>Description: {product.description} </p>
        <p>Category: {product.category}</p>
        <p>Price: ₹{product.price} </p>
      </div>
    </div>
  );
};

export default SellerOrderCard;
