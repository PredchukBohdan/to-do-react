import s from "./ToDoItem.module.css";
import clsx from "clsx";
import { AiFillDelete } from "react-icons/ai";

export default function ToDoItem({
  id,
  text,
  removeToDo,
  isComplete,
  completeToDo,
}) {
  return (
    <li className={clsx(s["todolist-item"], isComplete && s.complete)}>
      <input
        type="checkbox"
        name="complete"
        className={clsx(s["todolist-item__complete"])}
        onChange={() => completeToDo(id)}
        checked={isComplete}
      />
      <p className={clsx(s["todolist-item__text"])}>{text}</p>
      <button
        onClick={() => removeToDo(id)}
        className={clsx(s["todolist-item__delete"])}
      >
        <AiFillDelete />
      </button>
    </li>
  );
}
