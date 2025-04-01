import s from "./ToDoItem.module.css";
import clsx from "clsx";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { useId } from "react";

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
  const completeId = useId();
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = e.target.elements.edit.value.trim();
    if (trimmedValue) updateToDo(id, trimmedValue);
  };
  return (
    <>
      {!isEdit && (
        <li className={clsx(s["todolist-item"], isComplete && s.complete)}>
          <label
            htmlFor={completeId}
            className={clsx(
              s["todolist-item__label"],
              isComplete && s.complete
            )}
          >
            <input
              id={completeId}
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
          <form className={clsx(s["todolist-form"])} onSubmit={handleSubmit}>
            <input
              className={clsx(s["todolist-edit-input"])}
              onChange={(e) => setEditInputValue(e.target.value)}
              type="text"
              required
              value={editInputValue}
              placeholder="Please, write an updated text"
              name="edit"
            />
            <button type="submit" className={clsx(s["todolist-edit-button"])}>
              Updated task
            </button>
            <button
              type="button"
              className={clsx(s["todolist-edit-close"])}
              onClick={() => {
                editToDo(id, text);
              }}
            >
              <IoClose />
            </button>
          </form>
        </li>
      )}
    </>
  );
}
