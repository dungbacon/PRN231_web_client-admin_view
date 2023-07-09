import { useState, useEffect } from "react";

const DropdownButton = ({ onValueChange, max }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState(0);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setPrice(newValue);
    onValueChange(newValue);
  };

  useEffect(() => {}, []);

  const FormattedPrice = (input) => {
    return input.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left ml-[10px]">
      <button
        type="button"
        className="text-white bg-red-500 hover:bg-red-60000 focus:outline-none font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        onClick={toggleDropdown}
      >
        Giá{" "}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="z-10 origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white divide-y divide-gray-100">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 p-[5px]">
            <li>
              <div className="flex justify-between text-black text-[15px] font-bold">
                <p>0đ</p>
                <p>{FormattedPrice(price)}đ</p>
              </div>
              <input
                id="range"
                type="range"
                max={max}
                min={0}
                value={price}
                onChange={(event) => handleChange(event)}
                className="block w-[100%] py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
