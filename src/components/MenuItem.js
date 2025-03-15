import React, { useState, useEffect } from "react";
import { FaImage, FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const url = "https://caffe-production.up.railway.app";

const MenuItem = ({ item, updateCart }) => {
  const [imgError, setImgError] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    // Получаем данные о текущем пользователе из localStorage
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      // Запросим корзину текущего пользователя по cartId
      fetch(`${url}/api/Cart/user/${user.id}`)
        .then(response => response.json())
        .then(data => {
          setCartItems(Array.isArray(data.items) ? data.items : []); // Проверяем, массив ли это
        })
        .catch(error => {
          console.error("Error fetching cart data:", error);
          setCartItems([]); // Устанавливаем пустой массив при ошибке
        });
    }
  }, []);  
  
  useEffect(() => {
    // Считаем количество товара в корзине
    if (cartItems.length > 0) {
      const itemInCart = cartItems.filter(cartItem => cartItem.id === item.id);
      setQuantity(itemInCart.reduce((acc, curr) => acc + 1, 0)); // Суммируем количество товаров с одинаковым id
    }
  }, [cartItems, item.id]);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    addToCart(); // Добавляем в корзину сразу после увеличения
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      removeFromCart(); // Вызываем функцию удаления из корзины
    }
  };
  
  // Функция для отправки запроса на удаление блюда из корзины
  const removeFromCart = () => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      const menuItemId = item.id;
  
      fetch(`${url}/api/Cart/user/${user.id}/remove-item/${menuItemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            updateCart(menuItemId, quantity - 1); // Обновляем состояние корзины в HomePage
          } else {
            console.error("Failed to remove item from cart");
          }
        })
        .catch((error) => console.error("Error removing item from cart:", error));
    }
  };  

  // Функция для отправки запроса на добавление блюда в корзину
  const addToCart = () => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      const menuItemId = item.id;

      fetch(`${url}/api/Cart/user/${user.id}/add-item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menuItemId,
          quantity: 1, // Мы добавляем 1 порцию каждого блюда
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            updateCart(menuItemId, quantity); // Обновляем состояние корзины в HomePage
          } else {
            console.error("Failed to add item to cart:", data);
          }
        })
        .catch((error) => console.error("Error adding item to cart:", error));
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
          src={item.imageUrl}
          alt={item.title}
          className="w-36 h-36 rounded-full object-cover mb-4"
          onError={() => setImgError(true)}
        />
      )}
      <h3 className="text-lg text-black mb-2">{item.title}</h3>
      <div className="flex items-center justify-between w-full">
        <button
          className="bg-black text-yellow-500 rounded-full w-8 h-8 flex items-center justify-center
                     hover:bg-gray-800 active:bg-gray-900 transition-colors duration-150"
          onClick={decreaseQuantity}
        >
          <FaMinusCircle />
        </button>

        {quantity > 0 && <span className="text-lg mx-4">{quantity}</span>}

        <span className="text-lg mx-2">{item.price} ₽</span>

        <button
          className="bg-black text-yellow-500 rounded-full w-8 h-8 flex items-center justify-center
                     hover:bg-gray-800 active:bg-gray-900 transition-colors duration-150"
          onClick={increaseQuantity} // Здесь вызывается и увеличение, и добавление в корзину
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