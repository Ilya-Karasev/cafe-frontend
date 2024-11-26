import React from "react";
import { FaVk } from "react-icons/fa";
import pizzaLogo from "../assets/MiitPizza512.png";

const Footer = () => {
  return (
    <footer className="bg-[rgb(36,34,39)] text-[rgb(255,204,1)] flex justify-between items-center p-5 w-full">
      {/* Логотип слева */}
      <div className="footer-logo">
        <img src={pizzaLogo} alt="Cafe Logo" className="h-16" />
      </div>

      {/* Текст по центру */}
      <div className="text-center text-base">
        <p>Адрес: ул. Образцова, 9с7, Москва, 127994</p>
        <p className="mt-1">Эл. почта: pizzamiit@gmail.com</p>
      </div>

      {/* Иконка VK справа */}
      <div className="footer-social">
        <FaVk
          className="text-4xl cursor-pointer hover:opacity-80"
          style={{ color: "rgb(255, 204, 1)" }}
        />
      </div>
    </footer>
  );
};

export default Footer;
