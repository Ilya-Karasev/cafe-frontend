import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Footer from "../components/Footer";
import MenuItem from "../components/MenuItem";
import Navbar from "../components/Navbar";
import "../style/WebsiteBackground.css";

const url = "https://caffe-production.up.railway.app";

const CartPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [hoveredOrderId, setHoveredOrderId] = useState(null);
  const [orderHistoryHoveredId, setOrderHistoryHoveredId] = useState(null);
  const [ordersData, setOrdersData] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true); // Состояние загрузки

  const updateItemQuantity = (itemId, newQuantity) => {
    setOrdersData((prevOrders) => {
      return prevOrders.map((order) => {
        if (order.id === selectedOrder?.id) {
          const updatedItems = order.items
            .map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
            .filter((item) => item.quantity > 0); // Удаляем товар, если его количество стало 0

          return { ...order, items: updatedItems };
        }
        return order;
      });
    });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true); // Начинаем загрузку
        const userData = localStorage.getItem("currentUser");
        if (!userData) return;

        const user = JSON.parse(userData);
        let orders = [];
        let history = [];

        if (user.cartId) {
          const cartResponse = await fetch(`${url}/api/Cart/${user.cartId}`);
          if (cartResponse.ok) {
            const cartData = await cartResponse.json();
            orders.push({
              id: cartData.id,
              items: cartData.items || [],
              status: "В процессе",
            });
          }
        }

        if (user.orderIds && Array.isArray(user.orderIds)) {
          const orderPromises = user.orderIds.map(async (orderId) => {
            const orderResponse = await fetch(`${url}/api/Order/${orderId}`);
            if (orderResponse.ok) {
              const orderData = await orderResponse.json();
              return {
                id: orderData.id,
                items: orderData.items || [],
                status: "Завершен",
              };
            }
            return null;
          });
          history = (await Promise.all(orderPromises)).filter((order) => order !== null);
        }

        setOrdersData(orders);
        setOrderHistory(history);
      } catch (error) {
        console.error("Ошибка загрузки заказов:", error);
      } finally {
        setLoading(false); // Завершаем загрузку
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = (orderId) => {
    const orderToDelete = ordersData.find((order) => order.id === orderId);
    setOrdersData(ordersData.filter((order) => order.id !== orderId));
    setOrderHistory([...orderHistory, { ...orderToDelete, status: "Удален" }]);
  };

  return (
    <main className="flex flex-col min-h-screen overflow-y-auto website-background bg-black bg-opacity-30">
      <Navbar />
      <div className="flex flex-grow">
        <div className="w-1/4 p-4 border-r border-black bg-yellow-400">
          <h2 className="text-2xl mb-4 font-bold text-center text-[rgb(36,34,39)]">
            Мои Заказы
          </h2>
          {loading ? (
            <div className="flex justify-center items-center h-20">
              <div className="w-8 h-8 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <ul className="list-none p-0">
              {ordersData.map((order) => (
                <li
                  key={order.id}
                  className={`cursor-pointer py-2 px-4 border-b font-bold border-[rgb(36,34,39)] 
                    ${hoveredOrderId === order.id
                      ? "bg-[rgb(36,34,39)] text-[rgb(255,204,1)]"
                      : "hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)]"} 
                    flex justify-between items-center`}
                  onMouseEnter={() => setHoveredOrderId(order.id)}
                  onMouseLeave={() => setHoveredOrderId(null)}
                  onClick={() => setSelectedOrder(order)}
                >
                  <span>Заказ #{order.id}</span>
                  <button
                    className={`ml-4 ${hoveredOrderId === order.id ? "text-[rgb(255,204,1)]" : "text-[rgb(36,34,39)]"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteOrder(order.id);
                    }}
                  >
                    <FaTimes />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* История заказов */}
          <div className="mt-6 overflow-y-auto max-h-96">
            <h2 className="text-2xl mb-4 font-bold text-center text-[rgb(36,34,39)]">
              История заказов
            </h2>
            {loading ? (
              <div className="flex justify-center items-center h-20">
                <div className="w-8 h-8 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <ul className="list-none p-0">
                {orderHistory.map((order) => (
                  <li
                    key={order.id}
                    className={`cursor-pointer py-2 px-4 border-b font-bold border-[rgb(36,34,39)] flex justify-between items-center
                      ${
                        orderHistoryHoveredId === order.id
                          ? "bg-[rgb(36,34,39)] text-[rgb(255,204,1)]"
                          : ""
                      }
                    `}
                    onClick={() => setSelectedOrder(order)}
                    onMouseEnter={() => setOrderHistoryHoveredId(order.id)}
                    onMouseLeave={() => setOrderHistoryHoveredId(null)}
                  >
                    <span>
                      Заказ #{order.id} ({order.status})
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Список товаров из выбранного заказа справа */}
        <div className="w-2/3 p-4">
          {selectedOrder ? (
            <div>
              <h2 className="text-2xl mb-4 font-bold text-center text-[rgb(36,34,39)]">
                Содержимое Заказа #{selectedOrder.id}
              </h2>
              <div className="flex flex-wrap">
                {selectedOrder.items.map((item) => (
                  <MenuItem key={item.id} item={item} updateQuantity={updateItemQuantity} />
                ))}
              </div>
            </div>
          ) : (
            <div className="font-bold text-center text-[rgb(36,34,39)] text-2xl">
              <p>Выберите заказ для просмотра его содержимого</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CartPage;