"use client";
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productsData } from '@/public/ProductData';
import Cart from './Cart';

export default function Home() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    setCart(updatedCart);
    console.log(product,"Product Added");
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log("Storage Updated",updatedCart);
    
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {productsData.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
      <Cart/>
    </div>
  );
}
