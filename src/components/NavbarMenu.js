import React from "react";
import { BsPersonCircle } from "react-icons/bs"; // Импортируем иконку человека из react-icons
import { FaSearch, FaShoppingBasket } from "react-icons/fa"; // Импортируем иконку для корзины
import { Link } from "react-router-dom"; // Импортируем Link для навигации
import logo from "../assets/logo512.jpg";

const NavbarMenu = () => {
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
          {/* Кнопка корзины с ссылкой на страницу корзины */}
          <Link to="/cart">
            <button className="bg-[rgb(36,34,39)] text-[rgb(255,204,1)] rounded-md flex items-center justify-center h-16 w-16 text-4xl hover:opacity-80 mr-10">
              <FaShoppingBasket />
            </button>
          </Link>

          {/* Кнопка входа в аккаунт с ссылкой на страницу пользователя */}
          <Link to="/sign-in">
            <button className="bg-[rgb(36,34,39)] text-[rgb(255,204,1)] rounded-md flex items-center justify-center h-16 w-16 text-4xl hover:opacity-80">
              <BsPersonCircle />
            </button>
          </Link>
        </div>
      </div>

      {/* Нижняя часть навбара - навигатор по категориям еды */}
      <div className="bg-[rgb(255,204,1)] text-[rgb(36,34,39)] w-full">
        <ul className="flex flex-wrap justify-around list-none p-0 m-0">
          <li className="cursor-pointer py-4 px-2 border-2 border-[rgb(36,34,39)] text-center flex-grow hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)]">
            <strong>Первые блюда</strong>
          </li>
          <li className="cursor-pointer py-4 px-2 border-2 border-[rgb(36,34,39)] text-center flex-grow hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)]">
            <strong>Горячее и закуски</strong>
          </li>
          <li className="cursor-pointer py-4 px-2 border-2 border-[rgb(36,34,39)] text-center flex-grow hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)]">
            <strong>Салаты</strong>
          </li>
          <li className="cursor-pointer py-4 px-2 border-2 border-[rgb(36,34,39)] text-center flex-grow hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)]">
            <strong>Десерты и выпечка</strong>
          </li>
          <li className="cursor-pointer py-4 px-2 border-2 border-[rgb(36,34,39)] text-center flex-grow hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)]">
            <strong>Напитки</strong>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default NavbarMenu;
