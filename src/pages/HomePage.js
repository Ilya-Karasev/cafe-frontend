import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import MenuItem from "../components/MenuItem";
import NavbarMenu from "../components/NavbarMenu";
import { fetchMenuItems } from "../services/menuService";
import "../style/WebsiteBackground.css";

const HomePage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true); // Для отображения состояния загрузки
  const [error, setError] = useState(null); // Для обработки ошибок

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const data = await fetchMenuItems();
        setMenuItems(data); // Устанавливаем данные меню в состояние
      } catch (error) {
        setError("Failed to load menu items");
      } finally {
        setLoading(false); // Завершаем загрузку
      }
    };
    loadMenuItems();
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto">
      <NavbarMenu />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-items-center flex-grow website-background inset-0 bg-black bg-opacity-30">
        <div className="absolute font-bold inset-0 website-background-overlay"></div>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <div className="animate-spin rounded-full border-t-4 border-[rgb(255,204,1)] w-16 h-16 mb-4"></div>
            <p className="text-xl text-[rgb(255,204,1)]">Загрузка меню...</p>
          </div>
        )}
        {error && <p>{error}</p>}
        {menuItems.length > 0 &&
          menuItems.map((item) => <MenuItem key={item.id} item={item} />)}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
