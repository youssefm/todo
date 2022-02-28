import { Component } from "solid-js";
import TodoList from "./TodoList";

const App: Component = () => {
  return (
    <div>
      <h1 class="text-center text-2xl">my todo list</h1>
      <TodoList />
    </div>
  );
};

export default App;
