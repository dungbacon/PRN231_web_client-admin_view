import React from "react";
import { usePagination, DOTS } from "../../hooks/usePagination";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="bg-white p-4 flex items-center justify-center flex-wrap text-[14px] font-bold mt-[15px]">
      <nav aria-label="Page navigation">
        <ul className="inline-flex">
          <li>
            <button
              onClick={onPrevious}
              disabled={currentPage === 1}
              className="h-10 px-5 text-green-600 transition-colors duration-150 rounded-l-lg focus:shadow-outline hover:bg-green-100"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
          {paginationRange.map((page, index) => {
            if (page === DOTS) {
              return <li className="pagination-item dots">&#8230;</li>;
            }
            return (
              <li key={index}>
                <button
                  onClick={() => onPageChange(page)}
                  className="h-10 px-5 text-green-600 transition-colors duration-150 focus:shadow-outline hover:bg-green-100"
                >
                  {page}
                </button>
              </li>
            );
          })}

          <li>
            <button
              onClick={onNext}
              disabled={currentPage === lastPage}
              className="h-10 px-5 text-green-600 transition-colors duration-150 bg-white rounded-r-lg focus:shadow-outline hover:bg-green-100"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

// const Pagination = ({ totalPage, onValueChange }) => {
//   create an array containing from 1 to n
//   var pageArr = Array.from(Array(totalPage).keys());
//   var pageArr1 = [...Array(totalPage).keys()];
//   var pageArr2 = Array.from({ length: totalPage }, (_, i) => i + 1);

//   const hanlePageClick = (event) => {
//     const value = event.target.value;
//     console.log(value);
//     onValueChange(value);
//   };

//   return (
//     <div className="bg-white p-4 flex items-center justify-center flex-wrap text-[14px] font-bold mt-[15px]">
//       <nav aria-label="Page navigation">
//         <ul className="inline-flex">
//           <li>
//             <button className="h-10 px-5 text-green-600 transition-colors duration-150 rounded-l-lg focus:shadow-outline hover:bg-green-100">
//               <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
//                 <path
//                   d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
//                   clipRule="evenodd"
//                   fillRule="evenodd"
//                 ></path>
//               </svg>
//             </button>
//           </li>
//           {pageArr2.map((page, index) => {
//             return (
//               <li key={index}>
//                 <button
//                   onClick={(e) => hanlePageClick(e)}
//                   value={page}
//                   className="h-10 px-5 text-green-600 transition-colors duration-150 focus:shadow-outline hover:bg-green-100"
//                 >
//                   {page}
//                 </button>
//               </li>
//             );
//           })}

//           <li>
//             <button className="h-10 px-5 text-green-600 transition-colors duration-150 bg-white rounded-r-lg focus:shadow-outline hover:bg-green-100">
//               <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
//                 <path
//                   d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                   clipRule="evenodd"
//                   fillRule="evenodd"
//                 ></path>
//               </svg>
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

export default Pagination;
