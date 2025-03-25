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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editItem, setEditItem] = useState(null);
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

  const handleAddDish = async () => {
    if (newDish.title && newDish.imageUrl && newDish.price) {
      try {
        const newItem = await addMenuItem(newDish);
        setMenuItems([...menuItems, newItem]);
        setFilteredMenuItems([...filteredMenuItems, newItem]);
        setNewDish({
          title: "",
          description: "",
          imageUrl: "",
          price: "",
          category: 1,
          isAvailable: false,
        });
      } catch (error) {
        console.error("Error adding dish:", error);
      }
    }
  };

  const handleHideDish = async (item) => {
    try {
      await updateMenuItem({ ...item, isAvailable: false });
      setMenuItems(
        menuItems.map((menuItem) =>
          menuItem.id === item.id ? { ...menuItem, isAvailable: false } : menuItem
        )
      );
      setFilteredMenuItems(
        filteredMenuItems.map((menuItem) =>
          menuItem.id === item.id ? { ...menuItem, isAvailable: false } : menuItem
        )
      );
    } catch (error) {
      console.error("Error hiding dish:", error);
    }
  };

  const handleRestoreDish = async (item) => {
    try {
      await updateMenuItem({ ...item, isAvailable: true });
      setMenuItems(
        menuItems.map((menuItem) =>
          menuItem.id === item.id ? { ...menuItem, isAvailable: true } : menuItem
        )
      );
      setFilteredMenuItems(
        filteredMenuItems.map((menuItem) =>
          menuItem.id === item.id ? { ...menuItem, isAvailable: true } : menuItem
        )
      );
    } catch (error) {
      console.error("Error restoring dish:", error);
    }
  };

  const handleEditDish = (item) => {
    setEditItem(item);
  };

  const handleSaveEdit = async () => {
    if (editItem) {
      try {
        await updateMenuItem(editItem);
        setMenuItems(
          menuItems.map((item) =>
            item.id === editItem.id ? editItem : item
          )
        );
        setFilteredMenuItems(
          filteredMenuItems.map((item) =>
            item.id === editItem.id ? editItem : item
          )
        );
        setEditItem(null);
      } catch (error) {
        console.error("Error editing dish:", error);
      }
    }
  };

  const handleDeleteDish = (id) => {
    setItemToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async (confirm) => {
    if (confirm && itemToDelete) {
      try {
        await deleteMenuItem(itemToDelete);
        setMenuItems(menuItems.filter((item) => item.id !== itemToDelete));
        setFilteredMenuItems(filteredMenuItems.filter((item) => item.id !== itemToDelete));
      } catch (error) {
        console.error("Error deleting dish:", error);
      }
    }
    setShowConfirmation(false);
    setItemToDelete(null);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === null) {
      setFilteredMenuItems(menuItems);
    } else {
      setFilteredMenuItems(menuItems.filter((item) => item.category === category));
    }
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
              onChange={(e) => editItem ? setEditItem({ ...editItem, title: e.target.value }) : setNewDish({ ...newDish, title: e.target.value })}
              className="p-2 rounded text-[rgb(36,34,39)] border border-[rgb(255,204,1)]"
            />
            <textarea
              placeholder="Описание"
              value={editItem ? editItem.description : newDish.description}
              onChange={(e) => editItem ? setEditItem({ ...editItem, description: e.target.value }) : setNewDish({ ...newDish, description: e.target.value })}
              className="p-2 rounded text-[rgb(36,34,39)] border border-[rgb(255,204,1)]"
            />
            <input
              type="text"
              placeholder="URL картинки"
              value={editItem ? editItem.imageUrl : newDish.imageUrl}
              onChange={(e) => editItem ? setEditItem({ ...editItem, imageUrl: e.target.value }) : setNewDish({ ...newDish, imageUrl: e.target.value })}
              className="p-2 rounded text-[rgb(36,34,39)] border border-[rgb(255,204,1)]"
            />
            <input
              type="number"
              placeholder="Цена"
              value={editItem ? editItem.price : newDish.price}
              onChange={(e) => editItem ? setEditItem({ ...editItem, price: e.target.value }) : setNewDish({ ...newDish, price: e.target.value })}
              className="p-2 rounded text-[rgb(36,34,39)] border border-[rgb(255,204,1)]"
            />
            <select
              value={editItem ? editItem.category : newDish.category}
              onChange={(e) => editItem ? setEditItem({ ...editItem, category: Number(e.target.value) }) : setNewDish({ ...newDish, category: Number(e.target.value) })}
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
              onClick={editItem ? handleSaveEdit : handleAddDish}
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
            <button
              className={`py-2 px-4 rounded ${selectedCategory === null ? "bg-[rgb(255,204,1)] text-[rgb(50,48,52)]" : "bg-[rgb(50,48,52)] text-[rgb(255,204,1)]"}`}
              onClick={() => handleCategoryFilter(null)}
            >
              Все
            </button>
            <button
              className={`py-2 px-4 rounded ${selectedCategory === 1 ? "bg-[rgb(255,204,1)] text-[rgb(50,48,52)]" : "bg-[rgb(50,48,52)] text-[rgb(255,204,1)]"}`}
              onClick={() => handleCategoryFilter(1)}
            >
              Основные блюда
            </button>
            <button
              className={`py-2 px-4 rounded ${selectedCategory === 2 ? "bg-[rgb(255,204,1)] text-[rgb(50,48,52)]" : "bg-[rgb(50,48,52)] text-[rgb(255,204,1)]"}`}
              onClick={() => handleCategoryFilter(2)}
            >
              Закуски
            </button>
            <button
              className={`py-2 px-4 rounded ${selectedCategory === 3 ? "bg-[rgb(255,204,1)] text-[rgb(50,48,52)]" : "bg-[rgb(50,48,52)] text-[rgb(255,204,1)]"}`}
              onClick={() => handleCategoryFilter(3)}
            >
              Супы
            </button>
            <button
              className={`py-2 px-4 rounded ${selectedCategory === 4 ? "bg-[rgb(255,204,1)] text-[rgb(50,48,52)]" : "bg-[rgb(50,48,52)] text-[rgb(255,204,1)]"}`}
              onClick={() => handleCategoryFilter(4)}
            >
              Салаты
            </button>
            <button
              className={`py-2 px-4 rounded ${selectedCategory === 5 ? "bg-[rgb(255,204,1)] text-[rgb(50,48,52)]" : "bg-[rgb(50,48,52)] text-[rgb(255,204,1)]"}`}
              onClick={() => handleCategoryFilter(5)}
            >
              Десерты
            </button>
            <button
              className={`py-2 px-4 rounded ${selectedCategory === 6 ? "bg-[rgb(255,204,1)] text-[rgb(50,48,52)]" : "bg-[rgb(50,48,52)] text-[rgb(255,204,1)]"}`}
              onClick={() => handleCategoryFilter(6)}
            >
              Напитки
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredMenuItems.map((item) => (
              <AdminMenuItem
                key={item.id}
                item={item}
                onHide={handleHideDish}
                onRestore={handleRestoreDish}
                onEdit={handleEditDish}
                onDelete={handleDeleteDish}
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
                    onClick={() => handleConfirmDelete(true)}
                  >
                    Да
                  </button>
                  <button
                    className="bg-[rgb(50,48,52)] text-[rgb(255,204,1)] py-2 px-4 rounded hover:bg-[rgb(255,204,1)] hover:text-[rgb(50,48,52)]"
                    onClick={() => handleConfirmDelete(false)}
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