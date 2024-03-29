import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItemCard from "../components/CartItemCard";
import { sendCartItems } from "../features/cart/cartSlice";
import { placeOrder } from "../features/order/orderSlice";

const CartPage = () => {
  const [message, setMessage] = useState("");
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setMessage("");
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.count;
    });
    setTotal(totalPrice);
    //--------later also populate cartitems from server

    //-----------sending cartitems to server
    dispatch(sendCartItems(cartItems));
  }, [cartItems]);

  async function handlePlaceOrder() {
    const confirmed = window.confirm("Please confirm your order.");
    if (confirmed) {
      const { payload } = await dispatch(placeOrder(cartItems));
      setMessage(payload.message);
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
        }}
      >
        Your Cart
      </h3>
      <div className="cartItem">
        {cartItems && cartItems.length > 0 ? (
          <div>
            {cartItems.map((item) => (
              <CartItemCard key={item.id} product={item} />
            ))}
            <div style={{ padding: "20px", textAlign: "right" }}>
              <h3>Summary</h3>
              <p style={{ margin: "5px" }}>Total = ₹{total}</p>
              <button onClick={handlePlaceOrder}>Order</button>
              <p className="message">{message}</p>
            </div>
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "100px",
            }}
          >
            <p>Your cart is empty.</p>
            <p>Explore our products and start shopping!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
