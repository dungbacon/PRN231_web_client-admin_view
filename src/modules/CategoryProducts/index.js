import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/Loading";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Pagination from "../../components/Pagination";
import { GetProductsByCateID } from "../../data/ProductController";

let PageSize = 8;

const CategoryProducts = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [products = [], setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = (PageSize, currentPage, id) =>
      GetProductsByCateID(PageSize, currentPage, id)
        .then((response) => {
          setProducts(response.list);
          setTotalPages(response.count);
        })
        .catch((error) => {
          console.log(error);
        });

    fetchProducts(PageSize, currentPage, id);
  }, [currentPage, products]);

  return (
    <div>
      <Header />
      {products.length > 0 ? <ProductCard products={products} /> : <Loading />}
      {products.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalCount={totalPages}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
      <Footer />
    </div>
  );
};

export default CategoryProducts;
