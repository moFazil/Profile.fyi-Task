"use client";
import React, { useState, useEffect } from 'react';
import CartItem from '../../components/CartItem';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, +quantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleBackward = () => {
    router.back();
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 bg-white min-h-screen">
      <div className="bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 p-4 sm:p-6 md:p-8 rounded-md shadow-lg mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white cursor-pointer" onClick={handleBackward}>Your Cart</h1>
      </div>
      <div>
        {cart.length === 0 ? (
          <p className="text-sm sm:text-base md:text-lg text-center text-gray-600">Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))
        )}
      </div>
      <div className="mt-4 sm:mt-6 md:mt-8 text-right">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-warm-gray-900">Subtotal: ${subtotal.toFixed(2)}</h2>
      </div>
    </div>
  );
}