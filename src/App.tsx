import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputFeild";
import { ToDo } from "./model";
import TodoList from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  // Create useState to manage the todo value from the InputField
  const [todo, setTodo] = useState<string>("");

  // Create useState to manage the array of todos
  const [todos, setTodos] = useState<ToDo[]>([]);

  //use state for completed todos
  const [completedTodos, setCompletedTodos] = useState<ToDo[]>([]);

  // Create a function to handle adding a new todo
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    // Prevent the default form submission behavior
    // avoid page refresh when btn click.

    if (todo) {
      // Check if the todo is not empty
      setTodos([...todos, { id: uuidv4(), todo, isDone: false }]); // Add the new todo to the todos array
      setTodo(""); // Reset the todo value to an empty string
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">TypeScript ToDo App</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
