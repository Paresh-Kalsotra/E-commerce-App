import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "../features/user/userRegisterSlice.js";
import productSlice from "../features/products/productSlice.js";
import cartSlice from "../features/cart/cartSlice.js";
import orderSlice from "../features/order/orderSlice.js";

export const store = configureStore({
  reducer: {
    UserRegister: RegisterSlice,
    products: productSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});
