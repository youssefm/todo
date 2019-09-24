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
import red from "@material-ui/core/colors/red";
import DeleteIcon from "@material-ui/icons/Delete";

const StyledListItem = styled(ListItem)`
  .MuiListItemText-root {
    text-decoration: ${props => (props.crossed ? "line-through" : "initial")};
  }
  &:hover + .MuiListItemSecondaryAction-root {
    visibility: visible;
  }
  & + .MuiListItemSecondaryAction-root {
    visibility: hidden;

    .MuiSvgIcon-root {
      color: ${red[900]};
    }

    &:hover {
      visibility: visible;
    }
  }
`;

export default class TodoItem extends React.Component {
  render() {
    const todo = this.props.todo;
    return (
      <StyledListItem
        onClick={this.props.handleToggle}
        button
        disableRipple
        crossed={todo.completed ? 1 : 0}
        className="hehehe"
      >
        <ListItemIcon>
          <Checkbox
            checked={todo.completed}
            edge="start"
            color="primary"
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary={todo.title} />
        <ListItemSecondaryAction>
          <IconButton onClick={this.props.handleDelete} edge="end">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </StyledListItem>
    );
  }
}
