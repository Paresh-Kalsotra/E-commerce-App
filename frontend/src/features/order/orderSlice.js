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
      return { message: error.message };
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
    return { message: error.message };
  }
});

export const orderSlice = createSlice({
  name: "order",

  initialState: { userOrders: [], orderMsg: "" },

  extraReducers: (builder) => {
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      let message = action.payload.message;
      if (message) {
        state.orderMsg = message;
      }
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      let message = action.payload.message;
      let orders = action.payload.orders;
      if (orders) {
        state.userOrders = [...orders];
      }
      if (message) {
        state.orderMsg = message;
      }
    });
  },
});

export default orderSlice.reducer;
