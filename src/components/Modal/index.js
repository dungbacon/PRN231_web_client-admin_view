import React, { useState } from "react";
import { AddAddress } from "../../data/AddressController";

const Modal = ({ visible, onClose }) => {
  const [address, setAddress] = useState("");
  const accountId = localStorage.getItem("accountId");

  const handleOnClose = (e) => {
    if (e.target.id === "close") onClose();
  };

  const AddNewAddress = (e) => {
    if (e.target.id === "addNewBtn") {
      let reqAddress = {
        accountId: accountId,
        addressDesc: address,
      };
      AddAddress(reqAddress);
    }
  };

  if (!visible) return null;
  return (
    <div
      onClick={(e) => handleOnClose(e)}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-20 flex justify-center items-center text-sm shadow-md"
    >
      <div className="bg-white w-[500px] h-auto rounded">
        <div className="w-full p-10">
          <form className="bg-white rounded" method="post">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="username"
              >
                Địa chỉ
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                placeholder="Địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                id="addNewBtn"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={(e) => AddNewAddress(e)}
              >
                Thêm địa chỉ mới
              </button>
              <button
                id="close"
                onClick={(e) => handleOnClose(e)}
                className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-blue-800"
              >
                Thoát
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
