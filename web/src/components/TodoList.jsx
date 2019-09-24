import React from "react";
import _ from "lodash";
import TodoItem from "./TodoItem";
import { Typography, Container, List, TextField, Box } from "@material-ui/core";

export default class TodoList extends React.Component {
  state = {
    todos: [],
    newTodoTitle: ""
  };

  async componentDidMount() {
    const response = await fetch("/api/todo");
    this.setState({
      todos: await response.json()
    });
  }

  onChangeNewTodoTitle = event => {
    this.setState({
      newTodoTitle: event.target.value
    });
  };

  handleNewTodoSubmit = async event => {
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

  handleItemToggle(item) {
    const updatedItem = _.extend({}, item, { completed: !item.completed });
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

    // We don't wait for the server update to happen to keep the frontend feeling snappy
    fetch(`/api/todo/${item.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedItem),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  handleItemDelete(item) {
    this.setState(state => {
      return {
        todos: state.todos.filter(todo => todo.id != item.id)
      };
    });

    fetch(`/api/todo/${item.id}`, { method: "DELETE" });
  }

  render() {
    const todoItems = this.state.todos.map(item => (
      <TodoItem
        key={item.id}
        todo={item}
        handleToggle={this.handleItemToggle.bind(this, item)}
        handleDelete={this.handleItemDelete.bind(this, item)}
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
