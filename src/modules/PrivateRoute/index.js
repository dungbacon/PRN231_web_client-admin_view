import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";
import Cookies from "js-cookie";

const PrivateRoutes = () => {
  const token = Cookies.get("jwtToken");
  const role = Cookies.get("role");
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          "https://localhost:7249/api/Account/verify",
          null,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token.toString(),
            },
          }
        );
        if (response.status === 200) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.error(error);
        setAuth(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setAuth(false);
    }
  }, [token]);

  if (auth === null) {
    return <Loading />;
  }

  return auth ? (
    role.replaceAll('"', "") === "admin" ? (
      <Outlet />
    ) : (
      <Navigate to="/notfound" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
