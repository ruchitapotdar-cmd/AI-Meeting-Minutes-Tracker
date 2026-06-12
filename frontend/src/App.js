import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    try {
      await axios.post("http://localhost:8080/tasks", {
        title: title,
        description: description,
        status: "Pending"
      });

      alert("Task Added Successfully!");

      setTitle("");
      setDescription("");

      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Error adding task");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📋 Task Tracker</h1>

      <h2>Add Task</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={addTask}>Add Task</button>

      <h2>Task List</h2>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.description} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;