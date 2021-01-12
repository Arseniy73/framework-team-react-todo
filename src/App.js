import './index.css';
import Card from '@material-ui/core/Card';
import AddForm from './components/AddForm';
import { useEffect, useState } from 'react';
import TodosContext from './components/todosContext';
import TodoList from './components/TodoList';
import axios from 'axios';

const url = process.env.REACT_APP_DB_URL

// To start server run 'json-server --watch db.json --port 3004'

function App() {
  
  const [todos, setTodos] = useState([])
  
  async function fetchTodos() {
    const response = await axios.get(url)
    setTodos(response.data)
  }

  useEffect(() => {
    fetchTodos()
  },[])

  async function checkTodo(id) {
    const todo = await axios.get(`${url}/${id}`)
    await axios.patch(`${url}/${id}`, {"completed": !todo.data.completed})
    fetchTodos()
  }

  async function removeTodo(id) {
    await axios.delete(`${url}/${id}`)
    fetchTodos()
  }

  async function addTodo(title) {
    const todo = {id: Date.now(), title, completed: false}
    await axios.post(url, todo)
    fetchTodos()
  }

  async function editTodo(title, id) {
    await axios.patch(`${url}/${id}`, {"title": title})
    fetchTodos()
  }

  return (
    <TodosContext.Provider value={{todos, checkTodo, removeTodo, addTodo, editTodo}}>
      <div className="container">
        <Card className="card">
          <AddForm />
          <TodoList todos={todos} />
        </Card>  
      </div>
    </TodosContext.Provider>
  );
}

export default App;
