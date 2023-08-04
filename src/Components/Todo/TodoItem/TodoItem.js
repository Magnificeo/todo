import { useContext } from "react";
import Button from "../../UI/Button/Button";
import { useTodoContext } from "../../../Contexts/todo";

const TodoItem = ({ task }) => {
  const { onToggleCheckbox, onDeleteTask, onChooseEditTask } = useTodoContext();
  return (
    <li>
      <label htmlFor={task.id}>{task.value}</label>
      <input
        id={task.id}
        type="checkbox"
        checked={task.checked}
        onChange={() => onToggleCheckbox(task)}
      ></input>
      <Button onClick={() => onDeleteTask(task)}>Delete task</Button>
      <Button onClick={() => onChooseEditTask(task)}>Edit task</Button>
    </li>
  );
};

export default TodoItem;
