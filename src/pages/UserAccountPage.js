import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../style/WebsiteBackground.css";
import { getApiUrl } from "../configs/apiConfig";

const UserAccountPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center text-white">
        <h2 className="text-2xl font-bold">Ошибка: пользователь не найден</h2>
        <Link to="/" className="mt-4 bg-yellow-500 text-black py-2 px-4 rounded hover:bg-black hover:text-yellow-500">
          На главную
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const getUserIcon = () => {
    if (user.userIcon) {
      return `data:${user.imageType};base64,${user.userIcon}`;
    } else if (user.image) {
      return `${user.image}`;
    }
    return "https://yt3.googleusercontent.com/ytc/AIdro_nz_cQxd22UhHWPFSheene_FOQEDrI1gDYuWMfHYhg0iQ=s900-c-k-c0x00ffffff-no-rj";
  };

  const handleDeleteAccount = async () => {
    const url = getApiUrl();
    
    try {
      // Отправляем DELETE запрос для удаления пользователя
      const response = await fetch(`${url}/api/User/${user.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Успешное удаление, очищаем localStorage и перенаправляем на главную
        localStorage.removeItem("currentUser");
        navigate("/");
        alert("Ваш аккаунт был удалён.");
      } else {
        alert("Ошибка при удалении аккаунта.");
      }
    } catch (error) {
      console.error("Ошибка при удалении аккаунта:", error);
      alert("Ошибка соединения с сервером.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto website-background bg-black bg-opacity-30">
      <Navbar />
      <div className="flex flex-grow">
        <div className="w-1/4 p-4 flex flex-col items-center">
          <img
            src={getUserIcon()}
            alt="Profile"
            className="w-128 h-128 mb-4 rounded-xl"
          />
          <Link
            to="/edit-account"
            className="bg-[rgb(36,34,39)] font-bold text-[rgb(255,204,1)] py-2 px-4 rounded mb-2 hover:bg-[rgb(255,204,1)] hover:text-[rgb(36,34,39)] transition-colors duration-300 text-center"
          >
            Редактировать профиль
          </Link>
          <button
            onClick={handleLogout}
            className="bg-[rgb(36,34,39)] font-bold text-[rgb(255,204,1)] py-2 px-4 rounded mb-2 hover:bg-[rgb(255,204,1)] hover:text-[rgb(36,34,39)] transition-colors duration-300 text-center"
          >
            Выйти из аккаунта
          </button>
        </div>
        <div className="w-3/4 p-4 flex flex-col items-center justify-center">
          <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg mb-4 w-full max-w-md">
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
            <button
              onClick={handleDeleteAccount}
              className="bg-red-500 font-bold text-white py-2 px-4 rounded hover:bg-red-700 transition-colors duration-300"
            >
              Удалить аккаунт
            </button>
          </div>

          {user.isAdmin === true && (
            <div className="flex justify-between w-1/3 mt-4">
              <Link
                to="/admin-panel"
                className="bg-[rgb(36,34,39)] mr-6 font-bold text-[rgb(255,204,1)] py-2 px-4 rounded hover:bg-[rgb(255,204,1)] hover:text-[rgb(36,34,39)] transition-colors duration-300 text-center w-1/2"
              >
                Админ-панель
              </Link>
              <Link
                to="/order-panel"
                className="bg-[rgb(36,34,39)] font-bold text-[rgb(255,204,1)] py-2 px-4 rounded hover:bg-[rgb(255,204,1)] hover:text-[rgb(36,34,39)] transition-colors duration-300 text-center w-1/2"
              >
                Панель заказов
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserAccountPage;