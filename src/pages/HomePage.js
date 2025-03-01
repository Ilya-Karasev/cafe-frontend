import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import MenuItem from "../components/MenuItem";
import NavbarMenu from "../components/NavbarMenu";
import { fetchMenuItems } from "../services/menuService";
import "../style/WebsiteBackground.css";

const HomePage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const data = await fetchMenuItems();
        setMenuItems(data);
        setFilteredMenuItems(data);
      } catch (error) {
        setError("Failed to load menu items");
      } finally {
        setLoading(false);
      }
    };
    loadMenuItems();
  }, []);

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

  return (
    <div className="flex flex-col h-screen">
      <NavbarMenu
        onCategorySelect={handleCategorySelect}
        onSearch={handleSearch}
        onLogoClick={handleLogoClick}
      />
      <div className="flex-grow relative website-background bg-black bg-opacity-30">
        <div className="absolute inset-0 font-bold website-background-overlay"></div>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <div className="animate-spin rounded-full border-t-4 border-[rgb(255,204,1)] w-16 h-16 mb-4"></div>
            <p className="text-xl text-[rgb(255,204,1)]">Загрузка меню...</p>
          </div>
        )}
        {error && <p>{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-items-center">
          {filteredMenuItems.length > 0 &&
            filteredMenuItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
