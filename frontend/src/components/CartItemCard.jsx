import React from "react";
import { useDispatch } from "react-redux";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { addItem, decreaseCount, deleteItem } from "../features/cart/cartSlice";

const CartItemCard = ({ product }) => {
  const dispatch = useDispatch();

  const minusHandler = () => {
    dispatch(decreaseCount(product.id));
  };

  const plusHandler = () => {
    dispatch(addItem(product));
  };

  const deleteHandler = () => {
    dispatch(deleteItem(product.id));
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "10px",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #0364cb",
      }}
    >
      <img src={product.images[0]} width={50} height={50} alt={product.title} />

      <div style={{ width: "300px" }}>{product.title}</div>

      <div style={{ display: "inline-flex", alignItems: "center" }}>
        <button onClick={minusHandler} style={{ padding: "6px 10px" }}>
          <FaMinus />
        </button>

        <div style={{ margin: "0 10px" }}>{product.count}</div>
        <button onClick={plusHandler} style={{ padding: "6px 10px" }}>
          <FaPlus />
        </button>
      </div>

      <p>₹{product.price * product.count}</p>

      <button
        onClick={deleteHandler}
        style={{ padding: "6px 10px", background: "crimson" }}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItemCard;
