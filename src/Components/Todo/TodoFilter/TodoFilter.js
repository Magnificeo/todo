import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import { useTodoContext } from "../../../Contexts/todo";

const TodoFilter = () => {
  const { switchAllTasks, switchCompleteTasks, switchedUncompleteTasks } =
    useTodoContext();
  return (
    <Card>
      <Button onClick={switchAllTasks}>Show all</Button>
      <Button onClick={switchCompleteTasks}>Show only complete</Button>
      <Button onClick={switchedUncompleteTasks}>Show only oncomplete</Button>
    </Card>
  );
};

export default TodoFilter;
