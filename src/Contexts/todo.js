import React, { useContext, useMemo } from "react";
import { useReducer, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const INITIALL_TODO = {
  tasks: [{ id: uuidv4(), value: "Learning React", checked: false }],
  isEdit: false,
  editTask: null,
};

const TodoContext = React.createContext({
  onToggleCheckbox: () => {},
  onEditTodo: () => {},
  onDeleteTodo: () => {},
});

const switchedOnAll = "SWITCHED_ON_ALL_TASKS";
const switchedOnComplete = "SWITCHED_ON_COMPLETE_TASKS";
const switchedOnUncomplete = "SWITCHED_ON_UNCOMPLETE_TASKS";

const filterReducer = (state, action) => {
  switch (action.type) {
    case switchedOnAll:
      return "ALL";
    case switchedOnComplete:
      return "COMPLETE";
    case switchedOnUncomplete:
      return "UNCOMPLETE";
    default:
      throw new Error();
  }
};

const added = "ADDED_NEW_TASK";
const checked = "CHECKED_TASK";
const unchecked = "UNCHECKED_TASK";
const deleted = "DELETED_TASK";
const startedEdit = "STARTED_EDIT_TASK";
const edited = "EDITED_TASK";

const todoReducer = (state, action) => {
  if (action.type === added) {
    return {
      ...state,
      tasks: [
        ...state.tasks,
        { id: uuidv4(), value: action.value, checked: false },
      ],
    };
  }

  if (action.type === checked) {
    return {
      ...state,
      tasks: state.tasks.map((task) => {
        if (task.id === action.id) {
          return { ...task, checked: true };
        }
        return task;
      }),
    };
  }

  if (action.type === unchecked) {
    return {
      ...state,
      tasks: state.tasks.map((task) => {
        if (task.id === action.id) {
          return { ...task, checked: false };
        }
        return task;
      }),
    };
  }

  if (action.type === deleted) {
    return {
      ...state,
      tasks: state.tasks.filter((task) => {
        if (task.id !== action.id) return task;
      }),
    };
  }

  if (action.type === startedEdit) {
    return {
      ...state,
      isEdit: true,
      editTask: action.id,
    };
  }

  if (action.type === edited) {
    return {
      isEdit: false,
      editTask: null,
      tasks: state.tasks.map((task) => {
        if (task.id === state.editTask) {
          return { ...task, value: action.value };
        }
        return task;
      }),
    };
  }
};

const useTodoContext = () => {
  return useContext(TodoContext);
};

const TodoContextProvider = ({ children }) => {
  const [todoState, dispatchTodo] = useReducer(
    todoReducer,
    JSON.parse(localStorage.getItem("todo")) || INITIALL_TODO
  );
  const [filterState, dispatchFilter] = useReducer(filterReducer, "ALL");

  const filteredTasks = useMemo(
    () =>
      todoState.tasks.filter((task) => {
        if (filterState === "ALL") return true;
        if (filterState === "COMPLETE" && task.checked) return true;
        if (filterState === "UNCOMPLETE" && !task.checked) return true;
        return false;
      }),
    [todoState.tasks, filterState]
  );

  const switchAllTasks = () => dispatchFilter({ type: switchedOnAll });
  const switchCompleteTasks = () =>
    dispatchFilter({ type: switchedOnComplete });
  const switchedUncompleteTasks = () =>
    dispatchFilter({ type: switchedOnUncomplete });

  const addTaskHandle = (text) => dispatchTodo({ type: added, value: text });

  const chooseEditTaskHandle = (task) =>
    dispatchTodo({ type: startedEdit, id: task.id });

  const editTaskHandle = (text) => dispatchTodo({ type: edited, value: text });

  const toggleCheckboxHadle = (task) =>
    dispatchTodo({ type: task.checked ? unchecked : checked, id: task.id });

  const deleteTaskHandle = (task) =>
    dispatchTodo({ type: deleted, id: task.id });

  const editTaskContent = todoState.tasks.find(
    (task) => task.id === todoState.editTask
  )?.value;

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoState));
  }, [todoState]);

  return (
    <TodoContext.Provider
      value={{
        filteredTasks,
        dispatchFilter,
        switchAllTasks,
        switchCompleteTasks,
        switchedUncompleteTasks,
        onAddTask: addTaskHandle,
        /*  editTaskHandle, */
        onToggleCheckbox: toggleCheckboxHadle,
        onDeleteTask: deleteTaskHandle,
        onChooseEditTask: chooseEditTaskHandle,
        onEditTask: editTaskHandle,
        editTaskContent,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { useTodoContext, TodoContextProvider };
