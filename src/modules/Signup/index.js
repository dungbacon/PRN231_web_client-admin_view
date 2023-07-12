import React, { useState } from "react";
import Header from "../../components/Login/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordComfirm, setPasswordComfirm] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  const handleLoginSuccess = () => {
    navigate("/login");
  };

  const register = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7249/api/Account/register",
        {
          email: email,
          password: password,
          fullName: fullname,
          phoneNumber: phoneNum,
        }
      );

      if (response.status === 200) {
        handleLoginSuccess();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-full h-auto flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 ">
        <Header
          heading="Signup to create an account"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/login"
        />
        <form
          className="space-y-6 flex flex-col justify-center"
          onSubmit={handleSubmit}
        >
          <div className="">
            <div className="flex justify-between">
              <div className="mb-5 w-[45%]">
                <label htmlFor="fullname" className="sr-only">
                  Full Name
                </label>
                <input
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                  id="full-name"
                  name="fullname"
                  type="text"
                  required={true}
                  className="w-full rounded-md appearance-none relative text-base block h-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
              <div className="mb-5 w-[45%]">
                <label htmlFor="phone" className="sr-only">
                  Phone Number
                </label>
                <input
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                  id="phone"
                  name="phone"
                  type="text"
                  required={true}
                  className="rounded-md appearance-none relative text-base block w-full h-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Phone Number"
                />
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="Email address" className="sr-only">
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
            <div className="mb-5">
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
            <div className="mb-5">
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                value={passwordComfirm}
                onChange={(e) => setPasswordComfirm(e.target.value)}
                id="confirm-password"
                name="confirm-password"
                type="password"
                required={true}
                className="rounded-md appearance-none relative text-base block w-full h-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
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

export default SignUp;
