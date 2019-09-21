import React, { ReactNode, Component } from "react";
import { Todo } from "../models";

interface TodoItemProps {
  todo: Todo;
}

export default class TodoItem extends Component<TodoItemProps, {}> {
  render(): ReactNode {
    const todo = this.props.todo;
    return (
      <div>
        <input type="checkbox" checked={todo.completed} />
        {todo.title}
      </div>
    );
  }
}
