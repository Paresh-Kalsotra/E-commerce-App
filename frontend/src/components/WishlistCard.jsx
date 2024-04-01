import React, { useState } from "react";
import { FaMinusCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import { updateWishlist } from "../features/wishlist/wishlistSlice";

const WishlistCard = ({ product }) => {
  const [cardmsg, setCardmsg] = useState("");
  const dispatch = useDispatch();

  function addtoCart() {
    dispatch(addItem(product));
    setCardmsg("Added to cart!");
    setTimeout(() => {
      setCardmsg("");
    }, 5000);
  }

  function wishlistbtn() {
    dispatch(updateWishlist(product));
  }

  return (
    <div className="wishlist-card">
      <img
        src={product.images[0]}
        width={200}
        height={100}
        alt={product.title}
      />

      <div
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div style={{ display: "flex", fontWeight: "bold" }}>
          <p>{product.title}</p>
          <button
            className="wishlist-btn"
            onClick={wishlistbtn}
            style={{ color: "red" }}
          >
            <FaMinusCircle />
          </button>
        </div>
        <p>Rating:{product.rating}/5</p>
        <p>Price:₹{product.price * 100}</p>
        <button onClick={addtoCart}>Add To Cart</button>{" "}
        <p className="message" style={{ color: "green" }}>
          {cardmsg}
        </p>
      </div>
    </div>
  );
};

export default WishlistCard;
