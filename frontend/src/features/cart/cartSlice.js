import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const server_uri = import.meta.env.VITE_SERVER_URI;

//--- get all  cart items
export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  try {
    let userID = localStorage.getItem("userID");
    const response = await fetch(server_uri + "/api/cart/" + userID, {
      method: "GET",
      headers: {
        "Auth-Token": localStorage.getItem("userToken"),
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();

    return res;
  } catch (error) {
    console.log("Error: ", error);
    return { message: error.message };
  }
});

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
      // console.log(res)
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);

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
    emptyCart: (state, action) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      let message = action.payload.message;
      let cart = action.payload.cart;
      if (cart) {
        state.cartItems = [...cart];
      }
    });
  },
});

export const { addItem, decreaseCount, deleteItem, emptyCart } =
  cartSlice.actions;

export default cartSlice.reducer;
