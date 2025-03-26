import s from "./ToDoInput.module.css";
import clsx from "clsx";

export default function ToDoInput({ addToDo, setInputValue, inputValue }) {
  return (
    <div className={clsx(s["todolist-form"])}>
      <input
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        type="text"
        placeholder="What is the task today?"
        className={clsx(s["todolist-input"])}
      />
      <button
        type="button"
        onClick={addToDo}
        className={clsx(s["todolist-add-button"])}
      >
        Add Task
      </button>
    </div>
  );
}
