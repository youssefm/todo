import React, { ReactNode, Component, FormEvent, ChangeEvent } from "react";
import { Todo } from "../models";
import _ from "lodash";
import TodoItem from "./TodoItem";
import { Typography, Container, List, TextField, Box } from "@material-ui/core";

interface TodoListState {
  todos: Todo[];
  newTodoTitle: string;
}

export default class TodoList extends Component<{}, TodoListState> {
  state: TodoListState = {
    todos: [],
    newTodoTitle: ""
  };

  async componentDidMount(): Promise<void> {
    const response = await fetch("/api/todo");
    this.setState({
      todos: await response.json()
    });
  }

  onChangeNewTodoTitle = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      newTodoTitle: event.target.value
    });
  };

  handleNewTodoSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const newItem = { title: this.state.newTodoTitle };
    const response = await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const newTodo = await response.json();
    this.setState(state => {
      return {
        todos: state.todos.concat(newTodo),
        newTodoTitle: ""
      };
    });
  };

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
        <Box paddingBottom={1}>
          <Typography variant="h2">todos</Typography>
        </Box>

        <form onSubmit={this.handleNewTodoSubmit}>
          <Box marginX={1}>
            <TextField
              label="New Task"
              value={this.state.newTodoTitle}
              onChange={this.onChangeNewTodoTitle}
              fullWidth
            />
          </Box>
        </form>
        <List>{todoItems}</List>
      </Container>
    );
  }
}
