import React from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");

  return <Navigate to="/login" />;
};

export default Logout;
