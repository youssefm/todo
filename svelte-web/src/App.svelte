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
    font-size: 6rem;
    line-height: 6rem;
    letter-spacing: -0.015625em;
    margin: 20px;
    text-align: center;
    -webkit-font-smoothing: antialiased;
  }
</style>
