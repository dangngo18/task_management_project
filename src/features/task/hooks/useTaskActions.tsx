import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import {
  addTask,
  changeStatus,
  deleteTask,
  setFilter,
  setSearchQuery,
  updateTask,
} from "../store/taskSlice";
import { v4 as uuidv4 } from "uuid";
import type { Task } from "../types";
import { id } from "zod/v4/locales";

export const useTaskActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filter = useSelector((state: RootState) => state.tasks.filter);
  const searchQuery = useSelector(
    (state: RootState) => state.tasks.searchQuery,
  );

  const handleAddTask = (
    data: Omit<Task, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newTask: Task = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(addTask(newTask));
    return newTask;
  };

  const handleUpdateTask = (
    id: string,
    data: Partial<Omit<Task, "id" | "createdAt">>,
  ) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      const updatedTask: Task = {
        ...task,
        ...data,
        updatedAt: new Date().toISOString(),
      };
      dispatch(updateTask(updatedTask));
      return updatedTask;
    }
  };

  const handleSetSearchQuery = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleSetFilter = (filter: Task["status"] | "ALL") => {
    dispatch(setFilter(filter));
  };

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };
  const handleChangeStatus = (id: string, status: Task["status"]) => {
    dispatch(changeStatus({ id, status }));
  };

  const getFilteredTasks = () => {
    let filteredTasks = tasks;
    if (filter !== "ALL") {
      filteredTasks = filteredTasks.filter((t) => t.status === filter);
    }
    if (searchQuery) {
      filteredTasks = filteredTasks.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (t.description &&
            t.description.toLowerCase().includes(searchQuery.toLowerCase())),
      );
    }
    return filteredTasks;
  };

  return {
    tasks,
    filter,
    searchQuery,
    handleAddTask,
    handleUpdateTask,
    handleSetSearchQuery,
    handleSetFilter,
    handleDeleteTask,
    handleChangeStatus,
    filteredTasks: getFilteredTasks(),
  };
};
