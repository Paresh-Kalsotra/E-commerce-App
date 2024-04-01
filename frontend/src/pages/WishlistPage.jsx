import React from "react";
import { useDispatch, useSelector } from "react-redux";
import WishlistCard from "../components/WishlistCard";
import { sendWishlist } from "../features/wishlist/wishlistSlice";
import { useEffect } from "react";

const WishlistPage = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sendWishlist(wishlist));
  }, [wishlist]);

  return (
    <div>
      <h3
        style={{
          color: "#378eeb",
          textAlign: "center",
          padding: "30px",
          marginTop: "0",
        }}
      >
        Your Wishlist:
      </h3>
      {wishlist && wishlist.length > 0 ? (
        <div
          style={{
            margin: "30px",
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {wishlist.map((item) => (
            <WishlistCard key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <p>Nothing is Wishlist.</p>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
