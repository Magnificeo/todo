import { useTodoContext } from "../../../Contexts/todo";
import TodoItem from "../TodoItem/TodoItem";

const TodoList = () => {
  const { filteredTasks } = useTodoContext();
  return (
    <ul>
      {filteredTasks.map((task) => (
        <TodoItem key={task.id} task={task}></TodoItem>
      ))}
    </ul>
  );
};

export default TodoList;
