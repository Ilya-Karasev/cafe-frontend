import React, { useState, useEffect } from "react";
import { FaTimes, FaShoppingCart, FaCreditCard, FaMoneyCheckAlt } from "react-icons/fa";
import Footer from "../components/Footer";
import MenuItem from "../components/MenuItem";
import Navbar from "../components/Navbar";
import "../style/WebsiteBackground.css";
import { getApiUrl } from "../configs/apiConfig";

const CartPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [hoveredOrderId, setHoveredOrderId] = useState(null);
  const [orderHistoryHoveredId, setOrderHistoryHoveredId] = useState(null);
  const [ordersData, setOrdersData] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailableItems, setUnavailableItems] = useState([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const url = getApiUrl();

  const updateItemQuantity = (itemId, newQuantity) => {
    setOrdersData((prevOrders) => {
      return prevOrders.map((order) => {
        if (order.id === selectedOrder?.id) {
          const updatedItems = order.items
            .map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
            .filter((item) => item.quantity > 0);
          return { ...order, items: updatedItems };
        }
        return order;
      });
    });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const userData = localStorage.getItem("currentUser");
        if (!userData) return;

        const user = JSON.parse(userData);
        let orders = [];
        let history = [];
        let unavailable = [];

        // Получение текущей корзины
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

        // Запрос всех заказов пользователя
        const orderResponse = await fetch(`${url}/api/Order`);
        if (orderResponse.ok) {
          const allOrders = await orderResponse.json();
          history = allOrders
            .filter(order => order.userId === user.id)
            .map(order => ({
              id: order.id,
              items: order.items || [],
              status: order.status || "Завершен",
              number: order.orderNumber
            }));
        }

        // Получение недоступных товаров
        const menuItemsResponse = await fetch(`${url}/api/MenuItem`);
        if (menuItemsResponse.ok) {
          const menuItemsData = await menuItemsResponse.json();
          unavailable = menuItemsData.filter(item => !item.isAvailable);
        }

        setUnavailableItems(unavailable);
        setOrdersData(orders);
        setOrderHistory(history);
      } catch (error) {
        console.error("Ошибка загрузки заказов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [url]);

  const handleDeleteOrder = (orderId) => {
    const orderToDelete = ordersData.find((order) => order.id === orderId);
    setOrdersData(ordersData.filter((order) => order.id !== orderId));
    setOrderHistory([...orderHistory, { ...orderToDelete, status: "Удален" }]);
  };

  useEffect(() => {
    if (unavailableItems.length > 0 && ordersData.length > 0) {
      setOrdersData((prevOrders) => {
        return prevOrders.map((order) => {
          const updatedItems = order.items.map((item) => {
            if (unavailableItems.some((unavailableItem) => unavailableItem.id === item.id)) {
              return { ...item, isAvailable: false };
            }
            return { ...item, isAvailable: true };
          });
          return { ...order, items: updatedItems };
        });
      });
    }
  }, [unavailableItems, ordersData]);

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod) return;

    const userData = localStorage.getItem("currentUser");
    if (!userData) return;
    const user = JSON.parse(userData);
    const selectedOrderItems = selectedOrder?.items || [];
    const totalPrice = calculateTotalPrice(selectedOrderItems);

    const orderStatus = paymentMethod === "Cash" ? "Pending" : "Paid";
    console.log("Оплата:", paymentMethod, "Статус заказа:", orderStatus);

    try {
      // Создание заказа
      const orderResponse = await fetch(`${url}/api/Order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: user.cartId,
          userId: user.id,
          paymentMethod,
          status: orderStatus,
          items: selectedOrderItems,
          totalPrice,
        }),
      });

      if (!orderResponse.ok) {
        console.error("Ошибка при создании заказа");
        return;
      }

      const createdOrder = await orderResponse.json();
      const orderId = createdOrder.id;

      // Очистка корзины
      await fetch(`${url}/api/Cart/user/${user.id}/clear`, {
        method: "DELETE",
      });

      setIsPaymentModalOpen(false);

      if (paymentMethod === "Credit Card" || "FPS" ) {
        // Перенаправляем на страницу платежей.
        // Параметры передаются через query-параметры: orderId, paymentMethod и amount.
        window.location.href = `/payment?orderId=${orderId}&paymentMethod=${paymentMethod}&amount=${totalPrice}`;
      } else {
        // Для других способов оплаты сразу возвращаемся на главную страницу.
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Ошибка при оформлении заказа:", error);
    }
  };

  return (
    <main className="flex flex-col min-h-screen overflow-y-auto website-background bg-black bg-opacity-30">
      <Navbar />
      <div className="flex flex-grow">
        <div className="w-1/4 p-4 border-r border-black bg-yellow-400">
          <h2 className="text-2xl mb-4 font-bold text-center text-[rgb(36,34,39)]">
            Мой заказ
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
                  <span>Моя корзина</span>
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
                      Заказ #{order.number} ({order.status})
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Список товаров из выбранного заказа */}
        <div className="flex-grow p-4 relative">
          {selectedOrder ? (
            <div>
              <h2 className="text-2xl mb-4 font-bold text-center text-[rgb(36,34,39)]">
                Содержимое заказа
              </h2>
              <div className="flex flex-wrap">
                {selectedOrder.items.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={{ ...item, isAvailable: item.isAvailable }}
                    updateQuantity={updateItemQuantity}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="font-bold text-center text-[rgb(36,34,39)] text-2xl">
              <p>Выберите заказ для просмотра его содержимого</p>
            </div>
          )}
          {/* Кнопка оформления заказа */}
          <button
            className="absolute bottom-4 right-4 bg-yellow-400 text-gray-900 p-4 rounded-full shadow-lg hover:bg-yellow-500 transition"
            onClick={() => setIsPaymentModalOpen(true)}
          >
            <FaShoppingCart className="text-2xl" />
          </button>
        </div>

        {/* Модальное окно выбора способа оплаты */}
        {isPaymentModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-gray-700 border-2 border-yellow-400 p-6 rounded-lg shadow-lg w-80">
              {/* Кнопка закрытия модального окна */}
              <button
                className="absolute top-1 right-1 text-yellow-400 hover:text-yellow-500 transition"
                onClick={() => setIsPaymentModalOpen(false)}
              >
                <FaTimes className="text-2xl" />
              </button>

              <h2 className="text-xl font-bold text-yellow-400 mb-4 text-center">
                Выберите способ оплаты
              </h2>

              <div className="flex flex-col gap-4">
                <button
                  className={`flex items-center justify-center gap-2 p-3 rounded-md text-lg w-full
                    ${paymentMethod === "Credit Card" ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-white"}
                    hover:bg-yellow-500 transition`}
                  onClick={() => setPaymentMethod("Credit Card")}
                >
                  <FaCreditCard className="text-2xl" />
                  <span>Картой</span>
                </button>

                <button
                  className={`flex items-center justify-center gap-2 p-3 rounded-md text-lg w-full
                    ${paymentMethod === "Cash" ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-white"}
                    hover:bg-yellow-500 transition`}
                  onClick={() => setPaymentMethod("Cash")}
                >
                  <FaMoneyCheckAlt className="text-2xl" />
                  <span>Наличными</span>
                </button>

                <button
                  className={`flex items-center justify-center gap-2 p-3 rounded-md text-lg w-full
                    ${paymentMethod === "FPS" ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-white"}
                    hover:bg-yellow-500 transition`}
                  onClick={() => setPaymentMethod("FPS")}
                >
                  <FaMoneyCheckAlt className="text-2xl" />
                  <span>СПБ</span>
                </button>
              </div>

              {/* Кнопка оформления заказа */}
              <button
                className="mt-6 w-full bg-gray-900 text-yellow-400 py-2 rounded-md text-lg hover:bg-gray-800 transition"
                onClick={handlePlaceOrder}
                disabled={!paymentMethod}
              >
                Оформить заказ
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default CartPage;