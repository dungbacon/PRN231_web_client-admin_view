import React, { useEffect, useState } from "react";
import axios from "axios";
import FeatureCard from "../FeatureCard";
import Loading from "../Loading";

const Categories = () => {
  const [categories = [], setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      await axios("https://localhost:7249/api/Category/categories").then(
        (response) => {
          setCategories(response.data);
        }
      );
    };
    fetchCategories();
  }, []);

  if (categories.length === 0) return <Loading />;

  return <FeatureCard categories={categories} />;
};

export default Categories;
