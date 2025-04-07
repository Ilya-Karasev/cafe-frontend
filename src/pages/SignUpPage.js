import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../style/WebsiteBackground.css";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    setError("");

    const newUser = {
      name,
      email,
      password,
      phone: "1234567890", // Заглушка
      isAdmin: false, // Заглушка
      image: "default.png", // Заглушка
      isActive: true, // Заглушка
    };
    
    try {
      const response = await fetch("http://localhost:5253/api/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Ошибка при регистрации");
      }

      navigate("/sign-in");
    } catch (error) {
      setError("Ошибка регистрации. Попробуйте снова.");
      console.error("Ошибка регистрации:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto website-background bg-black bg-opacity-30">
      <Navbar />
      <div className="flex flex-grow items-center justify-center p-6">
        <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-[rgb(255,204,1)] mb-6">
            Создать аккаунт
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block text-[rgb(255,204,1)] font-bold mb-2" htmlFor="name">
                Имя
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-[rgb(36,34,39)] bg-black text-[rgb(255,204,1)] rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-[rgb(255,204,1)] font-bold mb-2" htmlFor="email">
                Почта
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
            <div className="mb-4">
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
            <div className="mb-4">
              <label className="block text-[rgb(255,204,1)] font-bold mb-2" htmlFor="confirm-password">
                Подтвердите пароль
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-[rgb(36,34,39)] bg-black text-[rgb(255,204,1)] rounded"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => navigate("/sign-in")}
                className="text-[rgb(255,204,1)] hover:underline"
              >
                Вернуться ко входу
              </button>
              <button
                type="submit"
                className="bg-[rgb(36,34,39)] font-bold text-[rgb(255,204,1)] py-2 px-4 rounded hover:bg-[rgb(255,204,1)] hover:text-[rgb(36,34,39)] transition-colors"
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