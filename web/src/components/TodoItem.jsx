import React from "react";
import styled from "styled-components";
import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const StyledListItemText = styled(ListItemText)`
  text-decoration: ${props => (props.crossed ? "line-through" : "initial")};
`;

export default class TodoItem extends React.Component {
  render() {
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
        <StyledListItemText primary={todo.title} crossed={todo.completed} />
        <ListItemSecondaryAction>
          <IconButton onClick={this.props.handleDelete} edge="end">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
