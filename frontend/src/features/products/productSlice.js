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

export const productSlice = createSlice({
  name: "products",
  initialState: [],

  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default productSlice.reducer;
