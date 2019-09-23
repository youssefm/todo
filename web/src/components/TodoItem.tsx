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
  onSetCompletion: (completed: boolean) => void;
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
      <ListItem>
        <ListItemIcon>
          <Checkbox
            checked={todo.completed}
            onChange={(event): void =>
              this.props.onSetCompletion(event.target.checked)
            }
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
