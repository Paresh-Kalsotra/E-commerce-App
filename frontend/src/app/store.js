import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "../features/user/userRegisterSlice.js";
import productSlice from "../features/products/productSlice.js";
import cartSlice from "../features/cart/cartSlice.js";
import orderSlice from "../features/order/orderSlice.js";
import wishlistSlice from "../features/wishlist/wishlistSlice.js";
import sellerSlice from "../features/seller/sellerSlice.js";

export const store = configureStore({
  reducer: {
    userRegister: RegisterSlice,
    products: productSlice,
    cart: cartSlice,
    order: orderSlice,
    wishlist: wishlistSlice,
    seller: sellerSlice,
  },
});
