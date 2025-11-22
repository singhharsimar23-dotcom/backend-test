// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

// Use a relative path for the API when deployed to Vercel, 
// or the local URL when running locally.
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api/tasks' 
  : 'http://localhost:5000/api/tasks'; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTask, setEditingTask] = useState(null); 
  const [loading, setLoading] = useState(true);

  // 1. Fetch Tasks (Read)
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Could not connect to API. Check if the backend is running and the database is configured.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Add Task (Create)
  const handleAddTask = async (e) => {
    e.preventDefault();
    const title = newTaskTitle.trim();
    if (!title) return;

    try {
      const response = await axios.post(API_URL, { title });
      setTasks([response.data, ...tasks]); 
      setNewTaskTitle('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // 3. Toggle Complete (Update - Completed Status)
  const handleToggleComplete = async (task) => {
    try {
      const response = await axios.put(`${API_URL}/${task._id}`, {
        completed: !task.completed,
      });
      setTasks(tasks.map(t => (t._id === task._id ? response.data : t)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // 4. Delete Task (Delete)
  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setTasks(tasks.filter(t => t._id !== id));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  // 5. Edit Task 
  const handleSaveEdit = async () => {
    if (!editingTask || !editingTask.title.trim()) return;

    try {
      const response = await axios.put(`${API_URL}/${editingTask.id}`, {
        title: editingTask.title,
      });
      setTasks(tasks.map(t => (t._id === editingTask.id ? response.data : t)));
      setEditingTask(null); // Exit editing mode
    } catch (error) {
      console.error('Error saving task edit:', error);
    }
  };

  if (loading) {
    return (
        <div className="task-list-app loading">
            <h1>Loading Tasks...</h1>
        </div>
    );
  }

  return (
    <div className="task-list-app">
      <h1>TO DO LIST "Never Put Off Till Tomorrow What You Can Do Today" 📝</h1>

      {/* Add New Task Form */}
      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button type="submit" disabled={!newTaskTitle.trim()}>Add Task</button>
      </form>

      {/* Task List */}
      <div className="tasks-container">
        {tasks.length === 0 ? (
          <p className="no-tasks">🎉 No tasks yet! Add one above.</p>
        ) : (
          tasks.map(task => (
            <div key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              {editingTask && editingTask.id === task._id ? (
                // Edit Mode
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  onBlur={handleSaveEdit}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit();
                  }}
                  autoFocus
                />
              ) : (
                // Display Mode
                <>
                  <span onClick={() => handleToggleComplete(task)}>{task.title}</span>
                  <div className="task-actions">
                    <button onClick={() => setEditingTask({ id: task._id, title: task.title })} disabled={task.completed}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteTask(task._id)} className="delete-btn">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;