"use client";
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productsData } from '@/public/ProductData';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCart = () => {
    router.push('/cart');
  };

  return (
    <div className="container mx-auto p-8 bg-white">
      <div className="bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 px-2 xl:px-8 py-5 xl:py-8 rounded-md shadow-lg mb-8">
        <div className="flex justify-between items-center">
          <div className="text-white">
            <h1 className="text-xl xl:text-3xl font-bold">Products</h1>
          </div>
          <div>
            <button
              className="bg-yellow-500 text-white text-sm xl:text-md font-bold px-3 xl:px-6 py-1 xl:py-2 rounded-full hover:bg-yellow-600 transition-colors duration-300"
              onClick={handleCart}
            >
              Cart ({cart.length})
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsData.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
