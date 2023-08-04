import "./App.css";
import TodoList from "./Components/Todo/TodoList/TodoList";
import TodoFilter from "./Components/Todo/TodoFilter/TodoFilter";
import { TodoContextProvider } from "./Contexts/todo";
import ApplicationForm from "./Components/ApplicationForm/ApplicationForm";

function App() {
  /* const [taskText, setTaskText] = useState(""); */

  /* EDIT TODO FUNCTIONAL */
  /*  const [edit, setEdit] = useState({
    isEdit: false,
    changableTask: null,
  }); */
  /* ........................... */

  /* FILTER FUNCTIONAL */
  /*   const [filterState, dispatchFilter] = useReducer(filterReducer, "ALL");
  const filteredTasks = tasksState.filter((task) => {
    if (filterState === "ALL") return true;
    if (filterState === "COMPLETE" && task.checked) return true;
    if (filterState === "UNCOMPLETE" && !task.checked) return true;
    return false;
  }); */
  /* ........................... */

  /*  const inputChangeHandler = (e) => setTaskText(e.target.value); */

  /* const formSubmitHandler = (e) => {
    e.preventDefault();
    if (taskText.trim().length > 0) {
      dispatchTasks({
        type: edit.isEdit ? "EDITED" : "ADDED",
        value: taskText,
        editId: edit.changableTask?.id || "",
      });
    }
    setTaskText("");
    setEdit({
      isEdit: false,
      changableTask: null,
    });
  }; */

  /* HANDLERS - TOGGLE, DELETE, EDIT */
  /*   const editTodoHandler = (value, id) => {
    setEdit({
      isEdit: true,
      changableTask: tasksState.find((task) => task.id === id),
    });
    setTaskText(value);
  }; */
  /* ........... */

  return (
    <TodoContextProvider>
      <ApplicationForm />
      <TodoFilter />
      <TodoList />
    </TodoContextProvider>
  );
}

export default App;
