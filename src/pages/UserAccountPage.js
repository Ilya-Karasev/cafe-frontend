import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../style/WebsiteBackground.css";

const UserAccountPage = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-y-auto website-background bg-black bg-opacity-30">
      <Navbar />
      <div className="flex flex-grow">
        {/* Левая часть с фотографией профиля и кнопками */}
        <div className="w-1/4 p-4 flex flex-col items-center">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-128 h-128 mb-4 rounded-xl"
          />
          <Link
            to="/edit-account"
            className="bg-[rgb(36,34,39)] font-bold text-[rgb(255,204,1)] py-2 px-4 rounded mb-2 hover:bg-[rgb(255,204,1)] hover:text-[rgb(36,34,39)] transition-colors duration-300 text-center"
          >
            Редактировать профиль
          </Link>
          <Link
            to="/"
            className="bg-[rgb(36,34,39)] font-bold text-[rgb(255,204,1)] py-2 px-4 rounded mb-2 hover:bg-[rgb(255,204,1)] hover:text-[rgb(36,34,39)] transition-colors duration-300 text-center"
          >
            Выйти из аккаунта
          </Link>
        </div>

        {/* Правая часть с информацией о пользователе */}
        <div className="w-3/4 p-4 flex items-start justify-center">
          <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4 font-bold text-white">
              Информация о пользователе
            </h2>
            <p className="mb-2 text-white">
              <strong>Имя:</strong> {user.name}
            </p>
            <p className="mb-2 text-white">
              <strong>Телефон:</strong> {user.phone}
            </p>
            <p className="mb-4 text-white">
              <strong>Почта:</strong> {user.email}
            </p>
            <button className="bg-yellow-500 font-bold text-black py-2 px-4 rounded hover:bg-black hover:text-yellow-500 transition-colors duration-300">
              Удалить аккаунт
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserAccountPage;

const user = {
  name: "Иван1 Иванов",
  phone: "+7 (999) 123-45-67",
  email: "ivan.ivanov@example.com",
  profilePicture: "https://via.placeholder.com/512",
};