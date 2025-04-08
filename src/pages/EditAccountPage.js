import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../style/WebsiteBackground.css";
import { API_BASE_URL as url } from "../config";

const EditAccountPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [userIcon, setUserIcon] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData(user);
      setName(user.name || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
      setUserIcon(user.userIcon || "");
      setPassword(user.password || "");
      setNewPassword(user.password || "");
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserIcon(reader.result.split(",")[1]); // Сохраняем Base64-строку
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!userData) {
      console.error("Ошибка: пользователь не найден в localStorage");
      return;
    }

    const updatedUser = {
      id: userData.id,
      name,
      phone,
      email,
      password: newPassword || password,
      isAdmin: userData.isAdmin,
      isActive: userData.isActive,
      userIcon: userIcon || userData.userIcon, // Обновляем userIcon
    };

    try {
      console.log("Отправляемый объект:", JSON.stringify(updatedUser, null, 2));

      const response = await fetch(`${url}/api/User/${userData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedData = await response.json();

        // Если загружена новая иконка, отправляем её
        if (userIcon && userIcon !== userData.userIcon) {
          await fetch(`${url}/api/User/${userData.id}/upload-icon`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: userIcon }),
          });

          updatedData.userIcon = userIcon; // Обновляем userIcon в данных пользователя
        }

        localStorage.setItem("currentUser", JSON.stringify(updatedData));
        setUserData(updatedData);

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
            <img
              src={`data:image/png;base64,${userIcon}`} // Отображение иконки
              alt="Profile"
              className="w-48 h-48 mb-6 rounded-xl"
            />
            <label className="block text-[rgb(255,204,1)] font-bold mb-2 text-center">
              Изменить иконку профиля
            </label>
            <input type="file" onChange={handleImageUpload} className="text-[rgb(255,204,1)]" />
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