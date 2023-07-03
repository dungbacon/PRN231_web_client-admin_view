import React from "react";
import StringToHtml from "../../common_function/StringToHtml";
import Carousel from "../Carousel";
import { Rating } from "@material-tailwind/react";

const ProductDetail = ({ product }) => {
  const formattedSalePrice = (
    product.price -
    (31 / 100) * product.price
  ).toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const formattedPrice = product.price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const sentences = product.description.split(/\. /);

  const handleCart = (product, redirect) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductExist = cart.find((item) => item.id === product.id);
    if (isProductExist) {
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...product, quantity: 1 }])
      );
    }
  };

  return (
    <div className="mt-[20px] mx-[20px]">
      <h2 className="font-semibold text-[19px] leading-loose mx-[20px]">
        {product.title}
      </h2>
      <hr className="h-[2px] block mb-[15px] mt-[5px] mx-[20px] border-[#d5e5d5]" />
      <div className="flex justify-center">
        {/* {IMAGE} */}
        <div className="bg-white rounded mr-[10px] w-[32%]">
          <h3 className="font-sans mb-[10px] ml-[5px] w-[40%] border-b-[2px] border-b-[#d5e5d5] text-[20px] font-bold">
            Ảnh minh họa
          </h3>
          <img
            className="h-[370px] w-[370px] rounded"
            style={{ margin: "10px auto" }}
            src="https://laptop88.vn/media/product/6659_hp_victus_16_2022_vu__ng__6_.jpg"
          />
          <Carousel slides={product.imgs} />
        </div>

        {/* {Description} */}
        <div className="bg-white rounded mr-[10px] w-[32%]">
          <div className="flex justify-between">
            <h3 className="font-sans ml-[5px] text-[20px] font-bold text-red-500">
              {formattedSalePrice}
            </h3>
            <Rating
              className="text-yellow-500 mr-[5px]"
              value={product.rating}
            />
          </div>
          <div className="flex items-center">
            <p className="text-[14px] ml-[5px]">
              <b>Giá gốc: </b>
              <del>{formattedPrice}</del>
              <b className="text-red-500 font-bold">-{product.discount}%</b>
            </p>
          </div>
          <h3 className="font-sans mb-[10px] ml-[5px] w-[40%] border-b-[2px] border-b-[#d5e5d5] text-[20px] font-bold">
            Đặc điểm nổi bật
          </h3>
          <div className="overflow-y-auto w-full h-[250px]">
            <ul className="text-[14px] leading-[1.45] ml-[5px] list-disc list-inside">
              {sentences.map((sentence, index) => {
                return (
                  <li key={index} className="flex items-baseline">
                    <span className="mr-2">•</span>
                    <p>{sentence}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <h3 className="font-sans mb-[10px] ml-[5px] w-[40%] border-b-[2px] border-b-[#d5e5d5] text-[20px] font-bold">
            Thông tin
          </h3>
          <div className="overflow-y-auto w-full h-[100px]">
            <ul className="text-[14px] leading-[1.45] ml-[5px] list-disc list-inside">
              <li className="flex items-baseline">
                <span className="mr-2">•</span>
                <p>Mới, đầy đủ phụ kiện từ nhà sản xuất.</p>
              </li>
              <li className="flex items-baseline">
                <span className="mr-2">•</span>
                <p>
                  Bảo hành 36 tháng chính hãng, 1 đổi 1 trong 30 ngày đầu nếu có
                  lỗi phần cứng từ nhà sản xuất.
                </p>
              </li>
              <li className="flex items-baseline">
                <span className="mr-2">•</span>
                <p>Giá sản phẩm đã bao gồm VAT.</p>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center my-[15px] mx-[5px]">
            <div className="flex justify-between">
              <button
                className="flex items-center mr-3 justify-center rounded-md bg-red-500 px-10 py-2.5 text-center text-sm font-bold text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                onClick={() => handleCart("", true)}
              >
                Mua ngay
              </button>
              <button
                href="#"
                className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                onClick={() => handleCart("")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>

        {/* {IMAGE} */}
        <div className=" bg-white rounded w-[32%] h-fit">
          <h3 className="font-sans mb-[10px] ml-[5px] w-[40%] border-b-[2px] border-b-[#d5e5d5] text-[20px] font-bold">
            Thông số kĩ thuật
          </h3>
          <StringToHtml input={product.data} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
