import React from "react";
import StringToHtml from "../../common_function/StringToHtml";
import Carousel from "../Carousel";

const data = `<table class="text-sm border-slate-500 ml-[5px] my-[25px]">
<tbody>
<tr>
<td class=""><strong>Hệ điều hành</strong></td>
<td class=" ">Windows 11 Home</td>
</tr>
<tr>
<td class="w-[30%]"><strong>CPU</strong></td>
<td class="">AMD Ryzen 5 6600H (3.3GHz~4.5GHz) 6 Cores 12 Threads</td>
</tr>
<tr>
<td class="w-[30%]"><strong>Card VGA</strong></td>
<td class="">NVIDIA GeForce RTX 3050&nbsp; 4GB GDDR6</td>
</tr>
<tr>
<td class="w-[30%]"><strong>Memory</strong></td>
<td class="">8GB DDR5&nbsp;</td>
</tr>
<tr>
<td class="w-[30%]"><strong>Ổ cứng</strong></td>
<td class="">
<p>512GB SSD M.2 PCIe Gen 4.0</p>
</td>
</tr>
<tr>
<td class="w-[30%]"><strong>Màn hình</strong></td>
<td class="">16.1 inch FHD (1920 x 1080), 144 Hz, IPS, micro-edge, anti-glare, 250 nits, 45% NTSC</td>
</tr>
<tr>
<td class="w-[30%]"><strong>Màu sắc</strong></td>
<td class="">blue</td>
</tr>
<tr>
<td class="w-[30%]"><strong>Cổng kết nối</strong></td>
<td class="">
<ul>
<li>3 x USB 3.1 Gen1 Type-A&nbsp;</li>
<li>1 x USB 3.1 Gen1 Type-C (DisplayPort&nbsp;1.4) hỗ trợ sạc</li>
<li>1 x HDMI 2.1</li>
<li>1 x&nbsp;Multi SD card reader</li>
<li>1 x Mic-in/ Headphone-out&nbsp;combo jack</li>
<li>1 x RJ45</li>
</ul>
</td>
</tr>
</tbody>
</table>`;

const ProductDetail = ({ productImgs }) => {
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
      console.log(updatedCart);
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
        Laptop HP VICTUS 16-e1107AX 7C140PA
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
          <Carousel numImgs={3} slides={productImgs} />
        </div>

        {/* {Description} */}
        <div className="bg-white rounded mr-[10px] w-[32%]">
          <h3 className="font-sans ml-[5px] text-[20px] font-bold text-red-500">
            26.490.000 ₫
          </h3>
          <div className="flex items-center">
            <p className="text-[14px] ml-[5px]">
              <b>Giá gốc: </b>
              <del>25.990.000 ₫</del>
              <b className="text-red-500 font-bold">-31%</b>
            </p>
          </div>
          <h3 className="font-sans mb-[10px] ml-[5px] w-[40%] border-b-[2px] border-b-[#d5e5d5] text-[20px] font-bold">
            Đặc điểm nổi bật
          </h3>
          <div className="overflow-y-auto w-full h-[250px]">
            <ul className="text-[14px] leading-[1.45] ml-[5px] list-disc list-inside">
              <li className="flex items-baseline">
                <span className="mr-2">•</span>
                <p>
                  Thiết kế sang trọng, đậm chất gaming với vỏ máy Aluminium cho
                  cảm giác chạm vào rất mịn màng.
                </p>
              </li>
              <li className="flex items-baseline">
                <span className="mr-2">•</span>
                <p>
                  Máy có trọng lượng nhẹ chỉ 2.35 kg chắc chắn, dễ dàng cầm nắm
                  hay bỏ vào balo.
                </p>
              </li>
              <li className="flex items-baseline">
                <span className="mr-2">•</span>
                <p>
                  Bộ vi xử lý AMD Ryzen 5 6600H hiệu suất vượt trội cho phép tự
                  do sáng tạo nội dung, livestream hay chơi game cực mướt mà
                  không lo lag giật.
                </p>
              </li>
              <li className="flex items-baseline">
                <span className="mr-2">•</span>
                Card đồ họa NVIDIA GeForce RTX 3050 4GB cân mọi tác vụ đồ họa
                hay trải nghiệm các tựa game bom tấn với chất lượng hình ảnh mãn
                nhãn.
              </li>
              <li className="flex items-baseline">
                <span className="mr-2">•</span>
                <p>
                  RAM 8GB DDR5 hỗ trợ nâng cấp lên đến 16GB thoải mái làm việc
                  trên nhiều ứng dụng nặng cùng lúc.
                </p>
              </li>
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

          <div className="flex items-center justify-between my-[15px] mx-[5px]">
            <div className="flex justify-between">
              <button
                className="flex items-center ml-5 justify-center rounded-md bg-red-500 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                onClick={() => handleCart("", true)}
              >
                Mua ngay
              </button>
              <button
                href="#"
                className="flex items-center ml-5 justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
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
            <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* {IMAGE} */}
        <div className=" bg-white rounded w-[32%] h-fit">
          <h3 className="font-sans mb-[10px] ml-[5px] w-[40%] border-b-[2px] border-b-[#d5e5d5] text-[20px] font-bold">
            Thông số kĩ thuật
          </h3>
          <StringToHtml input={data} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
