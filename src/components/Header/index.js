import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import DropDown from "./DropDown";
import LinkHeader from "./LinkHeader";

const navigations = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const hanldeCartBtn = () => {
    navigate("/cart");
  };

  const hanldeBtn = () => {
    if (token) {
      navigate("/logout");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 left-0 z-10 w-full bg-white text-gray-600 body-font shadow-md">
      <div className="container w-11/12 mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to={"/"}
          className="flex cursor-pointer title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-green-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl font-mono">EShop</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {navigations.map((item, index) => {
            return (
              <div key={index}>
                {item.name === "Products" ? (
                  <DropDown item={item} />
                ) : (
                  <LinkHeader item={item} />
                )}
              </div>
            );
          })}
        </nav>
        <div className="flex justify-around ">
          <button
            className="capitalize mr-5 inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-green-500 hover:text-white font-semibold rounded text-base mt-4 md:mt-0"
            onClick={() => hanldeCartBtn()}
          >
            Go to Cart
            <FontAwesomeIcon
              className="pl-1"
              icon={icon({ name: "cart-arrow-down" })}
            />
          </button>
          {
            <button
              className="capitalize inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-green-500 hover:text-white font-semibold rounded text-base mt-4 md:mt-0"
              onClick={() => hanldeBtn()}
            >
              {token ? "Sign Out" : "Sign In"}
              <FontAwesomeIcon
                className="pl-1"
                icon={
                  token ? icon({ name: "sign-in" }) : icon({ name: "sign-out" })
                }
              />
            </button>
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
