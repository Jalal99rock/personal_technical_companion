// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State variables
  const [tasks, setTasks] = useState([]);
  const [qaHistory, setQaHistory] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [qaInput, setQaInput] = useState('');
  const [goalProgress, setGoalProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  // ----- API CALLS -----
  
  // 1. GET all tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tasks/');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // If API fails, use mock data as fallback
      setTasks([
        { id: 1, title: 'Design Django REST API schema', done: false, priority: 'high' },
        { id: 2, title: 'Implement JWT authentication', done: false, priority: 'high' },
      ]);
      setLoading(false);
    }
  };

  // 2. CREATE a new task
  const createTask = async (taskData) => {
    try {
      const response = await fetch('http://localhost:8000/api/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);
      // Fallback: add task locally
      const fallbackTask = { ...taskData, id: Date.now() };
      setTasks([...tasks, fallbackTask]);
      return fallbackTask;
    }
  };

  // 3. UPDATE a task (toggle done status)
  const updateTask = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      const updatedTask = await response.json();
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      // Fallback: update locally
      setTasks(tasks.map(t => t.id === id ? { ...t, ...updatedData } : t));
    }
  };

  // 4. DELETE a task
  const deleteTaskAPI = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      // Fallback: delete locally
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  // 5. ASK a question to the Q&A API
  const askQuestion = async (question) => {
    try {
      const response = await fetch('http://localhost:8000/api/qa/ask/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });
      if (!response.ok) {
        throw new Error('Failed to get answer');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error asking question:', error);
      // Fallback: local response
      return {
        question: question,
        answer: getLocalResponse(question)
      };
    }
  };

  // 6. GET goals from backend
  const fetchGoals = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/goals/');
      if (!response.ok) {
        throw new Error('Failed to fetch goals');
      }
      const data = await response.json();
      if (data.length > 0) {
        setGoalProgress(data[0].progress || 0);
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
      // Fallback: default progress
      setGoalProgress(65);
    }
  };

  // ----- LOCAL FALLBACK RESPONSES (when API fails) -----
  const getLocalResponse = (question) => {
    const lower = question.toLowerCase();
    if (lower.includes('react') || lower.includes('hooks')) {
      return 'Use functional components, hooks (useState, useEffect), and manage global state with Context or Redux Toolkit.';
    } else if (lower.includes('django') || lower.includes('model')) {
      return 'Use abstract base classes and keep business logic in models. Use class Meta for ordering and __str__ for readability.';
    } else if (lower.includes('mysql') || lower.includes('database')) {
      return 'Optimize with indexes, avoid N+1 queries, use connection pooling, and consider read replicas for scaling.';
    } else {
      return 'I can help with coding, error resolution, and learning resources. Could you specify the technology?';
    }
  };

  // ----- LOAD DATA ON COMPONENT MOUNT -----
  useEffect(() => {
    fetchTasks();
    fetchGoals();
    
    // Load some initial Q&A examples
    setQaHistory([
      { id: 1, type: 'question', content: 'How to structure Django models?' },
      { id: 2, type: 'answer', content: 'Use abstract base classes and keep business logic in models.' },
    ]);
  }, []);

  // ----- TASK HANDLERS (using API) -----
  const addTask = async () => {
    if (!newTask.trim()) return;
    
    const taskData = {
      title: newTask.trim(),
      done: false,
      priority: 'med',
    };
    
    await createTask(taskData);
    setNewTask('');
  };

  const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      await updateTask(id, { ...task, done: !task.done });
    }
  };

  const deleteTask = async (id) => {
    await deleteTaskAPI(id);
  };

  // ----- Q&A HANDLER (using API) -----
  const handleAsk = async () => {
    if (!qaInput.trim()) return;
    
    const question = qaInput.trim();
    
    // Add question to UI immediately
    setQaHistory([...qaHistory, 
      { id: Date.now(), type: 'question', content: question }
    ]);
    
    // Get answer from API
    const response = await askQuestion(question);
    
    // Add answer to UI
    setQaHistory(prev => [...prev, 
      { id: Date.now() + 1, type: 'answer', content: response.answer || getLocalResponse(question) }
    ]);
    
    setQaInput('');
  };

  const quickAsk = (text) => setQaInput(text);

  // ----- RENDER -----
  if (loading) {
    return (
      <div className="app-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div style={{ color: '#94a3b8' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', marginRight: '1rem' }}></i>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      {/* Glow effects */}
      <div className="glow glow-1"></div>
      <div className="glow glow-2"></div>

      {/* Header */}
      <header className="header">
        <div className="brand">
          <div className="brand-icon">
            <i className="fas fa-robot"></i>
          </div>
          <div>
            <h1>Personal & Technical Companion</h1>
            <div className="subtitle">
              <i className="fas fa-code" style={{ marginRight: '0.3rem' }}></i> 
              productivity · guidance · learning
            </div>
          </div>
        </div>
        <div className="tech-badges">
          <span><i className="fab fa-react"></i> React</span>
          <span><i className="fab fa-python"></i> Django</span>
          <span><i className="fas fa-database"></i> MySQL</span>
          <span><i className="fas fa-brain"></i> NLP</span>
        </div>
      </header>

      {/* Dashboard */}
      <div className="dashboard-grid">
        {/* Left Column */}
        <div>
          {/* Task Manager */}
          <div className="card">
            <div className="card-header">
              <h2><i className="fas fa-tasks"></i> Task Manager</h2>
              <span className="badge">{tasks.filter(t => !t.done).length} pending</span>
            </div>

            <div className="task-list">
              {tasks.length === 0 ? (
                <div style={{ color: '#64748b', textAlign: 'center', padding: '2rem 0' }}>
                  <i className="fas fa-inbox" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}></i>
                  No tasks yet. Add one below!
                </div>
              ) : (
                tasks.map(task => (
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
                      <span className={`task-priority ${task.priority || 'med'}`}>
                        {task.priority === 'high' ? 'High' : 
                         task.priority === 'med' ? 'Medium' : 'Low'}
                      </span>
                    </div>
                    <i className="fas fa-trash-alt task-delete" onClick={() => deleteTask(task.id)}></i>
                  </div>
                ))
              )}
            </div>

            <div className="add-task">
              <input 
                type="text" 
                placeholder="Add new task..." 
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
              />
              <button onClick={addTask}><i className="fas fa-plus"></i> Add</button>
            </div>
          </div>

          {/* Goal Tracker */}
          <div className="goal-card">
            <div className="goal-header">
              <span className="goal-title">
                <i className="fas fa-bullseye"></i> Complete MVP
              </span>
              <span className="goal-percentage">{Math.round(goalProgress)}%</span>
            </div>
            <div className="goal-bar">
              <div className="goal-bar-fill" style={{ width: `${goalProgress}%` }}></div>
            </div>
            <div className="goal-meta">
              <span><i className="fas fa-calendar-alt"></i> Due: 2026-07-01</span>
              <span className="goal-status">
                <i className="fas fa-rocket"></i> {goalProgress > 70 ? 'On track!' : 'Keep going!'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Tech Companion */}
          <div className="card">
            <div className="card-header">
              <h2><i className="fas fa-comment-dots"></i> Tech Companion</h2>
              <span className="badge"><i className="fas fa-microchip"></i> NLP</span>
            </div>

            <div className="qa-list">
              {qaHistory.map(item => (
                <div className="qa-item" key={item.id}>
                  <div className={item.type === 'question' ? 'qa-question' : 'qa-answer'}>
                    <div className="qa-label">
                      <i className={`fas fa-${item.type === 'question' ? 'user' : 'robot'}`}></i> 
                      {item.type === 'question' ? 'You' : 'Assistant'}
                    </div>
                    <div className="qa-text">{item.content}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="quick-chips">
              <span onClick={() => quickAsk('How to use React hooks?')}>
                <i className="fas fa-atom"></i> React hooks
              </span>
              <span onClick={() => quickAsk('Django model best practices')}>
                <i className="fab fa-python"></i> Django models
              </span>
              <span onClick={() => quickAsk('MySQL optimization tips')}>
                <i className="fas fa-database"></i> MySQL
              </span>
              <span onClick={() => quickAsk('What are Python decorators?')}>
                <i className="fas fa-puzzle-piece"></i> Decorators
              </span>
            </div>

            <div className="qa-input">
              <input 
                type="text" 
                placeholder="Ask about code, errors, concepts..." 
                value={qaInput}
                onChange={(e) => setQaInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              />
              <button onClick={handleAsk}><i className="fas fa-paper-plane"></i> Ask</button>
            </div>

            <div className="qa-hint">
              <i className="fas fa-lightbulb"></i> Try: "React hooks", "Django error", "MySQL query"
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <span className="footer-text">
          <i className="fas fa-layer-group"></i> modular backend · scalable · Django REST + MySQL
        </span>
        <div className="footer-badges">
          <span><i className="fab fa-python"></i> Django</span>
          <span><i className="fab fa-react"></i> React</span>
          <span><i className="fas fa-database"></i> MySQL</span>
          <span><i className="fas fa-brain"></i> NLP</span>
          <span><i className="fas fa-code"></i> REST API</span>
        </div>
      </footer>
    </div>
  );
}

export default App;