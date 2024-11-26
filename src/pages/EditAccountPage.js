import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../style/WebsiteBackground.css";

const EditAccountPage = () => {
  const [name, setName] = useState("Иван Иванов");
  const [phone, setPhone] = useState("+7 (999) 123-45-67");
  const [email, setEmail] = useState("ivan.ivanov@example.com");
  const [profilePicture, setProfilePicture] = useState(
    "https://via.placeholder.com/512"
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Данные сохранены:", { name, phone, email, profilePicture });
  };

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto website-background bg-black bg-opacity-30">
      <Navbar />
      <div className="flex flex-grow items-center justify-center mt-12 mb-12">
        <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg w-full max-w-3xl flex">
          <div className="flex flex-col items-center mr-8">
            {/* Контейнер для фото */}
            <img
              src={profilePicture}
              alt="Profile"
              className="w-48 h-48 mb-6 rounded-xl"
            />
            <label
              className="block text-[rgb(255,204,1)] font-bold mb-2 text-center"
              htmlFor="profilePicture"
            >
              Изменить фотографию профиля
            </label>
            <input
              type="file"
              id="profilePicture"
              onChange={handleImageUpload}
              className="text-[rgb(255,204,1)]"
            />
            <Link to="/user-account" className="mt-20">
              <button className="bg-[rgb(255,204,1)] font-bold text-[rgb(36,34,39)] py-2 px-4 rounded hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)] transition-colors">
                Вернуться к профилю
              </button>
            </Link>
          </div>
          <div className="flex-grow">
            {/* Контейнер для формы */}
            <h2 className="text-3xl font-bold text-center text-[rgb(255,204,1)] mb-6">
              Редактировать профиль
            </h2>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label
                  className="block text-[rgb(255,204,1)] font-bold mb-2"
                  htmlFor="name"
                >
                  Имя
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-[rgb(36,34,39)] bg-black text-[rgb(255,204,1)] rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-[rgb(255,204,1)] font-bold mb-2"
                  htmlFor="phone"
                >
                  Телефон
                </label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 border border-[rgb(36,34,39)] bg-black text-[rgb(255,204,1)] rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-[rgb(255,204,1)] font-bold mb-2"
                  htmlFor="email"
                >
                  Почта
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-[rgb(36,34,39)] bg-black text-[rgb(255,204,1)] rounded"
                />
              </div>
              <Link to="/user-account">
                <button
                  type="submit"
                  className="w-full bg-[rgb(255,204,1)] font-bold text-[rgb(36,34,39)] py-3 px-4 rounded hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)] transition-colors"
                >
                  Сохранить изменения
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditAccountPage;
