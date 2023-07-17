import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-tailwind/react";
import { url_img_regex } from "../../common_function/regex/commonRegex";
import Search from "../Search";
import DropdownButton from "../DropdownButton";

const ProductCard = ({ products = [] }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchPrice, setSearchPrice] = useState(500000000);
  const [search, setSearch] = useState("");

  const GetPrice = (value) => {
    setSearchPrice(value);
  };

  const GetSearch = (value) => {
    setSearch(value);
  };

  useEffect(() => {
    let filtered = products;
    if (search.length !== 0) {
      filtered = filtered.filter((item) => item.productName.includes(search));
    }
    filtered = filtered.filter((item) => item.price <= searchPrice);
    setFilteredProducts(filtered);
  }, [search, searchPrice, products]);

  const PriceAfterDiscount = (price, discount) => {
    return (price - (discount / 100) * price).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const GetDisplayImg = (imgs) => {
    return imgs.match(url_img_regex);
  };

  const PriceBeforeDiscount = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <section className="text-gray-600 my-10">
      <div className="container px-5 mx-auto">
        <div className="flex my-[50px] mx-3">
          <Search onValueChange={GetSearch} />
          <DropdownButton onValueChange={GetPrice} max={500000000} />
        </div>
        <div className="flex flex-wrap items-center justify-start">
          {filteredProducts.map((product) => {
            const {
              productId,
              categoryId,
              productName,
              productImg,
              rating,
              price,
              discount,
              stockQuantity,
              description,
              data,
            } = product;
            return (
              <div
                key={productId}
                className="md:w-[300px] md:min-h-[490px] my-[5px] mx-[5px] h-full flex w-full flex-col rounded-lg border border-gray-100 bg-white shadow-md"
              >
                <Link
                  to={`/products/${productId}`}
                  className="relative mx-3 mt-3  flex overflow-hidden rounded-xl"
                >
                  <img
                    className="object-contain object-center w-full h-full block"
                    src={GetDisplayImg(productImg)[0]}
                    alt={productName}
                  />
                  <span className="absolute top-0 left-0 m-2 rounded-full font-bold bg-black px-2 text-center text-sm text-white">
                    {discount}% OFF
                  </span>
                </Link>
                <div className="mt-4 px-[10px] pb-5 text-center">
                  <a href="#" className="w-full h-[40px]">
                    <h5 className="text-[15px] text-slate-900 font-bold leading-5">
                      {productName}
                    </h5>
                  </a>
                  <div className="flex items-center">
                    <p>
                      <span className="text-[15px] font-bold text-red-600">
                        {PriceAfterDiscount(price, discount)}
                      </span>
                      <span className="text-sm font-bold text-slate-900 line-through ml-[5px]">
                        {PriceBeforeDiscount(price)}
                      </span>
                    </p>
                  </div>
                  <div className="bg-[#f3f4f6] border-[1px] border-solid border-[#e5e7eb] h-[50px] rounded text-[12px] leading-[2px] transform-none p-[5px], w-auto flex items-start overflow-hidden">
                    <p className="overflow-hidden leading-4">
                      {description !== null
                        ? description.slice(0, 100)
                        : "Hiện không có thông tin chi tiết!"}
                      ...
                    </p>
                  </div>
                  <div className="flex items-center mt-[10px]">
                    <Rating
                      className="text-yellow-500 mr-[5px]"
                      value={rating}
                    />
                    <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                      {rating}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
