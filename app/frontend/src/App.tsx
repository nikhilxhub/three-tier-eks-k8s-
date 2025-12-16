
import { useState } from "react";
import { Paper, TextField, Checkbox, Button } from "@mui/material";


interface Task {
  _id: string;
  task: string;
  completed: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTask(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask: Task = {
      _id: Date.now().toString(),
      task: currentTask,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setCurrentTask("");
  };

  const handleUpdate = (id: string) => {
    setTasks(
      tasks.map((t) =>
        t._id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((t) => t._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <Paper elevation={3} className="p-6 w-full max-w-md">
        <div className="text-2xl font-bold text-center mb-6">TO-DO</div>
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 mb-4"
        >
          <TextField
            variant="outlined"
            size="small"
            className="flex-1"
            value={currentTask}
            required
            onChange={handleChange}
            placeholder="Add New TO-DO"
            fullWidth
          />
          <Button
            className="h-10 shrink-0"
            color="primary"
            variant="contained"
            type="submit"
          >
            Add task
          </Button>
        </form>
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <Paper key={task._id} className="flex items-center justify-between p-2" elevation={1}>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Checkbox
                  checked={task.completed}
                  onClick={() => handleUpdate(task._id)}
                  color="primary"
                />
                <div
                  className={`truncate ${task.completed ? "line-through text-gray-500" : ""
                    }`}
                >
                  {task.task}
                </div>
              </div>
              <Button
                onClick={() => handleDelete(task._id)}
                color="secondary"
              >
                delete
              </Button>
            </Paper>
          ))}
        </div>
      </Paper>
    </div>

  );
}
