import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../style/WebsiteBackground.css";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
    } else {
      setError("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto website-background bg-black bg-opacity-30">
      <Navbar />
      <div className="flex flex-grow items-center justify-center p-6">
        {" "}
        <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg w-full max-w-md">
          {" "}
          <h2 className="text-3xl font-bold text-center text-[rgb(255,204,1)] mb-6">
            Создать аккаунт
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSignUp}>
            <div className="mb-6">
              {" "}
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
                className="w-full p-3 border border-[rgb(36,34,39)] bg-black text-[rgb(255,204,1)] rounded" /* Увеличил отступы */
                required
              />
            </div>
            <div className="mb-6">
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
                required
              />
            </div>
            <div className="mb-6">
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
                className="w-full p-3 border border-[rgb(36,34,39)] bg-black text-[rgb(255,204,1)] rounded"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-[rgb(255,204,1)] font-bold mb-2"
                htmlFor="confirm-password"
              >
                Подтвердите пароль
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-[rgb(36,34,39)] bg-black text-[rgb(255,204,1)] rounded"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <Link
                to="/sign-in"
                className="text-[rgb(255,204,1)] hover:underline"
              >
                Вернуться ко входу
              </Link>
              <button
                type="submit"
                className="bg-[rgb(36,34,39)] font-bold text-[rgb(255,204,1)] py-3 px-4 rounded hover:bg-[rgb(255,204,1)] hover:text-[rgb(36,34,39)] transition-colors" /* Увеличил внутренние отступы кнопки */
              >
                Зарегистрироваться
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpPage;
