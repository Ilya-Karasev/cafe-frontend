import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import MenuItem from "../components/MenuItem";
import NavbarMenu from "../components/NavbarMenu";
import { fetchMenuItems } from "../services/menuService";
import "../style/WebsiteBackground.css";
import { getApiUrl } from "../configs/apiConfig";

const HomePage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const url = getApiUrl();

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const data = await fetchMenuItems();
        const availableItems = data.filter(item => item.isAvailable);
        setMenuItems(availableItems);
        setFilteredMenuItems(availableItems);
      } catch (error) {
        setError("Failed to load menu items");
      } finally {
        setLoading(false);
      }
    };
    loadMenuItems();
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      fetch(`${url}/api/Cart/user/${user.id}`)
        .then(response => response.json())
        .then(data => {
          setCartItems(data.items || []);
        })
        .catch(error => console.error("Error fetching cart data:", error));
    }
  }, [url]);

  const handleCategorySelect = (category) => {
    if (category) {
      setFilteredMenuItems(
        menuItems.filter((item) => item.category === category)
      );
    } else {
      setFilteredMenuItems(menuItems);
    }
  };

  const handleSearch = (query) => {
    if (query) {
      const filteredItems = menuItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMenuItems(filteredItems);
    } else {
      setFilteredMenuItems(menuItems);
    }
  };

  const handleLogoClick = () => {
    setFilteredMenuItems(menuItems);
  };

  const updateCart = (itemId, quantity) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === itemId);
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = { ...updatedItems[existingItemIndex], quantity };
        return updatedItems;
      } else {
        return [...prevItems, { id: itemId, quantity }];
      }
    });
  };

  const getQuantityById = (id) => {
    const item = cartItems.find(cartItem => cartItem.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="flex flex-col h-screen">
      <NavbarMenu
        onCategorySelect={handleCategorySelect}
        onSearch={handleSearch}
        onLogoClick={handleLogoClick}
      />
      <div className="flex-grow relative website-background bg-black bg-opacity-30">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <div className="animate-spin rounded-full border-t-4 border-[rgb(255,204,1)] w-16 h-16 mb-4"></div>
            <p className="text-xl text-[rgb(255,204,1)]">Загрузка меню...</p>
          </div>
        )}
        {error && <p>{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-items-center">
          {filteredMenuItems.map((item) => (
            <MenuItem
              key={item.id}
              item={{ ...item, quantity: getQuantityById(item.id) }}
              updateCart={updateCart}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
