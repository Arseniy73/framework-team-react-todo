import "./index.css";

import Card from "@material-ui/core/Card";
import AddForm from "./components/AddForm";
import TodoList from "./components/TodoList";
import ContextProvider from "./components/context/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <div className="container">
        <Card className="card">
          <AddForm />
          <TodoList />
        </Card>
      </div>
    </ContextProvider>
  );
}

export default App;
