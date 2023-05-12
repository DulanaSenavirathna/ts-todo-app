import React, { useRef } from "react";
import "./styles.css";

interface Props{
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd:(e: React.FormEvent) => void; 
// handleAdd function not gonna return anything. so void added 
// type added from handleAdd function in app.tsx
}

const InputFeild = ({todo, setTodo, handleAdd}: Props) => {
  
  // useRef hook for getting rid of blur after adding the input field
  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <div>
    <form className="input" onSubmit={(e)=>{
      handleAdd(e)
      inputRef.current?.blur();
      }}>
        <input
        ref={inputRef}
          type="input"
          value={todo}
          onChange={
            (e)=>setTodo(e.target.value)
          }
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

export default InputFeild;
