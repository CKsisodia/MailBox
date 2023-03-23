import React from "react";
import LayOut from "./LayOut";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import HomeImage from "../Images/HomeImage.jpg";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();
  const isLoggedin = useSelector((state) => state.user.getUserData);

  const isNotLoggedin = () => {
    toast.warn("You are not Logged_in");
    setTimeout(() => {
      navigate("login");
    }, 1500);
  };

  return (
    <LayOut>
      <div
        style={{
          minHeight: "65vh",
          backgroundImage: `url(${HomeImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {isLoggedin ? (
          <Link to="/MailBoxAppBar">
            <Button>Go To Mail Box</Button>
          </Link>
        ) : (
          <Button onClick={isNotLoggedin}>Go To Mail Box</Button>
        )}
      </div>
    </LayOut>
  );
};

export default HomePage;
