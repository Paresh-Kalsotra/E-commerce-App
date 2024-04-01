import React, { useEffect } from "react";
import SearchComponent from "../components/SearchComponent";
import CategoryContainer from "../components/CategoryContainer";
import { useDispatch } from "react-redux";
import { getOrders } from "../features/order/orderSlice";
import { getCartItems } from "../features/cart/cartSlice";
import { getWishlist } from "../features/wishlist/wishlistSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "home-decoration",
    "groceries",
    "skincare",
  ];

  //fetching user data(orders,cart,wishlist )from server
  useEffect(() => {
    Fetch();
  }, []);

  async function Fetch() {
    await dispatch(getOrders());
    await dispatch(getCartItems());
    await dispatch(getWishlist());
  }

  return (
    <div className="container">
      <div className="search-container">
        <SearchComponent />
      </div>
      <hr />

      {categories.map((item) => (
        <CategoryContainer key={item} category={item} />
      ))}
    </div>
  );
};

export default HomePage;
