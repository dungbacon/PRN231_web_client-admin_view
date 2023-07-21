import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import LinkHeader from "./LinkHeader";
import DropDown from "./DropDown";

const navigations = [
  { name: "Trang chủ", path: "/" },
  { name: "Sản phẩm", path: "/products" },
  { name: "About", path: "/about" },
  { name: "contact", path: "/contact" },
];

const Header = () => {
  const navigate = useNavigate();

  const hanldeCartBtn = () => {
    navigate("/cart");
  };

  return (
    <header className="sticky top-0 left-0 z-10 w-full bg-white text-gray-600 body-font shadow-md">
      <div className="w-11/12 mx-auto flex py-5 flex-col md:flex-row items-center relative">
        <Link
          to={"/"}
          className="flex cursor-pointer title-font font-medium items-center text-gray-900 mb-4 md:mb-0 absolute left-0"
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
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base">
          {navigations.map((item, index) => {
            return (
              <div key={index}>
                <LinkHeader item={item} />
              </div>
            );
          })}
        </nav>
        <div className="flex justify-around absolute right-0">
          <button
            className="relative capitalize mr-5 inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-100 font-semibold rounded text-base mt-4 md:mt-0"
            onClick={() => hanldeCartBtn()}
          >
            <FontAwesomeIcon
              className="w-[30px] h-[30px]"
              icon={icon({ name: "cart-arrow-down" })}
            />
          </button>
          <DropDown />
        </div>
      </div>
    </header>
  );
};

export default Header;
