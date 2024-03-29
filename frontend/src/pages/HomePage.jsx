import React, { useState } from "react";
import CategoryContainer from "../components/CategoryContainer";

const HomePage = () => {
  const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "home-decoration",
    "groceries",
    "skincare",
  ];

  return (
    <div className="container">
      <h2 style={{ marginBottom: "40px" }}>Shop Now!</h2>
      {categories.map((item) => (
        <CategoryContainer key={item} category={item} />
      ))}
    </div>
  );
};

export default HomePage;
