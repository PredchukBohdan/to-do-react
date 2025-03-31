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

  const [inputValue, setInputValue] = useState("");
  const [editInputValue, setEditInputValue] = useState("");
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    setInputValue("");
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
  function addToDo() {
    if (inputValue) {
      const newToDo = {
        id: crypto.randomUUID(),
        isComplete: false,
        isEdit: false,
        text: inputValue,
        createDate: getCurrentDateTime(),
        finishDate: null,
      };
      setItems([...items, newToDo]);
    }
  }
  function removeToDo(id) {
    setItems(items.filter((item) => item.id !== id));
  }
  function completeToDo(id) {
    setItems(
      items.map((item) => {
        return item.id === id
          ? {
              ...item,
              isComplete: !item.isComplete,
              finishDate: getCurrentDateTime(),
            }
          : item;
      })
    );
  }
  function editToDo(id, text) {
    setEditInputValue(text);
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isEdit: !item.isEdit } : item
      )
    );
  }
  function updateToDo(id) {
    setItems(
      items.map((item) => {
        return item.id === id
          ? { ...item, text: editInputValue, isEdit: !item.isEdit }
          : item;
      })
    );
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
      <ToDoInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        addToDo={addToDo}
      />
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
