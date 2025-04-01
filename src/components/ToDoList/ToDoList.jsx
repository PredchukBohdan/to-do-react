import { useEffect, useState } from "react";
import ToDoInput from "../ToDoInput/ToDoInput";
import ToDoItem from "../ToDoItem/ToDoItem";
import ToDoPopup from "../ToDoPopup/ToDoPopup";
import s from "./toDoList.module.css";
import clsx from "clsx";

export default function ToDoList({ title }) {
  const [items, setItems] = useState(() => {
    const data = localStorage.getItem("todo-items");
    return data ? JSON.parse(data) : [];
  });

  const [editInputValue, setEditInputValue] = useState("");
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    localStorage.setItem("todo-items", JSON.stringify(items));
  }, [items]);

  function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  function addToDo(newTask) {
    setItems((prevTasks) => {
      return [...prevTasks, newTask];
    });
  }
  function removeToDo(taskId) {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id !== taskId);
    });
  }
  function completeToDo(taskId) {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        return item.id === taskId
          ? {
              ...item,
              isComplete: !item.isComplete,
              finishDate: getCurrentDateTime(),
            }
          : item;
      });
    });
  }
  function editToDo(id, text) {
    setEditInputValue(text);
    setItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === id ? { ...item, isEdit: !item.isEdit } : item
      );
    });
  }
  function updateToDo(taskId, text) {
    setItems((prevTask) => {
      return prevTask.map((item) => {
        return item.id === taskId
          ? { ...item, text: text, isEdit: !item.isEdit }
          : item;
      });
    });
  }
  function openPopup(item) {
    setActiveItem(item);
  }

  function closePopup() {
    setActiveItem(null);
  }

  return (
    <div className={clsx(s.todolist)}>
      <h1 className={clsx(s.title)}>{title}</h1>
      <ToDoInput getTime={getCurrentDateTime} addToDo={addToDo} />
      {items.length > 0 && (
        <ul className={clsx(s.items)}>
          {items.map((item) => (
            <ToDoItem
              key={item.id}
              {...item}
              removeToDo={removeToDo}
              completeToDo={completeToDo}
              editToDo={editToDo}
              editInputValue={editInputValue}
              setEditInputValue={setEditInputValue}
              updateToDo={updateToDo}
              openPopup={openPopup}
            />
          ))}
        </ul>
      )}
      {activeItem && <ToDoPopup item={activeItem} closePopup={closePopup} />}
    </div>
  );
}
