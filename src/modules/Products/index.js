import React, { useEffect, useState } from "react";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import ProductCard from "../../components/ProductCard";
import Categories from "../../components/Categories";
import Loading from "../../components/Loading";
import Slider from "../../components/Slider";
import { laptops } from "../../data/mockData";
import { slides } from "../../data/slideData";

const Products = () => {
  const [products = [], setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="overflow-hidden">
      <Header />
      <div className="flex w-full items-center px-16">
        <Slider
          containerProps="w-[55%] h-[100px] m-auto my-10 px-1 relative group"
          slides={slides}
          dotProps="w-full flex py-2 absolute bottom-0 justify-center"
        />
        <Slider
          containerProps="w-[55%] h-[100px] m-auto my-10 px-1 relative group"
          slides={slides}
          dotProps="w-full flex py-2 absolute bottom-0 justify-center"
        />
      </div>
      <Categories />
      {products.length > 0 ? <ProductCard products={laptops} /> : <Loading />}

      <Footer />
    </div>
  );
};

export default Products;
