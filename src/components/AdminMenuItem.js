import React from "react";
import { FaImage } from "react-icons/fa";

const AdminMenuItem = ({ item }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="flex flex-col items-center justify-between p-4 m-2 border-2 border-white rounded-lg bg-white/80 shadow-md w-52 text-center">
      {imgError ? (
        <div className="flex items-center justify-center w-36 h-36 mb-4 bg-gray-200 rounded-full">
          <FaImage className="w-16 h-16 text-gray-400" />{" "}
        </div>
      ) : (
        <img
          src={item.image}
          alt={item.name}
          className="w-36 h-36 rounded-full object-cover mb-4"
          onError={() => setImgError(true)}
        />
      )}
      <h3 className="text-lg text-black mb-2">{item.name}</h3>
      <div className="flex justify-center items-center w-full">
        <span className="text-lg mx-4">{item.price} ₽</span>
      </div>
    </div>
  );
};

export default AdminMenuItem;
