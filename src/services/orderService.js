import { getApiUrl } from "../configs/apiConfig";

// Функция для получения всех заказов
export const fetchOrders = async () => {
  const url = getApiUrl();
  try {
    const response = await fetch(`${url}/api/Order`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Функция для отмены заказа
export const cancelOrder = async (orderId) => {
  const url = getApiUrl();
  try {
    const response = await fetch(`${url}/api/Order/${orderId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Canceled" }),
    });
    if (!response.ok) throw new Error("Failed to cancel order");
  } catch (error) {
    console.error("Error canceling order:", error);
    throw error;
  }
};

// Функция для завершения заказа
export const completeOrder = async (orderId) => {
  const url = getApiUrl();
  try {
    const response = await fetch(`${url}/api/Order/${orderId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Completed" }),
    });
    if (!response.ok) throw new Error("Failed to complete order");
  } catch (error) {
    console.error("Error completing order:", error);
    throw error;
  }
};

// Функция для получения информации о заказе
export const fetchOrderDetails = async (orderId) => {
  const url = getApiUrl();
  try {
    const response = await fetch(`${url}/api/Order/${orderId}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

// Функция для установки статуса "Оплачен"
export const markOrderAsPaid = async (orderId) => {
  const url = getApiUrl();
  try {
    const response = await fetch(`${url}/api/Order/${orderId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Paid" }),
    });
    if (!response.ok) throw new Error("Failed to mark order as paid");
  } catch (error) {
    console.error("Error marking order as paid:", error);
    throw error;
  }
};