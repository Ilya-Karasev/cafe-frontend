const url = "http://localhost:5253";

// Функция для получения всех элементов меню
export const fetchMenuItems = async () => {
  try {
    const response = await fetch(`${url}/api/MenuItem`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    const sortedData = data.sort((a, b) => {
      if (a.isAvailable === b.isAvailable) {
        return a.title.localeCompare(b.title);
      }
      return a.isAvailable ? -1 : 1;
    });
    return sortedData;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};

// Функция для добавления нового блюда
export const addMenuItem = async (newDish) => {
  try {
    const response = await fetch(`${url}/api/MenuItem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDish),
    });
    if (!response.ok) throw new Error("Failed to add dish");
    return await response.json();
  } catch (error) {
    console.error("Error adding dish:", error);
    throw error;
  }
};

// Функция для обновления блюда
export const updateMenuItem = async (item) => {
  try {
    const response = await fetch(`${url}/api/MenuItem/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error("Failed to update dish");
  } catch (error) {
    console.error("Error updating dish:", error);
    throw error;
  }
};

// Функция для удаления блюда
export const deleteMenuItem = async (id) => {
  try {
    const response = await fetch(`${url}/api/MenuItem/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete dish");
  } catch (error) {
    console.error("Error deleting dish:", error);
    throw error;
  }
};
