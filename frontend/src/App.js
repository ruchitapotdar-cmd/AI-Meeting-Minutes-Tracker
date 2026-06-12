import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

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

  const updateTask = async () => {
    try {
      await axios.put(`http://localhost:8080/tasks/${editId}`, {
        title,
        description,
        status: "Pending"
      });

      alert("Task Updated Successfully!");

      setTitle("");
      setDescription("");
      setEditId(null);

      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Error updating task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Error deleting task");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📋 Task Tracker</h1>

      <h2>{editId ? "Edit Task" : "Add Task"}</h2>

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

      <button onClick={editId ? updateTask : addTask}>
        {editId ? "Update Task" : "Add Task"}
      </button>

      <h2>Task List</h2>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.description} - {task.status}

            <button
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>

            <button
              onClick={() => {
                setEditId(task.id);
                setTitle(task.title);
                setDescription(task.description);
              }}
              style={{ marginLeft: "10px" }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;