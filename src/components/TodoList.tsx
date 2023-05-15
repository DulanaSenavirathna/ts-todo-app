import React from "react";
import "./styles.css";
import { ToDo } from "../model"; // Importing the ToDo type from the model file
import SingleTodo from "./SingleTodo"; // Importing the SingleTodo component

interface Props {
  todos: ToDo[]; // Prop for the array of todos
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>; // Function to update the todos array
}

const TodoList: React.FC<Props> = ({ todos, setTodos }: Props) => {
  return (
    <div className="todos">
      {/* Render the SingleTodo component for each todo in the todos array */}
      {todos.map((todo) => (
        <SingleTodo
          todo={todo} // Pass the individual todo
          key={todo.id} // Assign a unique key for each SingleTodo component
          todos={todos} // Pass the todos array
          setTodos={setTodos} // Pass the function to update the todos array
        />
      ))}
    </div>
  );
};

export default TodoList;
