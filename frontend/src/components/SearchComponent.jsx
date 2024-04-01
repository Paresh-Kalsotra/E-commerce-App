import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { searchProduct } from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products.searchedProducts);
  const dispatch = useDispatch();

  async function handler(e) {
    e.preventDefault();
    await dispatch(searchProduct(searchTerm));
    setLoading(true);
    setSearchTerm("");
  }

  return (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={handler}>
        {" "}
        <input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Search Product or Category"
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>
      {products.length > 0 ? (
        <>
          <h3 style={{ textAlign: "left" }}>Top Matches for your search:</h3>
          <div
            style={{
              display: "flex",
              gap: "20px",
              overflow: "scroll",
              paddingBottom: "10px",
            }}
          >
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </>
      ) : (
        <>
          {loading ? (
            <p className="message">Searched Product not found!!</p>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default SearchComponent;
