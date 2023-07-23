import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
  Cookies.remove("jwtToken");
  localStorage.removeItem("role");
  localStorage.removeItem("accountId");

  return <Navigate to="/login" />;
};

export default Logout;
