import React from 'react';

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="flex items-center justify-between border-b pb-2 mb-2">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
      <div className="flex-1 ml-4">
        <h4 className="text-lg font-semibold">{item.name}</h4>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      <input
        type="number"
        value={item.quantity}
        onChange={(e) => updateQuantity(item.id, e.target.value)}
        className="w-16 p-2 border rounded text-center"
      />
      <button
        className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={() => removeItem(item.id)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
