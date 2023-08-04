import { useState } from "react";

const UserInput = ({ onSubmit, action, children, editText = null }) => {
  const [taskText, setTaskText] = useState(editText || "");
  const taskTextChangeHandle = (e) => setTaskText(e.target.value);

  const submitHandle = (e) => {
    e.preventDefault();
    if (taskText.trim().length > 0) {
      onSubmit(taskText);
    }
    setTaskText("");
  };

  return (
    <form onSubmit={submitHandle}>
      <label>{children}</label>
      <input
        type="text"
        value={taskText}
        onChange={taskTextChangeHandle}
        placeholder="name of task"
      ></input>
      <button type="submit">{action}</button>
    </form>
  );
};

export default UserInput;
