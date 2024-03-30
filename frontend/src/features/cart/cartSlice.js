import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const server_uri = import.meta.env.VITE_SERVER_URI;

//---------------------------------
export const sendCartItems = createAsyncThunk(
  "cart/sendCartItems",
  async (cart) => {
    try {
      let userID = localStorage.getItem("userID");
      const response = await fetch(server_uri + "/api/cart/" + userID, {
        method: "POST",
        headers: {
          "Auth-Token": localStorage.getItem("userToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: cart }),
      });

      const res = await response.json();
      return res;
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);
// another thunk to be added to get fetch cart items once on app load

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addItem: (state, action) => {
      const existingProduct = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.count += 1;
      } else {
        state.cartItems.push({
          ...action.payload,
          price: action.payload.price * 100,
          count: 1,
        });
      }
    },

    decreaseCount: (state, action) => {
      const existingProduct = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (existingProduct && existingProduct.count > 0) {
        if (existingProduct.count === 1) {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload
          );
        }
        existingProduct.count -= 1;
      }
    },

    deleteItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
  },
});

export const { addItem, decreaseCount, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;
