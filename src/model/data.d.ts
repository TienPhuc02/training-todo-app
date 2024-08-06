export interface Task {
  id: string; // unique identifier
  title: string; // task title
  description: string; // task description
  startDate: string; // start date
  endDate: string; // end date
  priority: string; // priority (e.g., "high", "medium", "low")
  dueDate: string; // deadline
  status: string; // task status (e.g., "not started", "in progress", "completed")
  tags: string[]; // array of tags
  createdAt: string; // task creation date
  updatedAt: string; // last update date
}
