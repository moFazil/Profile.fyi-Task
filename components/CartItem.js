import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button, Box, Typography } from "@mui/material";

// Reusable modal component for confirmation dialogs
const ModalConfirm = ({ open, onClose, onConfirm, title, description }) => (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="confirmation-modal-title"
    aria-describedby="confirmation-modal-description"
  >
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography id="confirmation-modal-title" variant="h6" component="h2">
        {title}
      </Typography>
      <Typography id="confirmation-modal-description" sx={{ mt: 2 }}>
        {description}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          sx={{ mr: 2 }}
        >
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Confirm
        </Button>
      </Box>
    </Box>
  </Modal>
);

const CartItem = ({ item, updateQuantity, removeItem }) => {
  const [open, setOpen] = useState(false); // State for modal visibility
  const [quantity, setQuantity] = useState(item.quantity);

  // Sync quantity state with props
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  // Handle quantity input change
  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, parseInt(e.target.value) || 1); // Ensure min quantity is 1
    setQuantity(newQuantity);
    updateQuantity(item.id, newQuantity);
  };

  // Handle quantity decrease
  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
    }
  };

  // Handle quantity increase
  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(item.id, newQuantity);
  };

  // Open confirmation modal for item removal
  const handleRemoveClick = () => {
    setOpen(true);
  };

  // Close confirmation modal
  const handleClose = () => {
    setOpen(false);
  };

  // Confirm item removal
  const handleConfirmRemove = () => {
    removeItem(item.id);
    handleClose();
  };

  // Calculate discounted price based on discount type
  const calculateDiscountedPrice = () => {
    if (item.discountType === "percentage") {
      return item.price - item.price * (item.discountValue / 100);
    } else if (item.discountType === "fixed") {
      return item.price - item.discountValue;
    }
    return item.price; // If no discount
  };

  const discountedPrice = calculateDiscountedPrice();

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white mb-4 flex items-center">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover object-center rounded-md"
      />
      <div className="flex-grow ml-4">
        <h3 className="text-lg font-semibold text-warm-gray-900">
          {item.name}
        </h3>
        <p className="text-gray-600 line-through">${item.price.toFixed(2)}</p>
        <p className="text-gray-800 font-bold">${discountedPrice.toFixed(2)}</p>
        <div className="md:flex items-center mt-2 space-x-4">
          <div className="flex items-center border rounded-lg overflow-hidden mb-4 xl:mb-0">
            <button
              onClick={handleDecrease}
              className="bg-gray-300 text-gray-700 px-4 py-2 hover:bg-gray-400 transition-colors duration-300 md:text-2xl"
            >
              -
            </button>
            <input
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="w-16 text-center border-none outline-none px-2 py-1 text-lg font-semibold text-warm-gray-900"
            />
            <button
              onClick={handleIncrease}
              className="bg-gray-300 text-gray-700 px-4 py-2 hover:bg-gray-400 transition-colors duration-300 md:text-2xl"
            >
              +
            </button>
          </div>
          <Button
            onClick={handleRemoveClick}
            variant="contained"
            color="error"
            className="ml-4"
          >
            Remove
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ModalConfirm
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirmRemove}
        title="Confirm Removal"
        description="Are you sure you want to remove this item from your cart?"
      />
    </div>
  );
};

export default CartItem;
