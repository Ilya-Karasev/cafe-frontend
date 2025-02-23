export const fetchMenuItems = async () => {
  try {
    const response = await fetch("https://caffe-production.up.railway.app/api/MenuItem");
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    return data.menuItems || data; // Проверка структуры данных
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};