import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { getProduct } from "../features/products/productSlice";

const CategoryContainer = ({ category }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { payload } = await dispatch(getProduct(category));
    setProducts(payload);
  }

  return (
    <div style={{ marginBottom: "10px", borderBottom: "1px solid #ccc" }}>
      <h2 style={{ marginBottom: "20px" }}>Trending {category}</h2>
      <div style={{ display: "flex", gap: "20px", overflow: "scroll" }}>
        {products && products.length ? (
          products.map((item) => <ProductCard key={item.id} product={item} />)
        ) : (
          <p>Loading Products...</p>
        )}
      </div>
    </div>
  );
};

export default CategoryContainer;
