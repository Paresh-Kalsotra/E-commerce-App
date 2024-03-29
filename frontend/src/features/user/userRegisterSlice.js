import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const server_uri = import.meta.env.VITE_SERVER_URI;

export const loginUser = createAsyncThunk(
  "register/loginUser",
  async (userData) => {
    try {
      const response = await fetch(server_uri + "/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

//---------------------------------------------------
export const signupUser = createAsyncThunk(
  "register/signupUser",
  async (userData) => {
    try {
      const response = await fetch(server_uri + "/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState: {},

  extraReducers: (builder) => {
    //----------------login-------------------
    builder.addCase(loginUser.fulfilled, (state, action) => {
      let data = action.payload;
      if (data.message === "User Authenticated") {
        localStorage.setItem("userToken", data.userToken);
        localStorage.setItem("userID", data.userID);
      }
      return { message: data.message };
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      return { message: "Error logging" };
    });

    //--------------signup-----------------
    builder.addCase(signupUser.fulfilled, (state, action) => {
      let data = action.payload;
      if (data.message === "User Authenticated") {
        localStorage.setItem("userToken", data.userToken);
        localStorage.setItem("userID", data.userID);
      }
      return { message: data.message };
    });

    builder.addCase(signupUser.rejected, (state, action) => {
      return { message: "Error Signing" };
    });
  },
});

export default registerSlice.reducer;
