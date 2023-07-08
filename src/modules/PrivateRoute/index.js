import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
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
    return (
      <div
        aria-label="Loading..."
        role="status"
        class="flex items-center space-x-2"
      >
        <svg
          class="h-20 w-20 animate-spin stroke-gray-500"
          viewBox="0 0 256 256"
        >
          <line
            x1="128"
            y1="32"
            x2="128"
            y2="64"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="195.9"
            y1="60.1"
            x2="173.3"
            y2="82.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="224"
            y1="128"
            x2="192"
            y2="128"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="195.9"
            y1="195.9"
            x2="173.3"
            y2="173.3"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="128"
            y1="224"
            x2="128"
            y2="192"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="60.1"
            y1="195.9"
            x2="82.7"
            y2="173.3"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="32"
            y1="128"
            x2="64"
            y2="128"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="60.1"
            y1="60.1"
            x2="82.7"
            y2="82.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></line>
        </svg>
        <span class="text-4xl font-medium text-gray-500">Loading...</span>
      </div>
    );
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
