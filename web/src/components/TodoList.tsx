import React, { ReactNode, Component } from "react";
import { Todo } from "../models";
import TodoItem from "./TodoItem";

interface TodoListState {
  todo: Todo[];
}

export default class TodoList extends Component<{}, TodoListState> {
  state: TodoListState = {
    todo: []
  };

  async componentDidMount(): Promise<void> {
    const response = await fetch("/api/todo");
    this.setState({
      todo: await response.json()
    });
  }

  render(): ReactNode {
    const todoItems = this.state.todo.map(item => (
      <TodoItem key={item.id} todo={item}></TodoItem>
    ));
    return (
      <>
        <h1>ToDo List</h1>
        <div>{todoItems}</div>
      </>
    );
  }
}
