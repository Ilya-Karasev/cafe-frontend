import React, { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { FaSearch, FaShoppingBasket } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo512.jpg";

const NavbarMenu = ({ onCategorySelect, onSearch, onLogoClick }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
          <Link to="/cart">
            <button className="bg-[rgb(36,34,39)] text-[rgb(255,204,1)] rounded-md flex items-center justify-center h-16 w-16 text-4xl hover:opacity-80 mr-10">
              <FaShoppingBasket />
            </button>
          </Link>
          <Link to="/sign-in">
            <button className="bg-[rgb(36,34,39)] text-[rgb(255,204,1)] rounded-md flex items-center justify-center h-16 w-16 text-4xl hover:opacity-80">
              <BsPersonCircle />
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-[rgb(255,204,1)] text-[rgb(36,34,39)] w-full">
        <ul className="flex flex-wrap justify-around list-none p-0 m-0">
          <li
            onClick={() => handleCategoryClick(1)}
            className={`cursor-pointer py-4 px-2 border-2 border-[rgb(36,34,39)] text-center flex-grow hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)] ${
              selectedCategory === 1
                ? "bg-[rgb(36,34,39)] text-[rgb(255,204,1)]"
                : ""
            }`}
          >
            <strong>Основные блюда</strong>
          </li>
          <li
            onClick={() => handleCategoryClick(2)}
            className={`cursor-pointer py-4 px-2 border-2 border-[rgb(36,34,39)] text-center flex-grow hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)] ${
              selectedCategory === 2
                ? "bg-[rgb(36,34,39)] text-[rgb(255,204,1)]"
                : ""
            }`}
          >
            <strong>Закуски</strong>
          </li>
          <li
            onClick={() => handleCategoryClick(3)}
            className={`cursor-pointer py-4 px-2 border-2 border-[rgb(36,34,39)] text-center flex-grow hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)] ${
              selectedCategory === 3
                ? "bg-[rgb(36,34,39)] text-[rgb(255,204,1)]"
                : ""
            }`}
          >
            <strong>Супы</strong>
          </li>
          <li
            onClick={() => handleCategoryClick(4)}
            className={`cursor-pointer py-4 px-2 border-2 border-[rgb(36,34,39)] text-center flex-grow hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)] ${
              selectedCategory === 4
                ? "bg-[rgb(36,34,39)] text-[rgb(255,204,1)]"
                : ""
            }`}
          >
            <strong>Салаты</strong>
          </li>
          <li
            onClick={() => handleCategoryClick(5)}
            className={`cursor-pointer py-4 px-2 border-2 border-[rgb(36,34,39)] text-center flex-grow hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)] ${
              selectedCategory === 5
                ? "bg-[rgb(36,34,39)] text-[rgb(255,204,1)]"
                : ""
            }`}
          >
            <strong>Десерты</strong>
          </li>
          <li
            onClick={() => handleCategoryClick(6)}
            className={`cursor-pointer py-4 px-2 border-2 border-[rgb(36,34,39)] text-center flex-grow hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)] ${
              selectedCategory === 6
                ? "bg-[rgb(36,34,39)] text-[rgb(255,204,1)]"
                : ""
            }`}
          >
            <strong>Напитки</strong>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default NavbarMenu;
