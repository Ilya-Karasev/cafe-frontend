import { getApiUrl } from "../configs/apiConfig";

export const fetchMenuItems = async (category = null) => {
  const baseUrl = getApiUrl();
  try {
    let url = `${baseUrl}/api/MenuItem`;
    if (category) {
      url += `?category=${category}`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    const menuItems = data.menuItems || data; // Проверка структуры данных

    menuItems.sort((a, b) => a.title.localeCompare(b.title));

    return menuItems;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};