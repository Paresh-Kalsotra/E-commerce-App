import React, { useReducer, useState } from "react";
import SellerNavbar from "../components/SellerNavbar";
import { useDispatch } from "react-redux";
import { addProductToStore } from "../features/seller/sellerSlice";

const formReducer = (state, action) => {
  switch (action.type) {
    case "setField":
      return { ...state, [action.field]: action.value };
    case "resetForm":
      return {
        title: "",
        description: "",
        price: "",
        discountPercentage: "",
        rating: "",
        category: "",
        images: "",
      };
    default:
      return state;
  }
};

const SellerProductPage = () => {
  const [msg, setMsg] = useState("");
  const dispatcher = useDispatch();

  const [formState, dispatch] = useReducer(formReducer, {
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    category: "",
    images: "",
  });

  // Form submission handler
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatcher(addProductToStore(formState));

    setMsg("Product Listed Successfully");
    setTimeout(() => {
      setMsg("");
    }, 3000);
    dispatch({ type: "resetForm" });
  };

  // Function to handle changes in form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: "setField", field: name, value });
  };

  return (
    <>
      <SellerNavbar />
      <h2 style={{ textAlign: "center" }}>
        Fill the form to list Your Product
      </h2>

      <form className="form box" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formState.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formState.description}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formState.category}
          onChange={handleChange}
          required
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formState.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="discountPercentage">Discount Percentage:</label>
        <input
          type="number"
          id="discountPercentage"
          name="discountPercentage"
          value={formState.discountPercentage}
          onChange={handleChange}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={formState.rating}
          onChange={handleChange}
        />

        <label htmlFor="images">Image url:</label>
        <input
          type="text"
          id="images"
          name="images"
          value={formState.images}
          onChange={handleChange}
        />
        <br />
        {msg ? <p style={{ textAlign: "center" }}>{msg}</p> : <></>}
        <button type="submit">List Product</button>
      </form>
    </>
  );
};

export default SellerProductPage;
