import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import ProductDetail from "../../components/ProductDetail";
import { slides } from "../../data/slideData";
import { laptops } from "../../data/mockData";

const product = laptops[0];

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
