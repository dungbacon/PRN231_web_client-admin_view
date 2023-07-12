import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import ProductCard from "../../components/ProductCard";
import Categories from "../../components/Categories";
import Loading from "../../components/Loading";
import Slider from "../../components/Slider";
import { slides } from "../../data/slideData";
import Pagination from "../../components/Pagination";
let PageSize = 8;

const Products = () => {
  const [products = [], setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const GetProducts = async () => {
      await axios
        .get(
          `https://localhost:7249/api/Product/products?PageSize=8&Page=${currentPage}`
        )
        .then((res) => {
          setProducts(res.data.list);
          setTotalPages(res.data.total);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    GetProducts();
  }, [currentPage, products]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return products.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

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
// const Products = () => {
//   const [products = [], setProducts] = useState([]);
//   const [pageNum, setPageNum] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);

//   const getPageNum = (value) => {
//     setPageNum(value);
//   };

//   useEffect(() => {
//     const GetProducts = async () => {
//       await axios
//         .get(
//           `https://localhost:7249/api/Product/products?PageSize=8&Page=${pageNum}`
//         )
//         .then((res) => {
//           setProducts(res.data.list);
//           setTotalPages(res.data.total);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     };

//     GetProducts();
//   }, [pageNum, products]);

//   return (
//     <div className="overflow-hidden">
//       <Header />
//       <div className="flex w-full items-center px-16">
//         <Slider
//           containerProps="w-[55%] h-[100px] m-auto my-10 px-1 relative group"
//           slides={slides}
//           dotProps="w-full flex py-2 absolute bottom-0 justify-center"
//         />
//         <Slider
//           containerProps="w-[55%] h-[100px] m-auto my-10 px-1 relative group"
//           slides={slides}
//           dotProps="w-full flex py-2 absolute bottom-0 justify-center"
//         />
//       </div>
//       <Categories />
//       {products.length > 0 ? <ProductCard products={products} /> : <Loading />}
//       {products.length > 0 && (
//         <Pagination
//           totalPage={Math.ceil(totalPages / 8)}
//           onValueChange={getPageNum}
//         />
//       )}
//       <Footer />
//     </div>
//   );
// };

export default Products;
