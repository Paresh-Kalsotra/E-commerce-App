import React, { useState, useReducer } from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  updateProduct,
  fetchSellerProducts,
} from "../features/seller/sellerSlice";

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
//---------------------component
const SellerProductCard = ({ product }) => {
  const dispatcher = useDispatch();
  const [editing, setEditing] = useState(false);

  const [formState, dispatch] = useReducer(formReducer, {
    _id: product._id,
    title: product.title || "",
    description: product.description || "",
    price: product.price || "",
    discountPercentage: product.discountPercentage || "",
    rating: product.rating || "",
    category: product.category || "",
    images: product.images || "",
  });

  //-------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: "setField", field: name, value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEditing(false);

    await dispatcher(updateProduct(formState));
    dispatcher(fetchSellerProducts());
    alert("Product Updated");
  };

  //----------------------------------
  async function handleDelete() {
    await dispatcher(deleteProduct(product));
    dispatcher(fetchSellerProducts());
  }

  function handleEdit() {
    setEditing(true);
  }
  //-----------------------------
  return (
    <>
      {editing ? (
        <>
          {" "}
          <h2 style={{ textAlign: "center" }}>Edit Product:{product.title}</h2>
          <form className="box form" onSubmit={handleSubmit}>
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
            <button type="submit">Update Product</button>
          </form>
          <hr />
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            padding: "10px",
            alignItems: "flex-Start",
            justifyContent: "space-between",
            borderBottom: "1px solid grey",
          }}
        >
          {" "}
          <img
            src={product.images[0]}
            width={100}
            height={100}
            alt={product.title}
          />
          <div className="prod-details">
            <p style={{ width: "200px" }}>Title: {product.title}</p>
            <p>Description: {product.description} </p>
            <p>Category: {product.category}</p>
            <p>Price: ₹{product.price} </p>
          </div>
          <div>
            <button onClick={handleEdit} style={{ padding: "6px 10px" }}>
              <FaPencilAlt />
            </button>{" "}
            <button
              onClick={handleDelete}
              style={{ padding: "6px 10px", background: "crimson" }}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SellerProductCard;
