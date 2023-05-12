import React, { useState } from "react";
import "./App.css";
import InputFeild from "./components/InputFeild";
import { ToDo } from "./model";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  // created useState for get todo from InputFeild
  const [todo, setTodo] = useState<string>("");

  // contain all of todos, added empty array from model
  // this is how create an array of type or an interface
  const [todos, setTodos] = useState<ToDo[]>([]);

  // create handle add function to add todos to setTodos state
  // we have to pass this function to InputField
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    // avoid page refresh when btn click.
    // React.FormEvent type get from google after error is pop up.

    if (todo) {
      // first check there is something in the todo using if
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      // take whatever already inside the todos using ...todos
      // then add another todo
      setTodo("");
      // empty field after todo added
    }
  };

  // console.log(todo);
  // console.log(todos);

  return (
    <div className="App">
      <span className="heading">TypeScript ToDo App</span>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      {/* {todos.map((t) => (
        <li>{t.todo}</li>
      ))} */}

      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
