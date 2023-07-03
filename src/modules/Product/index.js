import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import ProductDetail from "../../components/ProductDetail";
import { slides } from "../../data/slideData";

const product = {
  title: "Laptop HP VICTUS 16-e1107AX 7C140PA",
  rating: 4,
  price: 26490000,
  discount: "31",
  stockQuantity: 10,
  img: "https://laptop88.vn/media/product/6659_hp_victus_16_2022_vu__ng__6_.jpg",
  imgs: slides,
  description:
    "Thiết kế sang trọng, đậm chất gaming với vỏ máy Aluminium cho cảm giác chạm vào rất mịn màng. Máy có trọng lượng nhẹ chỉ 2.35 kg chắc chắn, dễ dàng cầm nắm hay bỏ vào balo. Bộ vi xử lý AMD Ryzen 5 6600H hiệu suất vượt trội cho phép tự do sáng tạo nội dung, livestream hay chơi game cực mướt mà không lo lag giật. Card đồ họa NVIDIA GeForce RTX 3050 4GB cân mọi tác vụ đồ họa hay trải nghiệm các tựa game bom tấn với chất lượng hình ảnh mãn nhãn. RAM 8GB DDR5 hỗ trợ nâng cấp lên đến 16GB thoải mái làm việc trên nhiều ứng dụng nặng cùng lúc.",
  data: `<table class="text-sm border-slate-500 ml-[5px] my-[25px]">
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
</table>`,
};

const Product = () => {
  return (
    <div className="bg-[#f3f3f3]">
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </div>
  );
};

export default Product;
