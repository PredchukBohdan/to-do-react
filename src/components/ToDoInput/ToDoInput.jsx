import s from "./ToDoInput.module.css";
import clsx from "clsx";

export default function ToDoInput({ addToDo, getTime }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = e.target.elements.text.value.trim();
    if (trimmedValue) {
      addToDo({
        id: crypto.randomUUID(),
        isComplete: false,
        isEdit: false,
        text: e.target.elements.text.value,
        createDate: getTime(),
        finishDate: null,
      });
    }
    e.target.reset();
  };
  return (
    <form className={clsx(s["todolist-form"])} onSubmit={handleSubmit}>
      <input
        required
        type="text"
        name="text"
        placeholder="What is the task today?"
        className={clsx(s["todolist-input"])}
      />
      <button type="submit" className={clsx(s["todolist-add-button"])}>
        Add Task
      </button>
    </form>
  );
}
