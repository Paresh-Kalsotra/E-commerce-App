import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const server_uri = import.meta.env.VITE_SERVER_URI;

//---------------------------------
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderItems) => {
    try {
      let userID = localStorage.getItem("userID");
      const response = await fetch(server_uri + "/api/orders/" + userID, {
        method: "POST",
        headers: {
          "Auth-Token": localStorage.getItem("userToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderItems: orderItems }),
      });

      const res = await response.json();
      return res;
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);
//--- get all  orders
export const getOrders = createAsyncThunk("order/getOrders", async () => {
  try {
    let userID = localStorage.getItem("userID");
    const response = await fetch(server_uri + "/api/orders/" + userID, {
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
  }
});

export const orderSlice = createSlice({
  name: "orders",
  initialState: [],

  extraReducers: (builder) => {
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default orderSlice.reducer;
