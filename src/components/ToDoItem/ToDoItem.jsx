import s from "./ToDoItem.module.css";
import clsx from "clsx";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";

export default function ToDoItem({
  id,
  text,
  createDate,
  finishDate,
  removeToDo,
  isComplete,
  isEdit,
  completeToDo,
  editToDo,
  editInputValue,
  setEditInputValue,
  updateToDo,
  openPopup,
}) {
  return (
    <>
      {!isEdit && (
        <li className={clsx(s["todolist-item"], isComplete && s.complete)}>
          <label
            htmlFor={`${id}-switch`}
            className={clsx(
              s["todolist-item__label"],
              isComplete && s.complete
            )}
          >
            <input
              id={`${id}-switch`}
              type="checkbox"
              name="complete"
              className={clsx(s["todolist-item__complete"])}
              onChange={() => completeToDo(id)}
              checked={isComplete}
            />
          </label>
          <p className={clsx(s["todolist-item__text"])}>{text}</p>
          <button
            onClick={() =>
              openPopup({ id, text, isComplete, createDate, finishDate })
            }
            className={clsx(s["todolist-item__info"])}
          >
            <FaInfoCircle />
          </button>
          {!isComplete && (
            <button
              onClick={() => editToDo(id, text)}
              className={clsx(s["todolist-item__edit"])}
            >
              <FaEdit />
            </button>
          )}
          <button
            onClick={() => removeToDo(id)}
            className={clsx(s["todolist-item__delete"])}
          >
            <AiFillDelete />
          </button>
        </li>
      )}
      {isEdit && (
        <li className={clsx(s["todolist-item"], s.edit)}>
          <input
            className={clsx(s["todolist-edit-input"])}
            onChange={(e) => setEditInputValue(e.target.value)}
            type="text"
            value={editInputValue}
            placeholder="Please, write an updated text"
            name="edit"
          />
          <button
            className={clsx(s["todolist-edit-button"])}
            onClick={() => {
              updateToDo(id);
              // setEditInputValue("");
            }}
          >
            Updated task
          </button>
          <button
            className={clsx(s["todolist-edit-close"])}
            onClick={() => {
              editToDo(id);
              setEditInputValue("");
            }}
          >
            <IoClose />
          </button>
        </li>
      )}
    </>
  );
}
