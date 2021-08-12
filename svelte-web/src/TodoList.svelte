<script lang="ts">
  import { onMount } from "svelte";

  import TodoItem from "./TodoItem.svelte";
  import type { TodoItemData } from "./types";
  import { fetchTyped } from "./util";

  let todos: TodoItemData[] = [];

  onMount(async () => {
    todos = await fetchTyped<TodoItemData[]>("api/todo");
  });
</script>

{#each todos as todo}
  <TodoItem {todo} />
{/each}

<style>
</style>
