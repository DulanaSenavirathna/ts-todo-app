import React, { useState } from "react";
import { ToDo } from "../model";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoneIcon from "@mui/icons-material/Done";
import "./styles.css";

interface Props {
  todo: ToDo;
  todos: ToDo[];
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null); // Add the deleteItemId state

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setIsOpen(true); // Show the confirmation popup
    setDeleteItemId(id); // Set the id of the todo to be deleted
  };
  
  const handleConfirmDelete = () => {
    setTodos(todos.filter((todo) => todo.id !== deleteItemId)); // Filter based on deleteItemId
    setIsOpen(false); // Close the confirmation popup after deleting
    setDeleteItemId(null); // Reset deleteItemId
  };
  
  const handleCancelDelete = () => {
    setIsOpen(false); // Close the confirmation popup if delete is canceled
    setDeleteItemId(null); // Reset deleteItemId
  };

  return (
    <form className="todosSingle">
      {todo.isDone ? (
        <s className=" todosSingleText"> {todo.todo}</s>
      ) : (
        <span className=" todosSingleText"> {todo.todo}</span>
      )}

      <div>
        <span className="icon">
          <EditIcon />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <DoneIcon />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <DeleteForeverIcon />
        </span>
      </div>

      {isOpen && (
        <div className="popup">
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this todo item?</p>
          <button className="popupBtnYes" onClick={handleConfirmDelete}>Yes</button>
          <button className="popupBtnNo" onClick={handleCancelDelete}>No</button>
        </div>
      )}
    </form>
  );
};

export default SingleTodo;
