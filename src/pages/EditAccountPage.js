import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../style/WebsiteBackground.css";
import { getApiUrl } from "../configs/apiConfig";

const EditAccountPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [userIcon, setUserIcon] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();
  const imageRef = useRef(null);

  const url = getApiUrl();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData(user);
      setName(user.name || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
      // Подставляем в поле ввода всю строку фото из базы данных
      setUserIcon(user.image || "");
      setImagePreview(user.image || "");
      setPassword(user.password || "");
      setNewPassword(user.password || "");
    }
  }, []);

  const isValidImageUrl = (url) => /\.(jpeg|jpg|png)$/i.test(url);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\d{10,15}$/.test(phone); // от 10 до 15 цифр

  const handleImageDrop = (e) => {
    e.preventDefault();
    const textData = e.dataTransfer.getData("text");
    if (isValidImageUrl(textData)) {
      setUserIcon(textData);
      setImagePreview(textData);
    } else {
      alert("Пожалуйста, вставьте корректную ссылку на изображение (.png/.jpg)");
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSave = async (e) => {
    e.preventDefault();

    if (!userData) {
      console.error("Ошибка: пользователь не найден");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Введите корректный email");
      return;
    }

    if (!isValidPhone(phone)) {
      alert("Введите корректный номер телефона (только цифры, от 10 до 15 символов)");
      return;
    }

    if (userIcon && !isValidImageUrl(userIcon)) {
      alert("Ссылка на изображение должна заканчиваться на .png или .jpg");
      return;
    }

    const updatedUser = {
      name,
      phone,
      email,
      password: newPassword || password,
      // Отправляем то, что есть в поле ввода. Если поле пустое, берем старую ссылку.
      image: userIcon || userData.image,
      isAdmin: userData.isAdmin,
      isActive: userData.isActive,
    };

    try {
      const response = await fetch(`${url}/api/User/${userData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedData = await response.json();
        // Если после обновления в ответе нет поля image, устанавливаем его по значению отправленного объекта.
        if (!updatedData.image) {
          updatedData.image = updatedUser.image;
        }
        localStorage.setItem("currentUser", JSON.stringify({ ...updatedData, id: userData.id }));
        alert("Данные успешно обновлены!");
        navigate("/user-account");
      } else {
        alert("Ошибка при обновлении данных");
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      alert("Ошибка соединения с сервером");
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto website-background bg-black bg-opacity-30">
      <Navbar />
      <div className="flex flex-grow items-center justify-center mt-6 mb-10">
        <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg w-full max-w-3xl flex">
          <div className="flex flex-col items-center mr-8">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-48 h-48 mb-6 rounded-xl object-cover"
              />
            )}
            <label className="block text-[rgb(255,204,1)] font-bold mb-2 text-center">
              Ссылка на иконку профиля (.png / .jpg)
            </label>
            <input
              type="text"
              value={userIcon}
              ref={imageRef}
              onChange={(e) => {
                setUserIcon(e.target.value);
                if (isValidImageUrl(e.target.value)) {
                  setImagePreview(e.target.value);
                }
              }}
              onDrop={handleImageDrop}
              onDragOver={handleDragOver}
              className="w-full p-2 mb-6 border border-[rgb(36,34,39)] bg-black text-[rgb(255,204,1)] rounded"
              placeholder="https://image.com/image.png"
            />
            <Link to="/user-account" className="mt-20">
              <button className="bg-[rgb(255,204,1)] font-bold text-[rgb(36,34,39)] py-2 px-4 rounded hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)] transition-colors">
                Вернуться к профилю
              </button>
            </Link>
          </div>
          <div className="flex-grow">
            <h2 className="text-3xl font-bold text-center text-[rgb(255,204,1)] mb-6">
              Редактировать профиль
            </h2>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="block text-[rgb(255,204,1)] font-bold mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-[rgb(36,34,39)] bg-black text-[rgb(255,204,1)] rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[rgb(255,204,1)] font-bold mb-2">
                  Телефон
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 border border-[rgb(36,34,39)] bg-black text-[rgb(255,204,1)] rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[rgb(255,204,1)] font-bold mb-2">
                  Почта
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-[rgb(36,34,39)] bg-black text-[rgb(255,204,1)] rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[rgb(255,204,1)] font-bold mb-2">
                  Пароль
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-[rgb(36,34,39)] bg-black text-[rgb(255,204,1)] rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[rgb(255,204,1)] font-bold text-[rgb(36,34,39)] py-3 px-4 rounded hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)] transition-colors"
              >
                Сохранить изменения
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditAccountPage;
