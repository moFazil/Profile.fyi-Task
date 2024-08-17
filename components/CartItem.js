import React, { useState, useEffect } from 'react';
import { Modal, Button, Box, Typography } from '@mui/material';

const CartItem = ({ item, updateQuantity, removeItem }) => {
  // State for modal visibility
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, parseInt(e.target.value) || 1); // Ensure min quantity is 1
    setQuantity(newQuantity);
    updateQuantity(item.id, newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(item.id, newQuantity);
  };

  const handleRemoveClick = () => {
    setOpen(true); // Open the confirmation modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  const handleConfirmRemove = () => {
    removeItem(item.id); // Confirm removal
    handleClose(); // Close the modal
  };

  const calculateDiscountedPrice = () => {
    if (item.discountType === 'percentage') {
      return item.price - (item.price * (item.discountValue / 100));
    } else if (item.discountType === 'fixed') {
      return item.price - item.discountValue;
    }
    return item.price; // If no discount
  };

  const discountedPrice = calculateDiscountedPrice();

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white mb-4 flex items-center">
      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover object-center rounded-md" />
      <div className="flex-grow ml-4">
        <h3 className="text-lg font-semibold text-warm-gray-900">{item.name}</h3>
        <p className="text-gray-600 line-through">${item.price.toFixed(2)}</p>
        <p className="text-gray-800 font-bold">${discountedPrice.toFixed(2)}</p>
        <div className="md:flex items-center mt-2 space-x-4">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={handleDecrease}
              className="bg-gray-300 text-gray-700 px-4 py-2 hover:bg-gray-400 transition-colors duration-300"
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
              className="bg-gray-300 text-gray-700 px-4 py-2 hover:bg-gray-400 transition-colors duration-300"
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="confirmation-modal-title"
        aria-describedby="confirmation-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="confirmation-modal-title" variant="h6" component="h2">
            Confirm Removal
          </Typography>
          <Typography id="confirmation-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to remove this item from your cart?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="inherit"
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmRemove}
              variant="contained"
              color="error"
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CartItem;
