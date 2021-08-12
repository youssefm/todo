<script lang="ts">
  import { onMount } from "svelte";
  import List from "@smui/list";
  import Textfield from "@smui/textfield";

  import TodoItem from "./TodoItem.svelte";
  import type { TodoItemData } from "./types";
  import { fetchTyped } from "./util";

  let todos: TodoItemData[] = [];
  let newTodoTitle = "";

  onMount(async () => {
    todos = await fetchTyped<TodoItemData[]>("api/todo");
  });

  const handleNewTodoSubmit = async (event) => {
    const newItem = { title: newTodoTitle };
    const response = await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newTodo = await response.json();
    todos = [...todos, newTodo];
    newTodoTitle = "";
  };

  const handleDeleted = (event) => {
    todos = todos.filter((todo) => todo.id != event.detail.id);

    fetch(`/api/todo/${event.detail.id}`, { method: "DELETE" });
  };
</script>

<form on:submit|preventDefault={handleNewTodoSubmit}>
  <Textfield class="new-task" bind:value={newTodoTitle} label="New Task" />
</form>
<List>
  {#each todos as todo}
    <TodoItem {todo} on:deleted={handleDeleted} />
  {/each}
</List>

<style>
  :global(.new-task) {
    width: 95%;
    margin: 0 20px;
  }
</style>
