import React from "react";
import { useParams } from "react-router-dom";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import ProductDetail from "../../components/ProductDetail";
import Notification from "../../components/Notification";

const Product = () => {
  const { id } = useParams();

  return (
    <div className="bg-[#f3f3f3]">
      <Notification />
      <Header />
      <ProductDetail productId={id} />
      <Footer />
    </div>
  );
};

export default Product;
