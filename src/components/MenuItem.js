import React from "react";
import { FaImage, FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const MenuItem = ({ item }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="flex flex-col items-center justify-between p-4 m-2 border-2 border-white rounded-lg bg-white/80 shadow-md w-52 text-center">
      {/* Отображение изображения или иконки при ошибке */}
      {imgError ? (
        <div className="flex items-center justify-center w-36 h-36 mb-4 bg-gray-200 rounded-full">
          <FaImage className="w-16 h-16 text-gray-400" />
        </div>
      ) : (
        <a href={item.img} target="_blank" rel="noopener noreferrer">
          <img
            src={item.img} // Используем ключ 'img' из JSON
            alt={item.name}
            className="w-36 h-36 rounded-full object-cover mb-4"
            onError={() => setImgError(true)} // Если изображение не загрузилось, показываем иконку
          />
        </a>
      )}

      {/* Название товара */}
      <h3 className="text-lg text-black mb-2">{item.name}</h3>

      {/* Кнопки для изменения количества и отображение цены */}
      <div className="flex items-center justify-between w-full">
        <button
          className="bg-black text-yellow-500 rounded-full w-8 h-8 flex items-center justify-center
                     hover:bg-gray-800 active:bg-gray-900 transition-colors duration-150"
        >
          <FaMinusCircle />
        </button>
        <span className="text-lg mx-4">{item.price} ₽</span>
        <button
          className="bg-black text-yellow-500 rounded-full w-8 h-8 flex items-center justify-center
                     hover:bg-gray-800 active:bg-gray-900 transition-colors duration-150"
        >
          <FaPlusCircle />
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
