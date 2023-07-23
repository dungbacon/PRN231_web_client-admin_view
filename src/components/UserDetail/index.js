import React, { useContext, useState } from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import NotificationContext from "../../context/NotificationContext";
import { UpdateUser } from "../../data/AccountController";
import dayjs from "dayjs";
import Loading from "../Loading";
import Cookies from "js-cookie";

const gridStyle = { minHeight: 550 };

const columns = [
  { name: "orderDate", header: "Order Date", minWidth: 50, defaultFlex: 2 },
  { name: "shippedDate", header: "Ship Date", maxWidth: 1000, defaultFlex: 1 },
  { name: "totalPrice", header: "Total Price", maxWidth: 1000, defaultFlex: 1 },
];

let initialInputs = {
  fullName: "",
  email: "",
  password: "",
  phone: "",
};

function UserDetail({ data }) {
  if (data) {
    initialInputs = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      phone: data.phone || "",
      updatedDate: "",
    };
  }
  const { notificationHandler } = useContext(NotificationContext);

  const [profile, setProfile] = useState(initialInputs);
  const [isChecked, setIsChecked] = useState(false);

  function HandleEditBtn() {
    const currentDate = dayjs();
    const accountId = Cookies.get("accountId");
    const jwtToken = Cookies.get("jwtToken");
    if (isChecked == false) {
      notificationHandler({
        type: "warning",
        message: "Bạn phải check trước khi muốn cập nhập thông tin!",
      });
    }
    if (
      profile.fullName.length === 0 ||
      profile.email.length === 0 ||
      profile.password.length === 0
    ) {
      notificationHandler({
        type: "warning",
        message: "Họ tên, Email, mật khẩu không được để trống!",
      });
    }
    profile.updatedDate = currentDate.format("MM/DD/YYYY");
    UpdateUser(profile, accountId, jwtToken).then((response) => {
      if (response.status === 200) {
        notificationHandler({
          type: "success",
          message: "Cập nhật thông tin thành công!",
        });
      }
    });
  }

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex mt-[20px] justify-around md:h-[540px]">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 text-gray-900 font-bold">
            Thông tin
          </h3>
          <p className="mt-1 font-semibold text-sm text-gray-500">
            Thông tin chi tiết
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="flex items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-500">Họ và Tên</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  className="p-[10px] w-[350px] border-b-2 shadow-md"
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={profile.fullName}
                  onChange={(e) => handleOnchange(e)}
                />
              </dd>
            </div>
            <div className="bg-white px-4 flex items-center py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  className="p-[10px] w-[350px] border-b-2 shadow-md"
                  type="email"
                  name="email"
                  id="email"
                  value={profile.email}
                  onChange={(e) => handleOnchange(e)}
                />
              </dd>
            </div>
            <div className="bg-gray-50 px-4 flex items-center py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-500">Mật Khẩu</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  className="p-[10px] w-[350px] border-b-2 shadow-md"
                  type="password"
                  name="password"
                  id="password"
                  value={profile.password}
                  onChange={(e) => handleOnchange(e)}
                />
              </dd>
            </div>
            <div className="bg-white px-4 flex items-center py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-500">
                Số điện thoại
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  className="p-[10px] w-[350px] border-b-2 shadow-md"
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Vui lòng nhập số điện thoại!"
                  value={profile.phone}
                  onChange={(e) => handleOnchange(e)}
                />
              </dd>
            </div>
            <div className="bg-white px-4 flex items-center py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-500"></dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 ">
                <div className="flex items-center mb-[10px]">
                  <input
                    type="checkbox"
                    value={isChecked}
                    onChange={handleCheckboxChange}
                    className="mr-[5px]"
                  />
                  <p>Tôi đồng ý với tất cả điều khoản bảo mật cá nhân.</p>
                </div>
                <button
                  className="bg-green-500 font-semibold hover:bg-green-600 py-3 text-sm text-white uppercase w-full"
                  onClick={HandleEditBtn}
                >
                  Chỉnh sửa
                </button>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg w-[55%]">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 text-gray-900 font-bold">
            Lịch sử giao dịch
          </h3>
          <p className="mt-1 font-semibold text-sm text-gray-500">
            Thông tin chi tiết
          </p>
        </div>
        <div>
          <ReactDataGrid
            columns={columns}
            dataSource={data.orders}
            style={gridStyle}
          />
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
