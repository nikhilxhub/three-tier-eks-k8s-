import axios from "axios";

// In Vite, env vars must start with VITE_
// Example:VITE_BACKEND_URL="http://localhost:8080/api/tasks" in .env file
const apiUrl = import.meta.env.VITE_BACKEND_URL as string;

console.log("Backend URL:", apiUrl);

// Define Task type for strong typing
export interface Task {
  _id: string;
  task: string;
  completed: boolean;
}

// Fetch all tasks
export function getTasks() {
  return axios.get<Task[]>(apiUrl);
}

// Add a new task
export function addTask(task: { task: string }) {
  return axios.post<Task>(apiUrl, task);
}

// Update a task by ID
export function updateTask(id: string, task: Partial<Task>) {
  return axios.put<Task>(`${apiUrl}/${id}`, task);
}

// Delete a task by ID
export function deleteTask(id: string) {
  return axios.delete(`${apiUrl}/${id}`);
}
