import { Component, createEffect, createSignal, For } from "solid-js";
import { createStore, produce } from "solid-js/store";
import TodoItem from "./TodoItem";
import { TodoItemData } from "./types";
import { fetchTyped } from "./util";

const TodoList: Component = () => {
  const [store, setStore] = createStore({ todos: [] });
  const [newItemTitle, setNewItemTitle] = createSignal("");

  createEffect(async () => {
    setStore({ todos: await fetchTyped<TodoItemData[]>("api/todo") });
  });

  const onNewTodoItemSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({ title: newItemTitle() }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newTodo = await response.json();
    setNewItemTitle("");
    setStore("todos", [...store.todos, newTodo]);
  };

  const onDelete = async (id) => {
    setStore(
      "todos",
      store.todos.filter((item) => item.id != id)
    );
    fetch(`/api/todo/${id}`, { method: "DELETE" });
  };

  return (
    <div>
      <form onSubmit={onNewTodoItemSubmit}>
        <input
          value={newItemTitle()}
          onChange={(event) => setNewItemTitle(event.currentTarget.value)}
          class="border border-neutral-400"
        />
      </form>
      <For each={store.todos}>
        {(item) => <TodoItem item={item} onDelete={() => onDelete(item.id)} />}
      </For>
    </div>
  );
};

export default TodoList;
