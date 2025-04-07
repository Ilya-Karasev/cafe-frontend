import { API_BASE_URL as url } from "../config";

export const fetchMenuItems = async (category = null) => {
  try {
    let url_menu = `${url}/api/MenuItem`;
    if (category) {
      url_menu += `?category=${category}`;
    }
    const response = await fetch(url_menu);
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
