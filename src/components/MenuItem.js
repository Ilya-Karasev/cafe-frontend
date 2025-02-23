import React, { useState } from "react";
import { FaImage, FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const MenuItem = ({ item }) => {
  const [imgError, setImgError] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const totalPrice = quantity * item.price;

  return (
    <div className="flex flex-col items-center justify-between p-4 m-2 border-2 border-white rounded-lg bg-white/80 shadow-md w-52 text-center">
      {imgError ? (
        <div className="flex items-center justify-center w-36 h-36 mb-4 bg-gray-200 rounded-full">
          <FaImage className="w-16 h-16 text-gray-400" />
        </div>
      ) : (
        <img
          src={item.imageUrl} // Используем правильное поле из API
          alt={item.title} // Тоже исправляем название
          className="w-36 h-36 rounded-full object-cover mb-4"
          onError={() => setImgError(true)}
        />
      )}
      <h3 className="text-lg text-black mb-2">{item.title}</h3>
{/*       <p className="text-sm text-gray-600 mb-2">{item.description}</p> */}
      <div className="flex items-center justify-between w-full">
        <button
          className="bg-black text-yellow-500 rounded-full w-8 h-8 flex items-center justify-center
                     hover:bg-gray-800 active:bg-gray-900 transition-colors duration-150"
          onClick={decreaseQuantity}
        >
          <FaMinusCircle />
        </button>

        {quantity > 0 && <span className="text-lg mx-4">{quantity}</span>}

        <span className="text-lg mx-4">{item.price} ₽</span>

        <button
          className="bg-black text-yellow-500 rounded-full w-8 h-8 flex items-center justify-center
                     hover:bg-gray-800 active:bg-gray-900 transition-colors duration-150"
          onClick={increaseQuantity}
        >
          <FaPlusCircle />
        </button>
      </div>

      {quantity > 0 && (
        <div className="mt-2 text-sm text-black">
          Общая стоимость: {totalPrice} ₽
        </div>
      )}
    </div>
  );
};

export default MenuItem;
