import type { Task, TaskStatus } from ".";

export interface TaskState{
    tasks: Task[];
    filter: TaskStatus | "ALL";
    searchQuery: string;

}