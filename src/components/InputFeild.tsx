import React, { useRef } from "react";
import "./styles.css";

interface Props {
  todo: string; // Prop for the todo value
  setTodo: React.Dispatch<React.SetStateAction<string>>; // Function to update the todo value
  handleAdd: (e: React.FormEvent) => void; // Function to handle the add event, does not return anything (void)
}

const InputField = ({ todo, setTodo, handleAdd }: Props) => {
  // useRef hook for getting a reference to the input field ( for getting rid of blur after adding the input field)
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <form
        className="input"
        onSubmit={(e) => {
          handleAdd(e); // Call the handleAdd function when the form is submitted
          inputRef.current?.blur(); // Remove focus from the input field after adding the task
        }}
      >
        <input
          ref={inputRef}
          type="input"
          value={todo}
          onChange={(e) => setTodo(e.target.value)} // Update the todo value as the user types
          placeholder="Enter a task"
          className="inputBox"
        ></input>
        <button className="inputSubmitBtn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default InputField;
