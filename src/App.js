import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Login, { ForgotPasswordPage } from "./components/authentication/Login";
import SignUp from "./components/authentication/SignUp";
import HomePage from "./components/layOut/HomePage";
import MailBoxAppBar from "./components/MailBoxAppBar";
import UserProfile from "./components/UserProfile";
import { getUserDataAction } from "./reducer/asyncAuth";
import { getMailAction } from "./reducer/asyncMailBox";

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.getUserData);

  useEffect(() => {
    dispatch(getUserDataAction());
  }, []);

  useEffect(() => {
    if (userData) {
      dispatch(getMailAction(userData.email));
    }
  }, [userData]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/MailBoxAppBar" element={<MailBoxAppBar />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgotPassword" element={<ForgotPasswordPage />}></Route>
        <Route path="/userProfile" element={<UserProfile />}></Route>
      </Routes>
    </div>
  );
}

export default App;
