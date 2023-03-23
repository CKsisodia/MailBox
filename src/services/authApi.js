import axios from "axios";
import { toast } from "react-toastify";

class ApiUserServices {
  static getInstance() {
    return new ApiUserServices();
  }

  UserSignUp = async (signUpData) => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNMEcw2hDdKSnSAn6kZAYBh0OXHmfcEOY",
        {
          email: signUpData.email,
          password: signUpData.password,
          returnSecureToken: true,
        }
      );
      toast.success("SignUp successfully, Go to Login Page");
      return response.data;
    } catch (error) {
      let err = "signUp failed";
      if (error.response.data.error.message) {
        err = error.response.data.error.message;
      }
      toast.error(err);
    }
  };

  UserLogin = async (loginData) => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCNMEcw2hDdKSnSAn6kZAYBh0OXHmfcEOY",
        {
          email: loginData.email,
          password: loginData.password,
          returnSecureToken: true,
        }
      );
      toast.success("Login successfully");
      return response.data;
    } catch (error) {
      let err = "Login Failed";
      if (error.response.data.error.message) {
        err = error.response.data.error.message;
      }
      toast.error(err);
    }
  };

  forgotPassword = async (forgotData) => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCNMEcw2hDdKSnSAn6kZAYBh0OXHmfcEOY",
        {
          requestType: "PASSWORD_RESET",
          email: forgotData.email,
        }
      );
      toast.success("Password Reset Link Sent");
      return response.data;
    } catch (error) {
      let err = "Process Failed, Try Again";
      if (error.response.data.error.message) {
        err = error.response.data.error.message;
      }
      toast.error(err);
    }
  };

  getUserData = async () => {
    try {
      const idToken = localStorage.getItem("idToken");
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCNMEcw2hDdKSnSAn6kZAYBh0OXHmfcEOY",
        {
          idToken: idToken,
        }
      );
      return response.data;
    } catch (error) {
      let err = "Process Failed, Try Again";
      if (error.response.data.error.message) {
        err = error.response.data.error.message;
      }
      console.log("You ARe LogOut So , error occured in getting data in authApi");
    }
  };

  updateUserProfile = async (profileData) => {
    try {
      const idToken = localStorage.getItem("idToken");
      console.log("3,profile data", profileData);

      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCNMEcw2hDdKSnSAn6kZAYBh0OXHmfcEOY",
        {
          idToken: idToken,
          displayName: profileData.displayName,
          photoUrl: profileData.photoUrl,
          returnSecureToken: true,
        }
      );
      toast.success("Profile Updated 😀");
      return response.data;
    } catch (error) {
      let err = "Update Failed, Try Again";
      if (error.response.data.error.message) {
        err = error.response.data.error.message;
      }
      toast.error(err);
    }
  };
}

export const apiUserService = ApiUserServices.getInstance();
