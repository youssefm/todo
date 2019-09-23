import React, { ReactNode, Component } from "react";
import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { Todo } from "../models";

interface TodoItemProps {
  todo: Todo;
  handleToggle: () => void;
}

export default class TodoItem extends Component<TodoItemProps, {}> {
  getTextStyle = (): object => {
    if (this.props.todo.completed) {
      return { textDecoration: "line-through" };
    } else {
      return {};
    }
  };

  render(): ReactNode {
    const todo = this.props.todo;
    return (
      <ListItem onClick={this.props.handleToggle} button disableRipple>
        <ListItemIcon>
          <Checkbox
            checked={todo.completed}
            edge="start"
            color="primary"
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary={todo.title} style={this.getTextStyle()} />
      </ListItem>
    );
  }
}
