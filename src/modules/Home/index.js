import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./../../components/Header";
import Slider from "../../components/Slider";
import ProductCard from "../../components/ProductCard";
import Statistic from "../../components/Statistic";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import { slides } from "../../data/slideData";

const GetTop8Product = async (products) => {
  const sorted = [...products]; // Create a copy of the products array to avoid mutating the original array
  sorted.sort((product1, product2) => product2.rating - product1.rating); // Sort the products in descending order based on the rating
  const topProducts = sorted.slice(0, 8); // Get the top 8 products from the sorted array
  console.log(topProducts);
};

const Home = () => {
  const [products = [], setProducts] = useState([]);

  useEffect(() => {
    const GetProducts = async () => {
      await axios
        .get("https://localhost:7249/api/Product/products")
        .then((response) => {
          console.log(response);
          setProducts(response.data.list);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    GetProducts();
    setProducts(GetTop8Product(products));
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
