import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUserService } from "../services/authApi";

export const signUpUserAction = createAsyncThunk(
  "signUpUserAction",
  async (signUpData) => {
    const response = await apiUserService.UserSignUp(signUpData);
    return response;
  }
);

export const loginUserAction = createAsyncThunk(
  "loginUserAction",
  async (loginData, thunkApi) => {
    const response = await apiUserService.UserLogin(loginData);
    setTimeout(() => {
      thunkApi.dispatch(getUserDataAction());
    }, 1000);
    return response;
  }
);

export const forgottPasswordAction = createAsyncThunk(
  "forgottPasswordAction",
  async (forgotData) => {
    const response = await apiUserService.forgotPassword(forgotData);
    return response;
  }
);

export const getUserDataAction = createAsyncThunk(
  "getUserDataAction",
  async () => {
    const response = await apiUserService.getUserData();
    return response.users[0];
  }
);

export const updateProfileAction = createAsyncThunk(
  "updateProfileAction",
  async (profileData) => {
    console.log("2,profile data", profileData);
    const response = await apiUserService.updateUserProfile(profileData);
    return response;
  }
);
