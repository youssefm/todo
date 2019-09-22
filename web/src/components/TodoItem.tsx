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
  onToggle: () => void;
}

export default class TodoItem extends Component<TodoItemProps, {}> {
  render(): ReactNode {
    const todo = this.props.todo;
    return (
      <ListItem>
        <ListItemIcon>
          <Checkbox
            checked={todo.completed}
            onChange={this.props.onToggle}
            edge="start"
            color="primary"
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary={todo.title} />
      </ListItem>
    );
  }
}
