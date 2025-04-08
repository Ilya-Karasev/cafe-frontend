import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("orderId");
  const paymentMethod = searchParams.get("paymentMethod");
  const amount = searchParams.get("amount");

  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // "success" после успешной оплаты

  const handlePaymentSuccess = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaymentStatus("success");
    }, 2000);
  };

  const handlePaymentFailure = () => {
    // При отказе оплаты сразу перенаправляем на главную страницу
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-6">
      {paymentStatus === "success" ? (
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
          <h1 className="text-4xl font-bold mb-6">Оплата успешна</h1>
          <button
            className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded font-bold"
            onClick={() => navigate("/")}
          >
            Вернуться на сайт
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-6">Тестовая платежная система</h1>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md">
            <p className="mb-2">
              <strong>Order ID:</strong> {orderId || "Не указан"}
            </p>
            <p className="mb-2">
              <strong>Способ оплаты:</strong> {paymentMethod || "Не указан"}
            </p>
            <p className="mb-4">
              <strong>Сумма:</strong> {amount ? `${amount} руб.` : "Не указана"}
            </p>
            {processing ? (
              <p className="text-xl text-center">Обработка платежа...</p>
            ) : (
              <div className="flex flex-col gap-4">
                <button
                  className="bg-green-500 hover:bg-green-600 py-2 rounded font-bold"
                  onClick={handlePaymentSuccess}
                >
                  Оплатить
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 py-2 rounded font-bold"
                  onClick={handlePaymentFailure}
                >
                  Отмена оплаты
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentPage;
