import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { getProduct } from "../features/products/productSlice";

const CategoryContainer = ({ category }) => {
  const dispatch = useDispatch();
  const [productlist, setProductlist] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { payload } = await dispatch(getProduct(category));
    setProductlist(payload);
  }

  return (
    <div style={{ marginBottom: "10px", borderBottom: "1px solid #ccc" }}>
      <h2 style={{ marginBottom: "20px" }}>Trending {category}</h2>
      <div
        style={{
          display: "flex",
          gap: "20px",
          overflow: "scroll",
          paddingBottom: "10px",
        }}
      >
        {productlist && productlist.length ? (
          productlist.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))
        ) : (
          <p>Loading Products...</p>
        )}
      </div>
    </div>
  );
};

export default CategoryContainer;
