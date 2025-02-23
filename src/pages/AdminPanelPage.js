import React, { useState } from "react";
import AdminMenuItem from "../components/AdminMenuItem";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../style/WebsiteBackground.css";

const AdminPanelPage = () => {
  const [categories, setCategories] = useState([
    "Первые блюда",
    "Горячее и закуски",
    "Салаты",
    "Десерты и выпечка",
    "Напитки",
  ]);

  const [newCategory, setNewCategory] = useState("");
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Шоколадный маффин",
      image:
        "https://i.pinimg.com/originals/44/93/72/449372bc56931eea21dc63929649695e.jpg",
      price: 69,
      visible: true,
    },
    {
      id: 2,
      name: "Шоколадный маффин",
      image:
        "https://i.pinimg.com/originals/44/93/72/449372bc56931eea21dc63929649695e.jpg",
      price: 65,
      visible: false,
    },
    {
      id: 3,
      name: "Шоколадный маффин",
      image:
        "https://i.pinimg.com/originals/44/93/72/449372bc56931eea21dc63929649695e.jpg",
      price: 75,
      visible: true,
    },
    {
      id: 4,
      name: "Шоколадный маффин",
      image:
        "https://i.pinimg.com/originals/44/93/72/449372bc56931eea21dc63929649695e.jpg",
      price: 75,
      visible: true,
    },
    {
      id: 5,
      name: "Шоколадный маффин",
      image:
        "https://i.pinimg.com/originals/44/93/72/449372bc56931eea21dc63929649695e.jpg",
      price: 75,
      visible: true,
    },
  ]);

  const [newDish, setNewDish] = useState({ name: "", image: "", price: "" });
  const [changesSaved, setChangesSaved] = useState(false);

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (category) => {
    setCategories(categories.filter((cat) => cat !== category));
  };

  const handleAddDish = () => {
    if (newDish.name && newDish.image && newDish.price) {
      setMenuItems([
        ...menuItems,
        { ...newDish, id: Date.now(), visible: true },
      ]);
      setNewDish({ name: "", image: "", price: "" });
    }
  };

  const handleDeleteDish = (id) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, visible: false } : item
      )
    );
  };

  const handleRestoreDish = (id) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, visible: true } : item
      )
    );
  };

  const handleRemoveDish = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id)); // Удаляем блюдо из меню
  };

  const handleSaveChanges = () => {
    setChangesSaved(true);
    setTimeout(() => setChangesSaved(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto website-background bg-black bg-opacity-30">
      <Navbar />
      <div className="flex flex-grow">
        <div className="w-1/4 bg-[rgb(50,48,52)] text-[rgb(255,204,1)] p-4">
          <h2 className="text-xl font-bold mb-4 text-center">Категории еды</h2>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-[rgb(255,204,1)] text-[rgb(36,34,39)] py-2 px-4 rounded hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)] cursor-pointer"
              >
                <span>{category}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteCategory(category)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-1">
            {" "}
            {/* уменьшен gap между элементами */}
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Новая категория"
              className="flex-grow p-2 rounded text-[rgb(36,34,39)] border border-[rgb(255,204,1)]"
            />
            <button
              className="bg-[rgb(255,204,1)] text-[rgb(36,34,39)] py-2 px-4 rounded hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)] transition-colors duration-300"
              onClick={handleAddCategory}
            >
              Добавить
            </button>
          </div>
          <button
            className="mt-10 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300"
            onClick={handleSaveChanges}
          >
            Сохранить изменения
          </button>
          {changesSaved && (
            <div className="mt-4 text-green-400 font-bold">
              Изменения сохранены!
            </div>
          )}
        </div>

        <div className="w-3/4 p-6">
          <h2 className="text-center text-2xl font-bold text-[rgb(255,204,1)] mb-6">
            Меню управления
          </h2>
          <div className="flex gap-1 mb-4">
            {" "}
            {/* уменьшен gap между полями */}
            <input
              type="text"
              placeholder="Название блюда"
              value={newDish.name}
              onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
              className="p-2 flex-grow border rounded"
            />
            <input
              type="text"
              placeholder="URL картинки"
              value={newDish.image}
              onChange={(e) =>
                setNewDish({ ...newDish, image: e.target.value })
              }
              className="p-2 flex-grow border rounded"
            />
            <input
              type="number"
              placeholder="Цена"
              value={newDish.price}
              onChange={(e) =>
                setNewDish({ ...newDish, price: e.target.value })
              }
              className="p-2 flex-grow border rounded"
            />
            <button
              className="bg-[rgb(255,204,1)] text-[rgb(36,34,39)] py-2 px-4 rounded hover:bg-[rgb(36,34,39)] hover:text-[rgb(255,204,1)]"
              onClick={handleAddDish}
            >
              Добавить блюдо
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`relative ${!item.visible ? "opacity-50" : ""}`}
              >
                <AdminMenuItem item={item} />
                <div className="flex mt-2 gap-6">
                  {" "}
                  {item.visible ? (
                    <button
                      className="text-xs text-red-500 bg-white py-1 px-2 rounded-full hover:bg-red-500 hover:text-white"
                      onClick={() => handleDeleteDish(item.id)}
                    >
                      Убрать из меню
                    </button>
                  ) : (
                    <button
                      className="text-xs bg-green-500 text-white py-1 px-2 rounded-full hover:bg-green-700"
                      onClick={() => handleRestoreDish(item.id)}
                    >
                      Восстановить
                    </button>
                  )}
                  <button
                    className="text-xs text-red-500 bg-white py-1 px-2 rounded-full hover:bg-red-500 hover:text-white"
                    onClick={() => handleRemoveDish(item.id)} // Новый обработчик для удаления
                  >
                    Удалить блюдо
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanelPage;
