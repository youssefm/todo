<script lang="ts">
  import type { TodoItemData } from "./types";

  export let todo: TodoItemData;

  const handleToggle = () => {
    todo = { ...todo, completed: !todo.completed };

    fetch(`/api/todo/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
</script>

<div on:click={handleToggle}>
  <input type="checkbox" checked={todo.completed} />
  {todo.title}
</div>
