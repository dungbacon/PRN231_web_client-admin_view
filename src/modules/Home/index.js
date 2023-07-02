import React, { useEffect, useState } from "react";
import Header from "./../../components/Header";
import Slider from "../../components/Slider";
import ProductCard from "../../components/ProductCard";
import Statistic from "../../components/Statistic";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import Categories from "../../components/Categories";
import { slides } from "../../data/slideData";

const Home = () => {
  const [products = [], setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://fakestoreapi.com/products?limit=12"
      );
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <Slider slides={slides} />
      <div className="flex flex-col text-center w-full">
        <h2 className="text-xs text-green-500 tracking-widest font-medium title-font mb-1">
          Products
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
          Most Popular Product
        </h1>
      </div>
      {products.length > 0 ? <ProductCard products={products} /> : <Loading />}
      <Statistic />
      <Footer />
    </>
  );
};

export default Home;
