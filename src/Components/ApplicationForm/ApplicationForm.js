import UserInput from "./UserInput/UserInput";
import { useTodoContext } from "../../Contexts/todo";

const ApplicationForm = () => {
  const { onAddTask, editTaskContent, onEditTask } = useTodoContext();
  console.log(editTaskContent);

  const addSubmitHandler = (text) => {
    onAddTask(text);
  };

  const editSubmitHandler = (text) => {
    onEditTask(text);
  };

  const addUserInput = (
    <UserInput key="add" onSubmit={addSubmitHandler} action="Add new task">
      Your new task
    </UserInput>
  );

  const editUserInput = (
    <UserInput
      key={editTaskContent}
      onSubmit={editSubmitHandler}
      action="Edit task"
      editText={editTaskContent}
    >
      Changable task
    </UserInput>
  );

  if (editTaskContent) {
    return editUserInput;
  }

  return addUserInput;
};

export default ApplicationForm;
