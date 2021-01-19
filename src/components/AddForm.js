import React, { useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import TodosContext from "./context/todosContext";

export default function AddForm() {
  const [value, setValue] = useState("");
  const { addTodo } = useContext(TodosContext);

  function submitHandler(e) {
    e.preventDefault();
    if (value.trim()) {
      addTodo(value);
      setValue("");
    }
  }

  return (
    <form
      style={{ width: "100%", flexDirection: "unset" }}
      onSubmit={submitHandler}
    >
      <TextField
        id="outlined-basic"
        variant="outlined"
        label="Task"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        variant="outlined"
        className="add-btn"
        style={{
          color: "#1dbb00",
          border: "1px solid #1dbb00",
          marginLeft: "3%",
        }}
        type="submit"
        onClick={submitHandler}
      >
        ADD
      </Button>
    </form>
  );
}
