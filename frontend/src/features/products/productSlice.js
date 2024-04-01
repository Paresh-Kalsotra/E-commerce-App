import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const server_uri = import.meta.env.VITE_SERVER_URI;

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (category) => {
    try {
      const response = await fetch(server_uri + "/api/products/" + category);
      return await response.json();
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);

export const searchProduct = createAsyncThunk(
  "products/searchProduct",
  async (search) => {
    try {
      const response = await fetch(
        server_uri + "/api/products/search/" + search
      );
      return await response.json();
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: { searchedProducts: [] },

  extraReducers: (builder) => {
    builder.addCase(searchProduct.fulfilled, (state, action) => {
      if (action.payload.length !== -1) {
        state.searchedProducts = [...action.payload];
      }
    });
  },
});

export default productSlice.reducer;
