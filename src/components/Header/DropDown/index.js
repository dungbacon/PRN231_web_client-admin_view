import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import Cookies from "js-cookie";

const DropDown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const token = Cookies.get("jwtToken");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="relative inline-block">
        <div>
          <button
            type="button"
            className="inline-flex justify-center items-center hover:bg-gray-100 rounded-full p-[10px]"
            id="menu-button"
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="#4B5563"
              className="h-[20px]"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
          </button>
        </div>

        {isOpen &&
          (token ? (
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1" role="none">
                <a
                  href="/profile"
                  className="text-gray-700 block px-4 py-2 text-sm capitalize font-semibold hover:bg-gray-100"
                  id="menu-item-0"
                >
                  Thông tin
                </a>
                <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm capitalize font-semibold hover:bg-gray-100"
                  id="menu-item-1"
                >
                  Hỗ trợ
                </a>
                <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm capitalize font-semibold hover:bg-gray-100"
                  id="menu-item-2"
                >
                  Lịch sử
                </a>
                <a
                  href="/logout"
                  className="text-gray-700 block px-4 py-2 text-sm capitalize font-semibold hover:bg-gray-100"
                  id="menu-item-2"
                >
                  Đăng xuất
                </a>
              </div>
            </div>
          ) : (
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1" role="none">
                <a
                  href="/login"
                  className="text-gray-700 block px-4 py-2 text-sm capitalize font-semibold hover:bg-gray-100"
                  id="menu-item-2"
                >
                  Đăng nhập
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DropDown;
