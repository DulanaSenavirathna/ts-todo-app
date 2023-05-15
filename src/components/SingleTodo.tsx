import React, { useEffect, useRef, useState } from "react";
import { ToDo } from "../model"; // Importing the ToDo type from a model file
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoneIcon from "@mui/icons-material/Done";
import "./styles.css";

interface Props {
  todo: ToDo; // Prop for a single ToDo item
  todos: ToDo[]; // Prop for the array of all ToDo items
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>; // Function to update the ToDo array
}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false); // State to track if the ToDo is in edit mode
  const [editTodo, setEditTodo] = useState<string>(todo.todo); // State to track the edited ToDo text

  const [isOpen, setIsOpen] = useState(false); // State to track the confirmation popup
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null); // State to store the id of the ToDo to be deleted

  const handleDone = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    setIsOpen(true); // Show the confirmation popup
    setDeleteItemId(id); // Set the id of the todo to be deleted
  };

  const handleConfirmDelete = () => {
    setTodos(todos.filter((todo) => todo.id !== deleteItemId)); // Filter out the ToDo with the deleteItemId
    setIsOpen(false); // Close the confirmation popup after deleting
    setDeleteItemId(null); // Reset deleteItemId
  };

  const handleCancelDelete = () => {
    setIsOpen(false); // Close the confirmation popup if delete is canceled
    setDeleteItemId(null); // Reset deleteItemId
  };

  const handleEdit = (e: React.FormEvent, id: string) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null); // Reference to the input element for focusing

  useEffect(() => {
    if (edit) {
      inputRef.current?.focus(); // Focus on the input element when in edit mode
    }
  }, [edit]);

  return (
    <form className="todosSingle" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        // Render an input field in edit mode
        <input
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todosSingleText"
        />
      ) : todo.isDone ? (
        // Render a strikethrough text if the ToDo is marked as done
        <s className="todosSingleText"> {todo.todo}</s>
      ) : (
        // Render a normal text if the ToDo is not done
        <span className="todosSingleText"> {todo.todo}</span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            // Toggle the edit mode only if it's not already in edit mode and the ToDo is not marked as done
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
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
        // Render a confirmation popup if isOpen is true
        <div className="popup">
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this todo item?</p>
          <button className="popupBtnYes" onClick={handleConfirmDelete}>
            Yes
          </button>
          <button className="popupBtnNo" onClick={handleCancelDelete}>
            No
          </button>
        </div>
      )}
    </form>
  );
};

export default SingleTodo;
