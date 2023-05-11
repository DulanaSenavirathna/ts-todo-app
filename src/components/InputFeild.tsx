import React from "react";
import "./styles.css";

interface Props{
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
}

const InputFeild = ({todo,setTodo}: Props) => {
  return (
    <div>
      <form className="input">
        <input
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
