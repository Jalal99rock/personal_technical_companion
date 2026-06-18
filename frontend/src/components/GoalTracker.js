import React from 'react';

function GoalTracker({ goals, setGoals }) {
  if (!goals || goals.length === 0) {
    return (
      <div className="goal-card">
        <div className="goal-row">
          <span className="goal-label">
            <i className="fas fa-bullseye" style={{ color: '#2563a8' }}></i> Goals
          </span>
          <span className="text-muted">No goals set</span>
        </div>
      </div>
    );
  }

  const goal = goals[0]; // Simple: show first goal
  const progress = Math.round(goal.progress);

  return (
    <div className="goal-card">
      <div className="goal-row">
        <span className="goal-label">
          <i className="fas fa-bullseye" style={{ color: '#2563a8' }}></i> {goal.title}
        </span>
        <span style={{ fontWeight: 500, color: '#14273e' }}>{progress}%</span>
      </div>
      <div className="goal-bar-bg">
        <div className="goal-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="goal-meta">
        <span><i className="fas fa-calendar-alt"></i> Due: {goal.target_date}</span>
        <span><i className="fas fa-rocket"></i> {progress > 70 ? 'On track!' : 'Keep going!'}</span>
      </div>
    </div>
  );
}

export default GoalTracker;