import { useEffect, useState } from "react";
import ToDoInput from "../ToDoInput/ToDoInput";
import ToDoItem from "../ToDoItem/ToDoItem";
import s from "./toDoList.module.css";
import clsx from "clsx";

export default function ToDoList({ title }) {
  const [items, setItems] = useState(() => {
    const data = localStorage.getItem("todo-items");
    return data ? JSON.parse(data) : [];
  });

  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    setInputValue("");
    localStorage.setItem("todo-items", JSON.stringify(items));
  }, [items]);

  function addToDo() {
    if (inputValue) {
      const newToDo = {
        id: crypto.randomUUID(),
        isComplete: false,
        text: inputValue,
      };
      setItems([...items, newToDo]);
    }
  }
  function removeToDo(id) {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  }
  function completeToDo(id) {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.isComplete = !item.isComplete;
      }
      return item;
    });
    setItems(newItems);
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
            />
          ))}
        </ul>
      )}
    </div>
  );
}
