import React, { useState, useEffect } from "react";
import { FaImage, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im"; // Иконка спиннера

const url = "https://caffe-production.up.railway.app";

const MenuItem = ({ item, updateCart }) => {
  const [imgError, setImgError] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false); // Добавлено состояние загрузки цены

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      fetch(`${url}/api/Cart/user/${user.id}`)
        .then(response => response.json())
        .then(data => {
          setCartItems(Array.isArray(data.items) ? data.items : []);
        })
        .catch(error => {
          console.error("Error fetching cart data:", error);
          setCartItems([]);
        });
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      const itemInCart = cartItems.filter(cartItem => cartItem.id === item.id);
      setQuantity(itemInCart.reduce((acc, curr) => acc + 1, 0));
    }
  }, [cartItems, item.id]);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      setIsLoadingPrice(true); // Показываем спиннер перед обновлением цены
      addToCart();
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        setIsLoadingPrice(true); // Показываем спиннер перед обновлением цены
        removeFromCart();
        return newQuantity;
      });
    }
  };

  useEffect(() => {
    if (quantity > 0) {
      setTimeout(() => {
        setIsLoadingPrice(false); // Убираем спиннер после загрузки цены
      }, 500); // Имитация задержки запроса
    }
  }, [quantity]);

  const totalPrice = quantity * item.price;

  const removeFromCart = () => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      fetch(`${url}/api/Cart/user/${user.id}/remove-item/${item.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then(response => {
          if (response.ok) updateCart(item.id, quantity - 1);
        })
        .catch(error => console.error("Error removing item from cart:", error));
    }
  };

  const addToCart = () => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      fetch(`${url}/api/Cart/user/${user.id}/add-item`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menuItemId: item.id, quantity: 1 }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) updateCart(item.id, quantity);
        })
        .catch(error => console.error("Error adding item to cart:", error));
    }
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 m-2 border-2 border-white rounded-lg bg-white/80 shadow-md w-52 text-center">
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
      <div className="flex items-center justify-between w-full">
        <button
          className="bg-black text-yellow-500 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-800 active:bg-gray-900 transition-colors duration-150"
          onClick={decreaseQuantity}
        >
          <FaMinusCircle />
        </button>

        {quantity > 0 && <span className="text-lg mx-4">{quantity}</span>}

        <span className="text-lg mx-2">{item.price} ₽</span>

        <button
          className="bg-black text-yellow-500 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-800 active:bg-gray-900 transition-colors duration-150"
          onClick={increaseQuantity}
        >
          <FaPlusCircle />
        </button>
      </div>

      {quantity > 0 && (
        <div className="mt-2 text-sm text-black">
          {isLoadingPrice ? (
            <ImSpinner8 className="animate-spin text-yellow-500 text-2xl" />
          ) : (
            <>Общая стоимость: {totalPrice} ₽</>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
