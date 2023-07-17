import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FeatureCard = ({ categories = [] }) => {
  return (
    <section className="text-gray-600">
      <div className="container px-8 py-1 mx-auto">
        <div className="flex flex-wrap -m-4">
          {categories?.map((item, index) => {
            return (
              <Link
                key={item.categoryId}
                to={`/categories/${item.categoryId}`}
                className={`p-4 md:w-1/${categories.length} cursor-pointer `}
              >
                <div className="flex rounded-lg h-full justify-center items-center bg-white flex-col">
                  <div className="flex items-center">
                    <div className="w-auto h-[34px] border-[1px] border-[#f4f5f6] p-2 rounded-md shadow-md">
                      <img
                        className="object-center w-full h-full block "
                        src={item.categoryImg}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCard;
