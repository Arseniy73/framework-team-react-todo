import React, { useContext, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";

import TodosContext from "./context/todosContext";

export default function TodoItem({ todo }) {
  const { checkTodo, removeTodo, editTodo } = useContext(TodosContext);
  const [edit, setEdit] = useState(false);
  const [newValue, setNewValue] = useState(todo.title);

  function editHandler(e) {
    e.preventDefault();
    if (newValue.trim()) editTodo(newValue, todo.id);
    setEdit(false);
  }

  return (
    <li className="todo-item">
      <div>
        <span>
          <Checkbox
            checked={todo.completed}
            onChange={() => checkTodo(todo)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </span>
        {edit ? (
          <span>
            <form onSubmit={editHandler} className="edit-form">
              <TextField
                id="standard-helperText"
                defaultValue={todo.title}
                onChange={(e) => setNewValue(e.target.value)}
                autoFocus
                onBlur={() => setEdit(false)}
              />
            </form>
          </span>
        ) : (
          <span onClick={() => setEdit(true)}> {todo.title} </span>
        )}
      </div>
      <Button
        color="secondary"
        className="remove-btn"
        style={{ fontSize: "2rem", padding: 0 }}
        onClick={() => removeTodo(todo.id)}
      >
        &times;
      </Button>
    </li>
  );
}
