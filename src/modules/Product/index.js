import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import ProductDetail from "../../components/ProductDetail";
import { laptops } from "../../data/mockData";

const Product = () => {
  const { id } = useParams();

  const getProduct = (id) => {
    return laptops.find((p) => p.productId === Number(id));
  };

  console.log(getProduct(id));

  return (
    <div className="bg-[#f3f3f3]">
      <Header />
      <ProductDetail product={getProduct(id)} />
      <Footer />
    </div>
  );
};

export default Product;
