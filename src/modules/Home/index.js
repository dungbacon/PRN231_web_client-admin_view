import React, { useEffect, useState } from "react";
import Header from "./../../components/Header";
import Slider from "../../components/Slider";
import ProductCard from "../../components/ProductCard";
import Statistic from "../../components/Statistic";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import { slides } from "../../data/slideData";
import { GetProducts } from "../../data/ProductController";

const Home = () => {
  const [products = [], setProducts] = useState([]);

  useEffect(() => {
    var fetchProducts = () =>
      GetProducts(0, 0)
        .then((response) => {
          setProducts(response.list);
        })
        .catch((error) => {
          console.log(error);
        });
    fetchProducts();
  }, []);
  return (
    <>
      <Header />
      <Slider
        slides={slides}
        containerProps="max-w-[1400px] h-[780px] w-full m-auto my-10 px-4 relative group"
        dotProps="flex top-4 justify-center py-2"
      />
      <div className="flex flex-col text-center w-full my-20">
        <h2 className="text-lg text-green-500 tracking-widest font-medium title-font mb-1">
          Laptops
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
          Những Laptop phổ biến nhất
        </h1>
      </div>
      {products.length > 0 ? <ProductCard products={products} /> : <Loading />}
      <Statistic />
      <Footer />
    </>
  );
};

export default Home;
