import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

// ProductCard component for displaying individual products
const ProductCard = ({ product, addToCart }) => {
  const [open, setOpen] = useState(false); // State to manage Snackbar visibility

  // Handle add to cart button click
  const handleCartClick = () => {
    addToCart(product);
    setOpen(true); // Show Snackbar with success message
  };

  // Close Snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md w-full sm:w-48 md:w-56 lg:w-64 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-warm-gray-100 text-warm-gray-900">
      <div className="h-[20rem]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-left-bottom transition-opacity duration-500 hover:opacity-90"
        />
      </div>
      <h3 className="mt-4 text-lg font-bold">{product.name}</h3>
      <p className="text-brown-800 mt-2">${product.price.toFixed(2)}</p>
      <button
        className="mt-4 bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors duration-300"
        onClick={handleCartClick}
      >
        Add to Cart
      </button>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", fontWeight: "900" }}
        >
          Successfully Added To Cart!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductCard;
