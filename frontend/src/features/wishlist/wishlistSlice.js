import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const server_uri = import.meta.env.VITE_SERVER_URI;

//--- ----------------
export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async () => {
    try {
      let userID = localStorage.getItem("userID");
      const response = await fetch(server_uri + "/api/wishlist/" + userID, {
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
  }
);

//---------------------------------
export const sendWishlist = createAsyncThunk(
  "wishlist/sendWishlist",
  async (wishlist) => {
    try {
      let userID = localStorage.getItem("userID");
      const response = await fetch(server_uri + "/api/wishlist/" + userID, {
        method: "POST",
        headers: {
          "Auth-Token": localStorage.getItem("userToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wishlist: wishlist }),
      });
      const res = await response.json();
      // console.log(res)
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    updateWishlist: (state, action) => {
      const existingItemIndex = state.wishlistItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        state.wishlistItems.splice(existingItemIndex, 1);
      } else {
        state.wishlistItems.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWishlist.fulfilled, (state, action) => {
      let message = action.payload.message;
      let wishlist = action.payload.wishlist;
      if (wishlist) {
        state.wishlistItems = [...wishlist];
      }
    });
  },
});

export const { updateWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
