import React, { useEffect } from "react";
import SellerNavbar from "../components/SellerNavbar";
import { useDispatch } from "react-redux";
import {
  fetchSellerProducts,
  fetchSellerOrders,
} from "../features/seller/sellerSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SellerProductCard from "../components/SellerProductCard";

const SellerHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sellerProducts = useSelector((state) => state.seller.sellerProducts);

  useEffect(() => {
    fetchSellerData();
  }, []);

  async function fetchSellerData() {
    dispatch(fetchSellerProducts());
    dispatch(fetchSellerOrders());
  }

  function navigateToAdd() {
    navigate("/seller/product");
  }
  return (
    <>
      <SellerNavbar />
      <h2
        style={{
          margin: "20px",
          marginBottom: "30px",
          borderBottom: "1px solid #ccc",
        }}
      >
        Your Products:{" "}
      </h2>

      {sellerProducts && sellerProducts.length > 0 ? (
        <div>
          {sellerProducts.map((prod) => (
            <SellerProductCard key={prod._id} product={prod} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "100px",
          }}
        >
          <p>You haven't listed any product. </p>
          <button style={{ background: "green" }} onClick={navigateToAdd}>
            List product?
          </button>
        </div>
      )}
    </>
  );
};

export default SellerHomePage;
