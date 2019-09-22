import React, { ReactNode, Component } from "react";
import { Todo } from "../models";
import _ from "lodash";
import TodoItem from "./TodoItem";
import { Typography, Container, List } from "@material-ui/core";

interface TodoListState {
  todos: Todo[];
}

export default class TodoList extends Component<{}, TodoListState> {
  state: TodoListState = {
    todos: []
  };

  async componentDidMount(): Promise<void> {
    const response = await fetch("/api/todo");
    this.setState({
      todos: await response.json()
    });
  }

  onToggle(item: Todo): void {
    this.setState(state => {
      return {
        todos: state.todos.map(todo => {
          if (todo == item) {
            return _.extend({}, todo, { completed: !todo.completed });
          } else {
            return todo;
          }
        })
      };
    });
  }

  render(): ReactNode {
    const todoItems = this.state.todos.map(item => (
      <TodoItem
        key={item.id}
        todo={item}
        onToggle={this.onToggle.bind(this, item)}
      ></TodoItem>
    ));
    return (
      <Container>
        <Typography variant="h2">ToDo List</Typography>
        <List>{todoItems}</List>
      </Container>
    );
  }
}
