import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducer/authSlice";
import mailBoxSlice from "../reducer/mailBoxSlice";

const store = configureStore({
  reducer: { user: authSlice.reducer, mailBox:mailBoxSlice.reducer },
});

export default store;
