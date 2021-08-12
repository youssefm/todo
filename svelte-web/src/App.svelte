<script lang="ts">
  import TodoList from "./TodoList.svelte";
</script>

<main>
  <h1>my todo list</h1>
  <TodoList />
</main>

<style>
  h1 {
    font-family: Roboto, sans-serif;
    font-weight: 300;
    font-size: 4rem;
    line-height: 4rem;
    letter-spacing: -0.015625em;
    margin: 20px;
    text-align: center;
  }
</style>
