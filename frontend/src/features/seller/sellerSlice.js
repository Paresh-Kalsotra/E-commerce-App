import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const server_uri = import.meta.env.VITE_SERVER_URI;

//-----------------------
export const fetchSellerProducts = createAsyncThunk(
  "seller/fetchSellerProducts",
  async () => {
    try {
      let sellerID = localStorage.getItem("userID");
      const response = await fetch(
        server_uri + "/api/products/seller/" + sellerID
      );
      return await response.json();
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);

export const addProductToStore = createAsyncThunk(
  "store/addProductToStore",
  async (productData) => {
    try {
      let sellerID = localStorage.getItem("userID");
      const response = await fetch(
        server_uri + "/api/products/seller/" + sellerID,
        {
          method: "POST",
          headers: {
            "Auth-Token": localStorage.getItem("userToken"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );
      return await response.json();
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "store/deleteProduct",
  async (product) => {
    try {
      let sellerID = localStorage.getItem("userID");
      const response = await fetch(
        server_uri + "/api/products/seller/" + sellerID,
        {
          method: "DELETE",
          headers: {
            "Auth-Token": localStorage.getItem("userToken"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );
      return await response.json();
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "store/updateProduct",
  async (productData) => {
    try {
      let sellerID = localStorage.getItem("userID");
      const response = await fetch(
        server_uri + "/api/products/seller/" + sellerID,
        {
          method: "PATCH",
          headers: {
            "Auth-Token": localStorage.getItem("userToken"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );
      return await response.json();
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);
//-----------------------------
export const fetchSellerOrders = createAsyncThunk(
  "seller/fetchSellerOrders",
  async () => {
    try {
      let sellerID = localStorage.getItem("userID");
      const response = await fetch(
        server_uri + "/api/orders/seller/" + sellerID,
        {
          method: "GET",
          headers: {
            "Auth-Token": localStorage.getItem("userToken"),
            "Content-Type": "application/json",
          },
        }
      );
      return await response.json();
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);

//-----------------------
export const sellerSlice = createSlice({
  name: "seller",
  initialState: { sellerProducts: [], sellerOrders: [] },

  extraReducers: (builder) => {
    builder.addCase(fetchSellerProducts.fulfilled, (state, action) => {
      if (action.payload.length !== -1) {
        state.sellerProducts = [...action.payload];
      }
    });
    builder.addCase(addProductToStore.fulfilled, (state, action) => {
      state.sellerProducts.push(action.payload);
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.sellerProducts = state.sellerProducts.filter(
        (product) => product._id !== action.payload._id
      );
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const updatedProductIndex = state.sellerProducts.findIndex(
        (product) => product._id === action.payload._id
      );
      if (updatedProductIndex !== -1) {
        state.sellerProducts[updatedProductIndex] = action.payload;
      }
    });

    builder.addCase(fetchSellerOrders.fulfilled, (state, action) => {
      const orders = action.payload.orders;
      if (orders.length !== -1) {
        state.sellerOrders = [...orders];
      }
    });
  },
});
export default sellerSlice.reducer;
