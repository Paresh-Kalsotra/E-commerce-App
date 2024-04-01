import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { updateWishlist } from "../features/wishlist/wishlistSlice";
import { useSelector } from "react-redux";

const ProductCard = ({ product }) => {
  const [cardmsg, setCardmsg] = useState("");
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  let isPresent = false;
  isPresent = wishlist.some((item) => item.id === product.id);

  async function addtoCart() {
    await dispatch(addItem(product));

    setCardmsg("Added to cart!");
    setTimeout(() => {
      setCardmsg("");
    }, 5000);
  }

  async function wishlistbtn() {
    await dispatch(updateWishlist(product));
  }

  return (
    <div className="product-card">
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
        <div style={{ display: "flex", fontWeight: "bold" }}>
          <p>{product.title}</p>
          <button className="wishlist-btn" onClick={wishlistbtn}>
            {isPresent ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
        <p>Rating:{product.rating}/5</p>
        <p>Price:₹{product.price}</p>
        <button onClick={addtoCart}>Add To Cart</button>
        <p className="message" style={{ color: "green" }}>
          {cardmsg}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
