import { createSlice } from "@reduxjs/toolkit";
import { getUserDataAction, loginUserAction } from "./asyncAuth";

const authSlice = createSlice({
  name: "user",
  initialState: {
    getUserData: undefined,
  },

  reducers: {
    logOutUser(state, action) {
      localStorage.removeItem("idToken");
      state.getUserData = undefined;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      localStorage.setItem("idToken", action.payload.idToken);
    });

    builder.addCase(getUserDataAction.fulfilled, (state, action) => {
      state.getUserData = action.payload;
      console.log("6 get data action", action.payload);
    });
  },
});

export default authSlice;
export const authSliceAction = authSlice.actions;
