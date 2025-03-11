import React, { useState, useEffect } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { FaSearch, FaShoppingBasket } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo512.jpg";

const NavbarMenu = ({ onCategorySelect, onSearch, onLogoClick }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    setIsLoggedIn(!!userData); // true, если данные пользователя есть
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleLogoClick = () => {
    setSelectedCategory(null);
    setSearchQuery("");
    onLogoClick();
  };

  const handleCartClick = () => {
    if (isLoggedIn) {
      navigate("/cart");
    } else {
      alert("Пожалуйста, авторизуйтесь, чтобы перейти в корзину.");
    }
  };

  return (
    <main className="flex flex-col w-full bg-gray-50">
      <div className="flex justify-between items-center bg-[rgb(36,34,39)] p-4 w-full mb-0">
        <div className="logo" onClick={handleLogoClick}>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-12 w-12 cursor-pointer" />
          </Link>
        </div>
        <div className="relative flex items-center">
          <FaSearch className="absolute left-2 text-[rgb(36,34,39)]" />
          <input
            type="text"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-[300px] pl-10 pr-2 py-2 text-[rgb(36,34,39)] text-base bg-[rgb(255,204,1)] border border-gray-300 rounded-full outline-none"
          />
        </div>
        <div className="flex items-center">
          <button
            onClick={handleCartClick}
            className="bg-[rgb(36,34,39)] text-[rgb(255,204,1)] rounded-md flex items-center justify-center h-16 w-16 text-4xl hover:opacity-80 mr-10"
          >
            <FaShoppingBasket />
          </button>
          <Link to={isLoggedIn ? "/user-account" : "/sign-in"}>
            <button className="bg-[rgb(36,34,39)] text-[rgb(255,204,1)] rounded-md flex items-center justify-center h-16 w-16 text-4xl hover:opacity-80">
              <BsPersonCircle />
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-[rgb(255,204,1)] text-[rgb(36,34,39)] w-full">
        <ul className="flex flex-wrap justify-around list-none p-0 m-0">
          {[{ id: 1, name: "Основные блюда" }, { id: 2, name: "Закуски" }, { id: 3, name: "Супы" }, { id: 4, name: "Салаты" }, { id: 5, name: "Десерты" }, { id: 6, name: "Напитки" }].map((cat) => (
            <li
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`cursor-pointer py-4 px-2 border-2 border-[rgb(36,34,39)] text-center flex-grow hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)] ${
                selectedCategory === cat.id ? "bg-[rgb(36,34,39)] text-[rgb(255,204,1)]" : ""
              }`}
            >
              <strong>{cat.name}</strong>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default NavbarMenu;