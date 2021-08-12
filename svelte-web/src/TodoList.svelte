<script lang="ts">
  import { onMount } from "svelte";
  import List from "@smui/list";

  import TodoItem from "./TodoItem.svelte";
  import type { TodoItemData } from "./types";
  import { fetchTyped } from "./util";

  let todos: TodoItemData[] = [];

  onMount(async () => {
    todos = await fetchTyped<TodoItemData[]>("api/todo");
  });

  const handleDeleted = (event) => {
    todos = todos.filter((todo) => todo.id != event.detail.id);

    fetch(`/api/todo/${event.detail.id}`, { method: "DELETE" });
  };
</script>

<List>
  {#each todos as todo}
    <TodoItem {todo} on:deleted={handleDeleted} />
  {/each}
</List>

<style>
</style>
