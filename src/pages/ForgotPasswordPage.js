import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../style/WebsiteBackground.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setMessage(
      "Сообщение для восстановления пароля было выслано на вашу почту."
    );
  };

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto website-background bg-black bg-opacity-30">
      <Navbar />
      <div className="flex flex-grow items-center justify-center">
        <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-[rgb(255,204,1)] mb-2">
            Восстановление пароля
          </h2>
          {message && (
            <p className="text-green-500 text-center mb-4">{message}</p>
          )}
          <form onSubmit={handleForgotPassword}>
            <div className="mb-4">
              <label
                className="block text-[rgb(255,204,1)] font-bold mb-2"
                htmlFor="email"
              >
                Введите вашу почту
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-[rgb(36,34,39)] bg-black text-[rgb(255,204,1)] rounded"
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
                className="bg-[rgb(36,34,39)] font-bold text-[rgb(255,204,1)] py-2 px-4 rounded hover:bg-[rgb(255,204,1)] hover:text-[rgb(36,34,39)] transition-colors"
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
