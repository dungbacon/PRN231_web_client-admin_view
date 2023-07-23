import React, { useContext, useState, useEffect } from "react";
import NotificationContext from "../../../context/NotificationContext";
import { UploadImgToImgBB } from "../../../data/ServiceController";
import Loading from "../../Loading";
import {
  UpdateCategory,
  DeleteCategory,
} from "../../../data/CategoryController";
import Cookies from "js-cookie";

const UpdateModal = ({ visible, onClose, data }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImg, setCategoryImg] = useState();
  const { notificationHandler } = useContext(NotificationContext);

  useEffect(() => {
    if (data) {
      setCategoryName(data.categoryName || "");
      setCategoryImg(data.categoryImg || "");
    }
  }, [data]);

  const handleUpdateCategory = (e) => {
    UploadImgToImgBB(categoryImg).then((response) => {
      if (response.data.status === 200) {
        const categoryId = data.categoryId;
        const jwtToken = Cookies.get("jwtToken");
        const request = {
          categoryName: categoryName,
          categoryImg: response.data.data.url || categoryImg,
        };
        UpdateCategory(categoryId, request, jwtToken).then((res) => {
          if (res.status === 200) {
            notificationHandler({
              type: "success",
              message: "Cập nhật Danh mục thành công!",
            });
          } else {
            notificationHandler({
              type: "error",
              message: "Cập nhật Danh mục thất bại!",
            });
          }
        });
      }
    });
    onClose();
  };

  const handleFileChange = (event) => {
    const { value, type, files } = event.target;
    const inputValue = type === "file" ? files[0] : value;
    setCategoryImg(inputValue);
  };

  const handleOnDelete = (e) => {
    const categoryId = data.categoryId;
    const jwtToken = Cookies.get("jwtToken");
    DeleteCategory(categoryId, jwtToken).then((response) => {
      if (response.status === 200) {
        notificationHandler({
          type: "success",
          message: "Xóa Danh mục thành công!",
        });
      } else {
        notificationHandler({
          type: "success",
          message: "Xóa Danh mục thất bại!",
        });
      }
    });
    onClose();
  };

  if (!visible) return null;
  return categoryName.length === 0 ? (
    <Loading />
  ) : (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-10 flex justify-center items-center text-sm shadow-md">
      <div className="bg-white w-[500px] h-auto rounded">
        <div className="w-full p-10">
          <form className="bg-white rounded" method="post">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="categoryName"
              >
                Tên danh mục
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="categoryName"
                type="text"
                placeholder="Nhập tên danh mục..."
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="categoryImg"
                className="block text-gray-700 font-bold mb-2"
              >
                Ảnh:
              </label>
              <input
                className="w-full shadow appearance-none text-sm p-[5px] text-gray-700 bg-white dark:bg-gray-700 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400"
                name="categoryImg"
                id="categoryImg"
                type="file"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                id="addNewBtn"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={(e) => handleUpdateCategory(e)}
              >
                Chỉnh sửa
              </button>
              <button
                id="close"
                onClick={(e) => handleOnDelete(e)}
                className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-blue-800"
              >
                Xóa
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
