import React from "react";

const OrderListItem = ({ order }) => {
  return (
    <div
      style={{
        padding: "10px",

        borderBottom: "1px solid #0364cb",
      }}
    >
      <p style={{ marginTop: "5px", fontWeight: "bold" }}>
        Order Tracking Id:{order._id}
      </p>
      <ul>
        {order.items.map((product) => (
          <li
            style={{
              display: "flex",
              alignItems: "center",
            }}
            key={product._id}
          >
            <img
              src={product.images[0]}
              width={30}
              height={30}
              alt={product.title}
            />
            <p style={{ width: "300px" }}>{product.title}</p>

            <p>Item Price: ₹ {product.price}</p>
            <p>Quantity: {product.count}</p>
          </li>
        ))}
      </ul>
      {/* <p style={{ marginTop: "5px", fontWeight: "bold" }}>Total:</p> */}
    </div>
  );
};

OrderListItem.propTypes = {};

export default OrderListItem;
