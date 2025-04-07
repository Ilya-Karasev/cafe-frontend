import React, { useState, useEffect } from "react";
import { FaImage, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { getApiUrl } from "../configs/apiConfig";

const MenuItem = ({ item, updateCart }) => {
  const [imgError, setImgError] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  const url = getApiUrl();

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
  }, [url]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const itemInCart = cartItems.filter(cartItem => cartItem.id === item.id);
      setQuantity(itemInCart.reduce((acc, curr) => acc + 1, 0));
    }
  }, [cartItems, item.id]);

  useEffect(() => {
    fetch(`${url}/api/MenuItem/${item.id}`)
      .then(response => response.json())
      .then(data => {
        setIsAvailable(data.isAvailable);
      })
      .catch(error => {
        console.error("Error fetching item availability:", error);
      });
  }, [item.id, url]);

  const increaseQuantity = () => {
    setIsLoadingPrice(true);
    setQuantity(prevQuantity => prevQuantity + 1);
    addToCart();
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      if (quantity === 1) setIsLoadingPrice(false); // Избегаем зависания спиннера при удалении последней порции
      setQuantity(prevQuantity => prevQuantity - 1);
      removeFromCart();
    }
  };

  useEffect(() => {
    if (quantity > 0) {
      setTimeout(() => {
        setIsLoadingPrice(false);
      }, 500);
    } else {
      setIsLoadingPrice(false); // Если блюдо удалено, сразу отключаем спиннер
    }
  }, [quantity]);

  const removeItemCompletely = () => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      fetch(`${url}/api/Cart/user/${user.id}/remove-item/${item.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then(response => {
          if (response.ok) {
            setQuantity(0);
            setIsLoadingPrice(false);
            updateCart(item.id, 0);
          }
        })
        .catch(error => console.error("Error removing item from cart:", error));
    }
  };

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

  if (!isAvailable) {
    return (
      <div className="flex flex-col items-center justify-between p-4 m-2 border-2 border-white rounded-lg bg-white shadow-md w-52 text-center">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-36 h-36 rounded-full object-cover mb-4 opacity-50"
        />
        <h3 className="text-lg text-black mb-2">{item.title}</h3>
        <div className="text-red-500 font-bold">Извините, блюдо закончилось</div>
        <button
          className="mt-2 bg-[rgb(50,48,52)] text-[rgb(255,204,1)] py-1 px-2 rounded hover:bg-[rgb(255,204,1)] hover:text-[rgb(50,48,52)]"
          onClick={removeItemCompletely}
        >
          Удалить из заказа
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-between p-4 m-2 border-2 border-white rounded-lg bg-white shadow-md w-52 text-center">
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
      <div className="text-lg mx-2 mb-2">
        {isLoadingPrice ? (
          <ImSpinner8 className="animate-spin text-yellow-500 text-2xl" />
        ) : quantity > 0 ? (
          <>{quantity * item.price} ₽</>
        ) : (
          <>{item.price} ₽</>
        )}
      </div>
      <div className="flex items-center justify-between w-full">
        <button
          className="bg-black text-yellow-500 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-800 active:bg-gray-900 transition-colors duration-150"
          onClick={decreaseQuantity}
        >
          <FaMinusCircle />
        </button>

        {quantity > 0 && <span className="text-lg mx-4">{quantity}</span>}

        <button
          className="bg-black text-yellow-500 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-800 active:bg-gray-900 transition-colors duration-150"
          onClick={increaseQuantity}
        >
          <FaPlusCircle />
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
