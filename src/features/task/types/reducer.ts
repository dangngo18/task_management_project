import type { PayloadAction } from "@reduxjs/toolkit";
import type { TaskState } from "./state";
import type { Task } from ".";

export interface ReducersType extends Record<string, (state: TaskState, action: PayloadAction<any>) => void> {
  addTask: (state: TaskState, action: PayloadAction<Task>) => void;
  updateTask: (state: TaskState, action: PayloadAction<Task>) => void;
  deleteTask: (state: TaskState, action: PayloadAction<string>) => void; // payload is task id
  changeStatus: (state: TaskState, action: PayloadAction<{ id: string; status: Task['status'] }>) => void;
  setFilter: (state: TaskState, action: PayloadAction<TaskState['filter']>) => void;
  setSearchQuery: (state: TaskState, action: PayloadAction<string>) => void;
  loadTasksFromStorage: (state: TaskState, action: PayloadAction<Task[]>) => void;
}