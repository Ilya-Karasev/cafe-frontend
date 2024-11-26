export const fetchMenuItems = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/menu-items");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data; // Возвращаем данные, полученные с сервера
    } catch (error) {
      console.error("Error fetching menu items:", error);
      throw error; // Бросаем ошибку, чтобы она была обработана в компоненте
    }
  };
  