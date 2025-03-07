export const fetchMenuItems = async (category = null) => {
  try {
    let url = "https://caffe-production.up.railway.app/api/MenuItem";
    if (category) {
      url += `?category=${category}`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    return data.menuItems || data; // Проверка структуры данных
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};
