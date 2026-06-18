import React, { useState } from 'react';

function TaskManager({ tasks, setTasks }) {
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      title: newTask.trim(),
      done: false,
      priority: 'med',
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const pendingCount = tasks.filter(t => !t.done).length;

  return (
    <div className="card">
      <div className="card-header">
        <h2><i className="fas fa-tasks"></i> Task Manager</h2>
        <span className="badge-pill">{pendingCount} pending</span>
      </div>
      
      <div className="task-scroll">
        {tasks.length === 0 && (
          <div className="text-muted" style={{ padding: '0.5rem' }}>
            No tasks yet. Add one below!
          </div>
        )}
        {tasks.map(task => (
          <div className="task-item" key={task.id}>
            <div className="task-left">
              <input
                type="checkbox"
                className="task-check"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span className={`task-title ${task.done ? 'done' : ''}`}>
                {task.title}
              </span>
              <span className="task-priority">{task.priority}</span>
            </div>
            <i 
              className="fas fa-trash-alt task-delete" 
              onClick={() => deleteTask(task.id)}
            ></i>
          </div>
        ))}
      </div>

      <div className="add-task-row">
        <input
          type="text"
          placeholder="Add new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>
          <i className="fas fa-plus"></i> Add
        </button>
      </div>
    </div>
  );
}

export default TaskManager;