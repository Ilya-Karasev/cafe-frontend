import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../style/WebsiteBackground.css";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "1" && password === "1") {
      navigate("/user-account");
    } else {
      setError("Неверный логин или пароль");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleCreateAccount = () => {
    navigate("/sign-up");
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
              <label
                className="block text-[rgb(255,204,1)] font-bold mb-2"
                htmlFor="username"
              >
                Логин
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-[rgb(36,34,39)] bg-black text-[rgb(255,204,1)] rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-[rgb(255,204,1)] font-bold mb-2"
                htmlFor="password"
              >
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
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[rgb(255,204,1)] hover:underline"
              >
                Забыли логин / пароль?
              </button>
            </div>
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={handleCreateAccount}
                className="text-[rgb(255,204,1)] hover:underline"
              >
                Создать аккаунт
              </button>
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
