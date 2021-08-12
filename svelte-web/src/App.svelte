<script lang="ts">
  import { bind } from "svelte/internal";

  const todos = [
    {
      completed: false,
      id: 1,
      title: "eat lots of chocolate",
    },
    {
      completed: false,
      id: 2,
      title: "go to the bank",
    },
    {
      completed: true,
      id: 3,
      title: "hhmm",
    },
    {
      completed: false,
      id: 4,
      title: "hehe",
    },
    {
      completed: false,
      id: 5,
      title: "ok",
    },
  ];
</script>

<main>
  {#each todos as todo}
    <div>
      <input bind:checked={todo.completed} type="checkbox" />
      {todo.title}
    </div>
  {/each}
</main>

<style>
</style>
