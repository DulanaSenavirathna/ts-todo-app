import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputFeild"; // Importing the InputField component
import { ToDo } from "./model"; // Importing the ToDo type from the model file
import TodoList from "./components/TodoList"; // Importing the TodoList component
import { v4 as uuidv4 } from "uuid"; // Importing the v4 function from the uuid library


const App: React.FC = () => {
  // Create useState to manage the todo value from the InputField
  const [todo, setTodo] = useState<string>("");

  // Create useState to manage the array of todos
  const [todos, setTodos] = useState<ToDo[]>([]);

  // Create a function to handle adding a new todo
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // avoid page refresh when btn click.

    if (todo) {
      // Check if the todo is not empty
      setTodos([...todos, { id: uuidv4(), todo, isDone: false }]); // Add the new todo to the todos array
      setTodo(""); // Reset the todo value to an empty string
    }
  };

  // console.log(todo);
  // console.log(todos);

  return (
    <div className="App">
      <span className="heading">TypeScript ToDo App</span>
      {/* Render the InputField component and pass the necessary props */}
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      {/* {todos.map((t) => (
        <li>{t.todo}</li>
      ))} */}

      {/* Render the TodoList component and pass the todos and setTodos props */}
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
