import { useContext } from "react";
import TodosContext from "./context/todosContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos } = useContext(TodosContext);
  return (
    <>
      {todos.length ? (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </ul>
      ) : (
        <h4>No todos yet!</h4>
      )}
    </>
  );
}
