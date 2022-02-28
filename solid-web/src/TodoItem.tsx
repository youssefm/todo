import { Component, createSignal } from "solid-js";
import { TodoItemData } from "./types";
import { IoClose } from "solid-icons/io";

interface Props {
  item: TodoItemData;
  onDelete: () => void;
}

const TodoItem: Component<Props> = ({ item, onDelete }) => {
  const [isCompleted, setIsCompleted] = createSignal(item.completed);

  console.log("rendering item");

  const onCheckboxToggle = () => {
    const newIsCompleted = !isCompleted();
    fetch(`/api/todo/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...item, completed: newIsCompleted }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsCompleted(newIsCompleted);
  };

  return (
    <div class="flex w-52 items-center">
      <label class="grow">
        <input
          type="checkbox"
          checked={isCompleted()}
          onChange={onCheckboxToggle}
        />{" "}
        <span classList={{ "line-through": isCompleted() }}>{item.title}</span>
      </label>
      <IoClose
        class="inline hover:text-red-500 cursor-pointer"
        onClick={onDelete}
      />
    </div>
  );
};

export default TodoItem;
