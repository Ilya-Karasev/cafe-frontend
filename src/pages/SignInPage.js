import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../style/WebsiteBackground.css";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Загрузка сохраненных данных при монтировании
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) {
      setEmail(savedUser.email || "");
      setPassword(savedUser.password || "");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Сброс ошибки перед запросом

    try {
      const response = await fetch("https://caffe-production.up.railway.app/api/User/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Неверный логин или пароль");
      }

      const userData = await response.json();

      // Сохраняем данные в localStorage
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ email, password, ...userData })
      );

      navigate("/user-account");
    } catch (error) {
      setError("Ошибка входа. Проверьте логин и пароль.");
      console.error("Ошибка входа:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto website-background bg-black bg-opacity-30">
      <Navbar />
      <div className="flex flex-grow items-center justify-center">
        <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-[rgb(255,204,1)] mb-6">
            Вход в аккаунт
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-[rgb(255,204,1)] font-bold mb-2" htmlFor="email">
                Логин
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-[rgb(36,34,39)] bg-black text-[rgb(255,204,1)] rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-[rgb(255,204,1)] font-bold mb-2" htmlFor="password">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-[rgb(36,34,39)] bg-black text-[rgb(255,204,1)] rounded"
                required
              />
            </div>
            <div className="mb-4 text-center">
              <button type="button" className="text-[rgb(255,204,1)] hover:underline">
                Забыли логин / пароль?
              </button>
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-[rgb(36,34,39)] font-bold text-[rgb(255,204,1)] py-2 px-4 rounded hover:bg-[rgb(255,204,1)] hover:text-[rgb(36,34,39)] transition-colors"
              >
                Войти
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignInPage;
