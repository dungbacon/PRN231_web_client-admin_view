import React, { useState } from "react";
import Header from "../../components/Login/Header";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const LoginModule = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const login = async (email, password) => {
    await axios
      .post("https://localhost:7249/api/Account/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          const token = response?.data?.accessToken;
          const role = response?.data?.account.role.roleDesc;

          localStorage.setItem("token", token);
          localStorage.setItem("role", role);

          setErrorMessage("");

          if (role.replace('"', "") === "admin") {
            navigate("/admin");
          } else {
            navigate(from, { replace: true });
          }
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Login failed!");
      });
  };

  return (
    <div className="min-h-full h-auto flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Header
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="Signup"
          linkUrl="/signup"
        />
        {errorMessage && (
          <div className=" text-red-500 text-[15px]"> {errorMessage} </div>
        )}
        <form
          className="space-y-6 flex flex-col justify-center"
          onSubmit={handleSubmit}
        >
          <div className="">
            <div className="my-5">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email-address"
                name="email"
                type="email"
                required={true}
                className="rounded-md appearance-none relative text-base block w-full h-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="my-5">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                required={true}
                className="rounded-md appearance-none relative text-base block w-full h-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-gray-600 hover:text-gray-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green -700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModule;
