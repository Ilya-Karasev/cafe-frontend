import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { FaSearch, FaShoppingBasket } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import { Link } from "react-router-dom";
import logo from "../assets/logo512.jpg";

const Navbar = () => {
  const isAuthenticated = localStorage.getItem("currentUser") !== null;

  return (
    <main className="flex flex-col w-full bg-gray-50">
      {/* Верхняя часть навбара */}
      <div className="flex justify-between items-center bg-[rgb(36,34,39)] p-4 w-full mb-0">
        {/* Лого с ссылкой на главную страницу */}
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-12 w-12" />
          </Link>
        </div>

        {/* Поисковая строка по центру */}
        <div className="relative flex items-center">
          <FaSearch className="absolute left-2 text-[rgb(36,34,39)]" />
          <input
            type="text"
            placeholder="_______________________________________"
            className="w-[300px] pl-10 pr-2 py-2 text-[rgb(36,34,39)] text-base bg-[rgb(255,204,1)] border border-gray-300 rounded-full outline-none"
          />
        </div>

        {/* Кнопки корзины и входа в аккаунт в правом углу */}
        <div className="flex items-center">
          {/* Кнопка возврата к главному меню с иконкой ножа и вилки */}
          <Link to="/">
            <button className="bg-[rgb(36,34,39)] text-[rgb(255,204,1)] rounded-md flex items-center justify-center h-16 w-16 text-4xl hover:opacity-80 mr-10">
              <GiKnifeFork />
            </button>
          </Link>

          {/* Кнопка корзины с ссылкой на страницу корзины */}
          <Link to="/cart">
            <button className="bg-[rgb(36,34,39)] text-[rgb(255,204,1)] rounded-md flex items-center justify-center h-16 w-16 text-4xl hover:opacity-80 mr-10">
              <FaShoppingBasket />
            </button>
          </Link>

          {/* Кнопка входа в аккаунт / переход в профиль */}
          <Link to={isAuthenticated ? "/user-account" : "/sign-in"}>
            <button className="bg-[rgb(36,34,39)] text-[rgb(255,204,1)] rounded-md flex items-center justify-center h-16 w-16 text-4xl hover:opacity-80">
              <BsPersonCircle />
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Navbar;