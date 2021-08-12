<script lang="ts">
  import type { TodoItemData } from "./types";

  export let todo: TodoItemData;
</script>

<div>
  <input type="checkbox" bind:checked={todo.completed} />
  {todo.title}
</div>
