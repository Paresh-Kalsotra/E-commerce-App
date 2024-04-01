import { createSlice } from "@reduxjs/toolkit";

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
});

export const { updateWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
