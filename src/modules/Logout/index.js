import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
  Cookies.remove("jwtToken");
  Cookies.remove("role");
  Cookies.remove("accountId");
  return <Navigate to="/login" />;
};

export default Logout;
