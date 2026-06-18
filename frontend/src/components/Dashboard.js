import React, { useState, useEffect } from 'react';
import TaskManager from './TaskManager';
import TechCompanion from './TechCompanion';
import GoalTracker from './GoalTracker';
import Footer from './Footer';
import '../styles/theme.css';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [qaHistory, setQaHistory] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // In a real app, fetch from API
  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      try {
        // Mock data for demonstration
        setTasks([
          { id: 1, title: 'Design Django REST API schema', done: false, priority: 'high' },
          { id: 2, title: 'Implement JWT authentication', done: false, priority: 'high' },
          { id: 3, title: 'Write unit tests', done: false, priority: 'med' },
        ]);
        setQaHistory([
          { id: 1, type: 'question', content: 'How to structure Django models?' },
          { id: 2, type: 'answer', content: 'Use abstract base classes and keep business logic in models.' },
        ]);
        setGoals([
          { id: 1, title: 'Complete MVP', progress: 65, target_date: '2026-07-01' },
        ]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex-center" style={{ minHeight: '400px' }}>Loading...</div>;
  }

  return (
    <div className="dashboard-grid">
      <div className="left-column">
        <TaskManager tasks={tasks} setTasks={setTasks} />
        <GoalTracker goals={goals} setGoals={setGoals} />
      </div>
      <div className="right-column">
        <TechCompanion qaHistory={qaHistory} setQaHistory={setQaHistory} />
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;