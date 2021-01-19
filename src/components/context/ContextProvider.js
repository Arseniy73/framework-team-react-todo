import axios from "axios";
import { useEffect, useState } from "react";

import TodosContext from "./todosContext";

const url = process.env.REACT_APP_DB_URL;

export default function ContextProvider({ children }) {
  const [todos, setTodos] = useState([]);

  async function fetchTodos() {
    try {
      const response = await axios.get(url);
      setTodos(response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  async function checkTodo(todo) {
    try {
      await axios.patch(`${url}/${todo.id}`, { completed: !todo.completed });
      fetchTodos();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async function removeTodo(id) {
    try {
      await axios.delete(`${url}/${id}`);
      fetchTodos();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async function addTodo(title) {
    const todo = { id: Date.now(), title, completed: false };
    try {
      await axios.post(url, todo);
      fetchTodos();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async function editTodo(title, id) {
    try {
      await axios.patch(`${url}/${id}`, { title });
      fetchTodos();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  return (
    <TodosContext.Provider
      value={{ todos, checkTodo, removeTodo, addTodo, editTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
}
