import { useState, useEffect } from "react";

import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "./services/taskService";

// Define Task type
interface Task {
  _id: string;
  task: string;
  completed: boolean;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState("");

  // Load tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTask(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const originalTasks = [...tasks];
    try {
      const { data } = await addTask({ task: currentTask });
      setTasks([...originalTasks, data]);
      setCurrentTask("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id: string) => {
    const originalTasks = [...tasks];
    try {
      const updatedTasks = tasks.map((t) =>
        t._id === id ? { ...t, completed: !t.completed } : t
      );
      setTasks(updatedTasks);
      const updatedTask = updatedTasks.find((t) => t._id === id);
      if (updatedTask) {
        await updateTask(id, { completed: updatedTask.completed });
      }
    } catch (error) {
      setTasks(originalTasks);
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    const originalTasks = [...tasks];
    try {
      setTasks(tasks.filter((t) => t._id !== id));
      await deleteTask(id);
    } catch (error) {
      setTasks(originalTasks);
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={currentTask}
          onChange={handleChange}
          placeholder="Add new task"
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleUpdate(task._id)}
            />
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.task}
            </span>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
