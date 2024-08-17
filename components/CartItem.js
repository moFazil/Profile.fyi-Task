import React from 'react';

const CartItem = ({ item, updateQuantity, removeItem , handleClose}) => {
  const handleQuantityChange = (e) => {
    const quantity = e.target.value;
    updateQuantity(item.id, quantity);
  };

  return (
    <div className="border p-4 sm:p-6 md:p-8 rounded-lg shadow-md bg-white mb-4 flex flex-col sm:flex-row items-center">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-full sm:w-32 md:w-40 h-32 sm:h-32 md:h-40 object-cover object-center rounded-md mb-4 sm:mb-0"
      />
      <div className="flex-grow sm:ml-4 text-center sm:text-left">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-warm-gray-900">{item.name}</h3>
        <p className="text-sm sm:text-base md:text-lg text-gray-600">${item.price.toFixed(2)}</p>
        <div className="flex justify-center sm:justify-start items-center mt-4 space-x-4">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
              className="bg-gray-300 text-gray-700 px-2 sm:px-3 md:px-4 py-1 sm:py-2 hover:bg-gray-400 transition-colors duration-300"
            >
              -
            </button>
            <input
              value={item.quantity}
              onChange={handleQuantityChange}
              min="0"
              className="w-12 sm:w-16 text-center border-none outline-none px-2 py-1 text-lg font-semibold text-warm-gray-900"
            />
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="bg-gray-300 text-gray-700 px-2 sm:px-3 md:px-4 py-1 sm:py-2 hover:bg-gray-400 transition-colors duration-300"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="bg-red-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded hover:bg-red-600 transition-colors duration-300"
          >
            Remove
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default CartItem;
