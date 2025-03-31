import s from "./ToDoPopup.module.css";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";

export default function ToDoPopup({ item, closePopup }) {
  return (
    <div className={clsx(s.overlay, s.active)} onClick={closePopup}>
      <div
        className={clsx(s.popup, s.active)}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={clsx(s["popup-close__btn"])} onClick={closePopup}>
          <IoClose />
        </button>
        <h2 className={clsx(s["popup-title"])}>Task Info</h2>
        <p className={clsx(s["popup-text"])}>{item.text}</p>
        <p>
          <b>Created at:</b> {item.createDate}
        </p>
        <p>
          <b>Status:</b> {item.isComplete ? "Done" : "In process"}
        </p>
        {item.isComplete && (
          <p>
            <b>Finished at:</b> {item.finishDate}
          </p>
        )}
      </div>
    </div>
  );
}
