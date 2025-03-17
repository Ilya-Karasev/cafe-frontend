import React, { useEffect, useState } from "react";
import AdminMenuItem from "../components/AdminMenuItem";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { fetchMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } from "../services/adminService";
import "../style/WebsiteBackground.css";

const AdminPanelPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [newDish, setNewDish] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: "",
    category: 1,
    isAvailable: false,
  });
  const [editItem, setEditItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const data = await fetchMenuItems();
        setMenuItems(data);
        setFilteredMenuItems(data);
      } catch (error) {
        console.error("Failed to load menu items:", error);
      }
    };
    loadMenuItems();
  }, []);

  const handleSave = async (item, isNew = false) => {
    try {
      const savedItem = isNew ? await addMenuItem(item) : await updateMenuItem(item);
      setMenuItems((prev) =>
        isNew ? [...prev, savedItem] : prev.map((i) => (i.id === savedItem.id ? savedItem : i))
      );
      setFilteredMenuItems((prev) =>
        isNew ? [...prev, savedItem] : prev.map((i) => (i.id === savedItem.id ? savedItem : i))
      );
      if (isNew) setNewDish({ title: "", description: "", imageUrl: "", price: "", category: 1, isAvailable: false });
      else setEditItem(null);
    } catch (error) {
      console.error(`Error ${isNew ? "adding" : "updating"} dish:`, error);
    }
  };

  const handleToggleAvailability = async (item, isAvailable) => {
    try {
      const updatedItem = await updateMenuItem({ ...item, isAvailable });
      setMenuItems((prev) => prev.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
      setFilteredMenuItems((prev) => prev.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
    } catch (error) {
      console.error(`Error ${isAvailable ? "restoring" : "hiding"} dish:`, error);
    }
  };

  const handleDelete = async (confirm) => {
    if (confirm && itemToDelete) {
      try {
        await deleteMenuItem(itemToDelete);
        setMenuItems((prev) => prev.filter((item) => item.id !== itemToDelete));
        setFilteredMenuItems((prev) => prev.filter((item) => item.id !== itemToDelete));
      } catch (error) {
        console.error("Error deleting dish:", error);
      }
    }
    setShowConfirmation(false);
    setItemToDelete(null);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setFilteredMenuItems(category === null ? menuItems : menuItems.filter((item) => item.category === category));
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    editItem ? setEditItem((prev) => ({ ...prev, [field]: value })) : setNewDish((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto website-background bg-black bg-opacity-30">
      <Navbar />
      <div className="flex flex-grow">
        <div className="w-1/4 bg-[rgb(50,48,52)] text-[rgb(255,204,1)] p-4">
          <h2 className="text-xl font-bold mb-4 text-center">
            {editItem ? "Редактировать блюдо" : "Добавить блюдо"}
          </h2>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Название блюда"
              value={editItem ? editItem.title : newDish.title}
              onChange={handleInputChange("title")}
              className="p-2 rounded text-[rgb(36,34,39)] border border-[rgb(255,204,1)]"
            />
            <textarea
              placeholder="Описание"
              value={editItem ? editItem.description : newDish.description}
              onChange={handleInputChange("description")}
              className="p-2 rounded text-[rgb(36,34,39)] border border-[rgb(255,204,1)]"
            />
            <input
              type="text"
              placeholder="URL картинки"
              value={editItem ? editItem.imageUrl : newDish.imageUrl}
              onChange={handleInputChange("imageUrl")}
              className="p-2 rounded text-[rgb(36,34,39)] border border-[rgb(255,204,1)]"
            />
            <input
              type="number"
              placeholder="Цена"
              value={editItem ? editItem.price : newDish.price}
              onChange={handleInputChange("price")}
              className="p-2 rounded text-[rgb(36,34,39)] border border-[rgb(255,204,1)]"
            />
            <select
              value={editItem ? editItem.category : newDish.category}
              onChange={(e) => handleInputChange("category")(e)}
              className="p-2 rounded text-[rgb(36,34,39)] border border-[rgb(255,204,1)]"
            >
              <option value={1}>Основные блюда</option>
              <option value={2}>Закуски</option>
              <option value={3}>Супы</option>
              <option value={4}>Салаты</option>
              <option value={5}>Десерты</option>
              <option value={6}>Напитки</option>
            </select>
            <button
              className="bg-[rgb(255,204,1)] text-[rgb(50,48,52)] py-2 px-4 rounded hover:bg-[rgb(50,48,52)] hover:text-[rgb(255,204,1)] transition-colors duration-300"
              onClick={() => handleSave(editItem || newDish, !editItem)}
            >
              {editItem ? "Сохранить изменения" : "Добавить блюдо"}
            </button>
            {editItem && (
              <button
                className="mt-2 bg-[rgb(50,48,52)] text-[rgb(255,204,1)] py-2 px-4 rounded hover:bg-[rgb(255,204,1)] hover:text-[rgb(50,48,52)]"
                onClick={() => setEditItem(null)}
              >
                Отмена
              </button>
            )}
          </div>
        </div>

        <div className="w-3/4 p-6">
          <h2 className="text-center text-2xl font-bold text-[rgb(36,34,39)] mb-6">
            Меню управления
          </h2>
          <div className="font-bold flex justify-center gap-2 mb-4">
            {[null, 1, 2, 3, 4, 5, 6].map((category) => (
              <button
                key={category}
                className={`py-2 px-4 rounded ${selectedCategory === category ? "bg-[rgb(255,204,1)] text-[rgb(50,48,52)]" : "bg-[rgb(50,48,52)] text-[rgb(255,204,1)]"}`}
                onClick={() => handleCategoryFilter(category)}
              >
                {category === null ? "Все" : ["Основные блюда", "Закуски", "Супы", "Салаты", "Десерты", "Напитки"][category - 1]}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredMenuItems.map((item) => (
              <AdminMenuItem
                key={item.id}
                item={item}
                onHide={() => handleToggleAvailability(item, false)}
                onRestore={() => handleToggleAvailability(item, true)}
                onEdit={() => setEditItem(item)}
                onDelete={() => {
                  setItemToDelete(item.id);
                  setShowConfirmation(true);
                }}
              />
            ))}
          </div>
          {showConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-[rgb(50,48,52)] bg-opacity-75">
              <div className="bg-[rgb(50,48,52)] text-[rgb(255,204,1)] p-4 rounded shadow-md">
                <p>Вы уверены, что хотите удалить этот объект?</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="mr-2 bg-[rgb(50,48,52)] text-[rgb(255,204,1)] py-2 px-4 rounded hover:bg-[rgb(255,204,1)] hover:text-[rgb(50,48,52)]"
                    onClick={() => handleDelete(true)}
                  >
                    Да
                  </button>
                  <button
                    className="bg-[rgb(50,48,52)] text-[rgb(255,204,1)] py-2 px-4 rounded hover:bg-[rgb(255,204,1)] hover:text-[rgb(50,48,52)]"
                    onClick={() => handleDelete(false)}
                  >
                    Нет
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanelPage;
