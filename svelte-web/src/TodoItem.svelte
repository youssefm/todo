<script lang="ts">
  import Checkbox from "@smui/checkbox";
  import { Item, Graphic, Meta, Label } from "@smui/list";

  import type { TodoItemData } from "./types";
  import { createEventDispatcher } from "svelte";

  export let todo: TodoItemData;
  const dispatch = createEventDispatcher();

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

<Item on:click={handleToggle}>
  <Checkbox checked={todo.completed} />
  <span class:completed={todo.completed}>
    <Label>{todo.title}</Label>
  </span>
  <Meta>
    <span on:click|stopPropagation={() => dispatch("deleted", { id: todo.id })}>
      <Graphic class="material-icons">delete</Graphic>
    </span>
  </Meta>
</Item>

<style>
  .completed {
    text-decoration: line-through;
  }

  :global(.material-icons) {
    color: #b71c1c;
  }

  :global(.material-icons):hover {
    color: #921616;
  }
</style>
