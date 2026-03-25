import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TaskState } from "../types/state";
import type { ReducersType } from "../types/reducer";
import type { Task } from "../types";

const initialState: TaskState = {
  tasks: [],
  filter: "ALL",
  searchQuery: "",
};
const reducers: ReducersType = {
  addTask: function (state: TaskState, action: PayloadAction<Task>): void {
    state.tasks.push(action.payload);
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  },
  updateTask: function (state: TaskState, action: PayloadAction<Task>): void {
    const index = state.tasks.findIndex(
      (task) => task.id === action.payload.id,
    );
    if (index !== -1) {
      state.tasks[index] = action.payload;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    }
  },
  deleteTask: function (state: TaskState, action: PayloadAction<string>): void {
    state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  },
  changeStatus: function (
    state: TaskState,
    action: PayloadAction<{ id: string; status: Task["status"] }>,
  ): void {
    const index = state.tasks.findIndex(
      (task) => task.id === action.payload.id,
    );
    if (index !== -1) {
      state.tasks[index].status = action.payload.status;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    }
  },
  setFilter: function (
    state: TaskState,
    action: PayloadAction<TaskState["filter"]>,
  ): void {
    state.filter = action.payload;
  },
  setSearchQuery: function (
    state: TaskState,
    action: PayloadAction<string>,
  ): void {
    state.searchQuery = action.payload;
  },
  loadTasksFromStorage: function (
    state: TaskState,
    action: PayloadAction<Task[]>,
  ): void {
    state.tasks = action.payload;
  },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers,
});

export const {
  addTask,
  updateTask,
  deleteTask,
  changeStatus,
  setFilter,
  setSearchQuery,
  loadTasksFromStorage,
} = taskSlice.actions;

export default taskSlice.reducer;
