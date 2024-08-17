"use client";
import React, { useState, useEffect } from "react";
import CartItem from "../../components/CartItem";
import { useRouter } from "next/navigation";
import { TextField, Button, Alert, Snackbar } from "@mui/material";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountValid, setIsDiscountValid] = useState(true);
  const [error, setError] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  const updateQuantity = (id, quantity) => {
    if (isNaN(quantity) || quantity < 0) {
      setError("Invalid quantity. Please enter a positive number.");
      setShowSnackbar(true);
      return;
    }
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: +quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const validateDiscountCode = () => {
    // Example: hardcode valid discount codes for now
    const validCodes = ["SAVE10", "DISCOUNT20"];
    if (validCodes.includes(discountCode.toUpperCase())) {
      setIsDiscountValid(true);
      setError("");
    } else {
      setIsDiscountValid(false);
      setError("Invalid discount code.");
      setShowSnackbar(true);
    }
  };

  const calculateTotals = () => {
    let fixedDiscountTotal = 0;
    let percentageDiscountTotal = 0;
    let totalPrice = 0;

    cart.forEach((item) => {
      let discountAmount = 0;

      if (item.discountType === "percentage") {
        discountAmount = item.price * (item.discountValue / 100);
        percentageDiscountTotal += discountAmount * item.quantity;
      } else if (item.discountType === "fixed") {
        discountAmount = item.discountValue;
        fixedDiscountTotal += discountAmount * item.quantity;
      }

      const discountedPrice = item.price - discountAmount;
      totalPrice += discountedPrice * item.quantity;
    });

    return {
      fixedDiscountTotal: fixedDiscountTotal.toFixed(2),
      percentageDiscountTotal: percentageDiscountTotal.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
    };
  };

  const totals = calculateTotals();

  const handleBackward = () => {
    router.back();
  };

  return (
    <div className="container mx-auto p-8 bg-white min-h-screen">
      <div className="bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 p-8 rounded-md shadow-lg mb-8">
        <h1
          className="text-xl xl:text-3xl font-bold text-white cursor-pointer"
          onClick={handleBackward}
        >
          Your Cart
        </h1>
      </div>
      <div>
        {cart.length === 0 ? (
          <p className="text-lg text-center text-gray-600">
            Your cart is empty.
          </p>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))
        )}
      </div>

      {/* Discount Code Section */}
      <div className="mt-6 p-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-md shadow-lg border border-gray-300 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Apply Discount Code</h2>
        <TextField
          label="Discount Code"
          variant="outlined"
          value={discountCode}
          onChange={handleDiscountCodeChange}
          fullWidth
          error={!isDiscountValid}
          helperText={!isDiscountValid && "Invalid discount code."}
          className="bg-white rounded-md"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={validateDiscountCode}
          className="mt-2"
          sx={{
            bgcolor: '#FF6F61', // Custom color
            '&:hover': {
              bgcolor: '#FF3D2D', // Darker shade on hover
            },
            borderRadius: '20px',
          }}
        >
          Apply Discount
        </Button>
        <div className="mt-4 text-right space-y-2">
          <h2 className="text-lg font-medium text-gray-700">
            Discounts:{" "}
            <span className="text-emerald-600">
              ${totals.percentageDiscountTotal}
            </span>
          </h2>
          <hr className="border-t border-gray-200 my-4" />
          <h2 className="text-2xl font-bold text-gray-800">
            Total Price:{" "}
            <span className="text-amber-700">${totals.totalPrice}</span>
          </h2>
        </div>
      </div>

      {/* Snackbar for Error Messages */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}