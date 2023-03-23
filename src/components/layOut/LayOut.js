import React from "react";
import Header from "../Header";
import Footer from "./Footer";

const LayOut = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default LayOut;
