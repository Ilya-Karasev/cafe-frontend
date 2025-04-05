import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../style/WebsiteBackground.css";
import { getApiUrl } from "../configs/apiConfig";

const OrderProcessingPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [hoveredOrderId, setHoveredOrderId] = useState(null);
  const [ordersData, setOrdersData] = useState([]);

  const url = getApiUrl(); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setOrdersData(data);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [url]);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(`${url}/${orderId}/cancel`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setOrdersData((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: "Отменен" } : order
          )
        );
      } else {
        console.error("Failed to cancel order");
      }
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      const response = await fetch(`${url}/${orderId}/complete`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setOrdersData((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: "Завершен" } : order
          )
        );
      } else {
        console.error("Failed to complete order");
      }
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  const paidOrders = ordersData.filter(order => order.status === "Оплачен");
  const otherOrders = ordersData.filter(order => order.status !== "Оплачен");

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
            {paidOrders.map((order) => (
              <li
                key={order.id}
                className={`cursor-pointer py-2 px-4 border-b font-bold border-[rgb(36,34,39)]
                  ${hoveredOrderId === order.id
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
            {otherOrders.map((order) => (
              <li
                key={order.id}
                className={`cursor-pointer py-2 px-4 border-b font-bold border-[rgb(36,34,39)]
                  ${hoveredOrderId === order.id
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
                    className="w-1/4 p-2"
                  >
                    <div className="bg-[rgb(36,34,39)] p-4 rounded-lg">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-32 object-cover mb-4 rounded"
                      />
                      <h3 className="text-lg font-semibold text-[rgb(255,204,1)]">
                        {item.title}
                      </h3>
                      <p className="text-white">Цена: {item.price}₽</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xl font-bold text-center text-[rgb(36,34,39)]">
                Общая стоимость: {selectedOrder.totalPrice}₽
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
