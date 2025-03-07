import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa"; // Галочка для выполнения заказа
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../style/WebsiteBackground.css";

const OrderProcessingPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [hoveredOrderId, setHoveredOrderId] = useState(null);
  const [ordersData, setOrdersData] = useState([
    {
      id: 1,
      status: "Новый",
      items: Array(8).fill({
        id: 1,
        name: "Суп",
        price: 150,
        image:
          "https://i.pinimg.com/736x/f6/79/b2/f679b2fdeb3786b5ed3516424fdc3d17.jpg",
      }),
    },
    {
      id: 2,
      status: "Оплачен",
      items: Array(8).fill({
        id: 1,
        name: "Суп",
        price: 150,
        image:
          "https://i.pinimg.com/736x/f6/79/b2/f679b2fdeb3786b5ed3516424fdc3d17.jpg",
      }),
    },
  ]);

  const handleCancelOrder = (orderId) => {
    const updatedOrders = ordersData.map((order) =>
      order.id === orderId ? { ...order, status: "Отменен" } : order
    );
    setOrdersData(updatedOrders);
  };

  const handleCompleteOrder = (orderId) => {
    const updatedOrders = ordersData.map((order) =>
      order.id === orderId ? { ...order, status: "Завершен" } : order
    );
    setOrdersData(updatedOrders);
  };

  return (
    <main className="flex flex-col min-h-screen overflow-y-auto website-background bg-black bg-opacity-30">
      <Navbar />
      <div className="flex flex-grow">
        {/* Список заказов слева */}
        <div className="w-1/4 p-4 border-r border-black bg-yellow-400">
          <h2 className="text-2xl mb-4 font-bold text-center text-[rgb(36,34,39)]">
            Заказы на обработку
          </h2>
          <ul className="list-none p-0">
            {ordersData.map((order) => (
              <li
                key={order.id}
                className={`cursor-pointer py-2 px-4 border-b font-bold border-[rgb(36,34,39)] 
                  ${
                    hoveredOrderId === order.id
                      ? "bg-[rgb(36,34,39)] text-[rgb(255,204,1)]"
                      : "hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)]"
                  } 
                  flex justify-between items-center`}
                onMouseEnter={() => setHoveredOrderId(order.id)}
                onMouseLeave={() => setHoveredOrderId(null)}
                onClick={() => setSelectedOrder(order)}
              >
                <span>Заказ #{order.id}</span>
                <span
                  className={`ml-2 ${
                    hoveredOrderId === order.id
                      ? "text-[rgb(255,204,1)]"
                      : "text-[rgb(36,34,39)]"
                  }`}
                >
                  ({order.status})
                </span>
                <div className="flex items-center space-x-2">
                  {/* Кнопка отмены заказа */}
                  {order.status === "Новый" && (
                    <button
                      className="text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancelOrder(order.id);
                      }}
                    >
                      <FaTimes />
                    </button>
                  )}

                  {/* Кнопка завершения заказа */}
                  {order.status === "Оплачен" && (
                    <button
                      className="text-green-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCompleteOrder(order.id);
                      }}
                    >
                      <FaCheck />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Содержимое выбранного заказа справа */}
        <div className="w-2/3 p-4">
          {selectedOrder ? (
            <div>
              <h2 className="text-2xl mb-4 font-bold text-center text-[rgb(36,34,39)]">
                Содержимое Заказа #{selectedOrder.id}
              </h2>
              <div className="flex flex-wrap mb-4">
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="w-1/4 p-2" // Обновляем ширину элемента, чтобы было 4 в строке
                  >
                    <div className="bg-[rgb(36,34,39)] p-4 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-32 object-cover mb-4 rounded"
                      />
                      <h3 className="text-lg font-semibold text-[rgb(255,204,1)]">
                        {item.name}
                      </h3>
                      <p className="text-white">Цена: {item.price}₽</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="font-bold text-center text-[rgb(36,34,39)] text-2xl">
              <p>Выберите заказ для просмотра его содержимого.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default OrderProcessingPage;
