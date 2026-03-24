export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  deadline?: string; // ISO date string
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = Task['status'];