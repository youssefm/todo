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

  onSetCompletion(item: Todo, completed: boolean): void {
    const updatedItem = _.extend({}, item, { completed });
    this.setState(state => {
      return {
        todos: state.todos.map(todo => {
          if (todo == item) {
            return updatedItem;
          } else {
            return todo;
          }
        })
      };
    });

    fetch(`/api/todo/${item.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedItem),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  render(): ReactNode {
    const todoItems = this.state.todos.map(item => (
      <TodoItem
        key={item.id}
        todo={item}
        onSetCompletion={this.onSetCompletion.bind(this, item)}
      ></TodoItem>
    ));
    return (
      <Container>
        <Typography variant="h2">todos</Typography>
        <List>{todoItems}</List>
      </Container>
    );
  }
}
