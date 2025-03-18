import React, { useState } from "react";
import { FaImage, FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

const AdminMenuItem = ({ item, onHide, onRestore, onEdit, onDelete }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`flex flex-col items-center justify-between p-4 m-2 border-2 border-white rounded-lg bg-white/80 shadow-md w-52 text-center ${!item.isAvailable ? "opacity-50" : ""}`}>
      {imgError ? (
        <div className="flex items-center justify-center w-36 h-36 mb-4 bg-gray-200 rounded-full">
          <FaImage className="w-16 h-16 text-gray-400" />
        </div>
      ) : (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-36 h-36 rounded-full object-cover mb-4"
          onError={() => setImgError(true)}
        />
      )}
      <h3 className="text-lg text-black mb-2">{item.title}</h3>
      <div className="flex justify-center items-center w-full">
        <span className="text-lg mx-4">{item.price} ₽</span>
      </div>
      <div className="flex mt-2 gap-2">
        {item.isAvailable ? (
          <button
            className="text-xs text-[rgb(255,204,1)] bg-[rgb(50,48,52)] py-1 px-2 rounded-full hover:bg-[rgb(255,204,1)] hover:text-[rgb(50,48,52)]"
            onClick={() => onHide(item)}
          >
            <FaEyeSlash />
          </button>
        ) : (
          <button
            className="text-xs bg-[rgb(255,204,1)] text-[rgb(50,48,52)] py-1 px-2 rounded-full hover:bg-[rgb(50,48,52)] hover:text-[rgb(255,204,1)]"
            onClick={() => onRestore(item)}
          >
            <FaEye />
          </button>
        )}
        <button
          className="text-xs text-[rgb(255,204,1)] bg-[rgb(50,48,52)] py-1 px-2 rounded-full hover:bg-[rgb(255,204,1)] hover:text-[rgb(50,48,52)]"
          onClick={() => onEdit(item)}
        >
          <FaEdit />
        </button>
        <button
          className="text-xs text-[rgb(255,204,1)] bg-[rgb(50,48,52)] py-1 px-2 rounded-full hover:bg-[rgb(255,204,1)] hover:text-[rgb(50,48,52)]"
          onClick={() => onDelete(item.id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default AdminMenuItem;
