import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const server_uri = import.meta.env.VITE_SERVER_URI;

export const loginUser = createAsyncThunk(
  "register/loginUser",
  async (user) => {
    try {
      //---------
      let url = server_uri + "/api/users/login";
      if (user.role === "seller") url = server_uri + "/api/sellers/login";
      //---------

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user.data),
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
  async (user) => {
    try {
      //--------
      let url = server_uri + "/api/users/signup";
      if (user.role === "seller") url = server_uri + "/api/sellers/signup";
      //-----------

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user.data),
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
  initialState: {
    role: "",
    message: "",
  },
  reducers: {
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
  },

  extraReducers: (builder) => {
    //----------------login-------------------
    builder.addCase(loginUser.fulfilled, (state, action) => {
      let data = action.payload;
      if (data.message === "Authenticated") {
        localStorage.setItem("userToken", data.userToken);
        localStorage.setItem("userID", data.userID);
      }
      state.message = data.message;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.message = "Error logging";
    });

    //--------------signup-----------------
    builder.addCase(signupUser.fulfilled, (state, action) => {
      let data = action.payload;
      if (data.message === "Authenticated") {
        localStorage.setItem("userToken", data.userToken);
        localStorage.setItem("userID", data.userID);
      }
      state.message = data.message;
    });

    builder.addCase(signupUser.rejected, (state, action) => {
      state.message = "Error Signing";
    });
  },
});

export const { setUserRole } = registerSlice.actions;
export default registerSlice.reducer;
