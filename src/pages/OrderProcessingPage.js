import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../style/WebsiteBackground.css";
import {
  fetchOrders,
  cancelOrder,
  completeOrder,
  fetchOrderDetails,
} from "../services/orderService";

const OrderProcessingPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [hoveredOrderId, setHoveredOrderId] = useState(null);
  const [ordersData, setOrdersData] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState(null);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrdersData(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    loadOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    setOrderToUpdate(orderId);
    setActionType("cancel");
    setShowConfirmation(true);
  };

  const handleCompleteOrder = async (orderId) => {
    setOrderToUpdate(orderId);
    setActionType("complete");
    setShowConfirmation(true);
  };

  const handleConfirmAction = async (confirm) => {
    if (confirm && orderToUpdate && actionType) {
      try {
        if (actionType === "cancel") {
          await cancelOrder(orderToUpdate);
        } else if (actionType === "complete") {
          await completeOrder(orderToUpdate);
        }
        setOrdersData((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderToUpdate
              ? {
                  ...order,
                  status:
                    actionType === "complete" ? "Completed" : "Canceled",
                }
              : order
          )
        );
      } catch (error) {
        console.error(`Error ${actionType}ing order:`, error);
      }
    }
    setShowConfirmation(false);
    setOrderToUpdate(null);
    setActionType(null);
  };

  const statusMapping = {
    Pending: "Новый",
    Paid: "Оплачен",
    Created: "Создан",
    Completed: "Завершен",
    Canceled: "Отменен",
  };

  const paymentMethodMapping = {
    Card: "Карта",
    Cash: "Наличные",
    Online: "Онлайн",
  };

  const sortedOrders = [
    ...ordersData.filter((order) => order.status === "Paid"),
    ...ordersData.filter((order) => order.status === "Pending"),
    ...ordersData.filter((order) => order.status === "Created"),
    ...ordersData.filter((order) => order.status === "Completed"),
    ...ordersData.filter((order) => order.status === "Canceled"),
  ];

  const loadOrderDetails = async (orderId) => {
    try {
      const data = await fetchOrderDetails(orderId);
      setSelectedOrder(data);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
    }
  };

  return (
    <main className="flex flex-col min-h-screen overflow-y-auto website-background bg-black bg-opacity-30">
      <Navbar />
      <div className="flex flex-grow flex-col lg:flex-row">
        {/* Список заказов */}
        <div className="lg:w-1/4 w-full p-4 border-b lg:border-b-0 lg:border-r border-black bg-yellow-400">
          <h2 className="text-2xl mb-4 font-bold text-center text-[rgb(36,34,39)]">
            Заказы на обработку
          </h2>
          <ul className="list-none p-0">
            {sortedOrders.map((order) => (
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
                onClick={() => loadOrderDetails(order.id)}
              >
                <span>Заказ #{order.orderNumber}</span>
                <span
                  className={`ml-2 ${
                    hoveredOrderId === order.id
                      ? "text-[rgb(255,204,1)]"
                      : "text-[rgb(36,34,39)]"
                  }`}
                >
                  ({statusMapping[order.status]})
                </span>
                <div className="flex items-center space-x-2">
                  {order.status === "Pending" && (
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

                  {order.status === "Paid" && (
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

        {/* Содержимое выбранного заказа */}
        <div className="lg:w-3/4 w-full p-4">
          {selectedOrder ? (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl mb-4 font-bold text-center text-[rgb(36,34,39)]">
                Содержимое Заказа #{selectedOrder.orderNumber}
              </h2>
              <div className="flex flex-wrap mb-4">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="w-full sm:w-1/2 lg:w-1/4 p-2">
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
              <div className="bg-[rgb(36,34,39)] p-4 rounded-lg text-center">
                <h3 className="text-xl font-bold text-[rgb(255,204,1)]">
                  Информация о заказе
                </h3>
                <div className="flex flex-wrap justify-center gap-4 mt-2">
                  <span className="text-[rgb(255,204,1)]">
                    Дата:{" "}
                    {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-[rgb(255,204,1)]">
                    Тип оплаты:{" "}
                    {paymentMethodMapping[selectedOrder.paymentMethod] ||
                      selectedOrder.paymentMethod}
                  </span>
                  <span className="text-[rgb(255,204,1)]">
                    Общая стоимость: {selectedOrder.totalPrice}₽
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="font-bold text-center text-[rgb(36,34,39)] text-2xl">
              <p>Выберите заказ для просмотра его содержимого.</p>
            </div>
          )}
        </div>
      </div>

      {/* Всплывающее окно подтверждения */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgb(50,48,52)] bg-opacity-75">
          <div className="bg-[rgb(50,48,52)] text-[rgb(255,204,1)] p-4 rounded shadow-md">
            <p>
              Вы уверены, что хотите{" "}
              {actionType === "complete" ? "завершить" : "отменить"} этот
              заказ?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 bg-[rgb(50,48,52)] text-[rgb(255,204,1)] py-2 px-4 rounded hover:bg-[rgb(255,204,1)] hover:text-[rgb(50,48,52)]"
                onClick={() => handleConfirmAction(true)}
              >
                Да
              </button>
              <button
                className="bg-[rgb(50,48,52)] text-[rgb(255,204,1)] py-2 px-4 rounded hover:bg-[rgb(255,204,1)] hover:text-[rgb(50,48,52)]"
                onClick={() => handleConfirmAction(false)}
              >
                Нет
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
};

export default OrderProcessingPage;