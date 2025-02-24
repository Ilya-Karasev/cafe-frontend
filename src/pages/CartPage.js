import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Footer from "../components/Footer";
import MenuItem from "../components/MenuItem";
import Navbar from "../components/Navbar";
import "../style/WebsiteBackground.css";

const CartPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [hoveredOrderId, setHoveredOrderId] = useState(null);
  const [orderHistoryHoveredId, setOrderHistoryHoveredId] = useState(null);
  const [ordersData, setOrdersData] = useState([
    {
      id: 1,
      items: [
        {
          id: 1,
          name: "Суп",
          price: 150,
          image:
            "https://i.pinimg.com/736x/f6/79/b2/f679b2fdeb3786b5ed3516424fdc3d17.jpg",
        },
        { id: 2, name: "Салат", price: 200, image: "url/to/image2.jpg" },
        { id: 3, name: "Суп", price: 150, image: "url/to/image1.jpg" },
        { id: 4, name: "Салат", price: 200, image: "url/to/image2.jpg" },
        { id: 5, name: "Суп", price: 150, image: "url/to/image1.jpg" },
        { id: 6, name: "Салат", price: 200, image: "url/to/image2.jpg" },
        { id: 7, name: "Суп", price: 150, image: "url/to/image1.jpg" },
        { id: 8, name: "Салат", price: 200, image: "url/to/image2.jpg" },
      ],
    },
    {
      id: 2,
      items: [
        { id: 3, name: "Пирожное", price: 100, image: "url/to/image3.jpg" },
        { id: 4, name: "Кофе", price: 120, image: "url/to/image4.jpg" },
      ],
    },
  ]);

  const [orderHistory, setOrderHistory] = useState([]);

  const handleDeleteOrder = (orderId) => {
    const orderToDelete = ordersData.find((order) => order.id === orderId);
    setOrdersData(ordersData.filter((order) => order.id !== orderId));
    setOrderHistory([...orderHistory, { ...orderToDelete, status: "Удален" }]);
  };

  return (
    <main className="flex flex-col min-h-screen overflow-y-auto website-background bg-black bg-opacity-30">
      <Navbar />
      <div className="flex flex-grow">
        {/* Список заказов слева */}
        <div className="w-1/4 p-4 border-r border-black">
          <h2 className="text-2xl mb-4 font-bold text-center text-[rgb(36,34,39)]">
            Мои Заказы
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
                <button
                  className={`ml-4 ${
                    hoveredOrderId === order.id
                      ? "text-[rgb(255,204,1)]"
                      : "text-[rgb(36,34,39)]"
                  }`}
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

          {/* История заказов */}
          <div className="mt-6 overflow-y-auto max-h-96">
            <h2 className="text-2xl mb-4 font-bold text-center text-[rgb(36,34,39)]">
              История заказов
            </h2>
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
                  <MenuItem key={item.id} item={item} />
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
