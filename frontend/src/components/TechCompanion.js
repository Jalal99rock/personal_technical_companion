import React, { useState } from 'react';

function TechCompanion({ qaHistory, setQaHistory }) {
  const [qaInput, setQaInput] = useState('');

  // Simulated NLP response (in real app, call API)
  const getResponse = (question) => {
    const lower = question.toLowerCase();
    if (lower.includes('python') || lower.includes('django')) {
      return 'Leverage Django’s ORM, use select_related/prefetch_related, and structure views with class-based views or DRF.';
    } else if (lower.includes('react') || lower.includes('frontend')) {
      return 'Use functional components, hooks (useState, useEffect), and manage global state with Context or Redux Toolkit.';
    } else if (lower.includes('mysql') || lower.includes('database')) {
      return 'Optimize with indexes, avoid N+1 queries, use connection pooling, and consider read replicas.';
    } else if (lower.includes('error') || lower.includes('debug')) {
      return 'Use logging, breakpoints, and unit tests. For Django, enable DEBUG mode and check stack traces.';
    } else {
      return 'I can help with coding, error resolution, and learning resources. Could you specify the technology?';
    }
  };

  const handleAsk = () => {
    if (!qaInput.trim()) return;
    const question = qaInput.trim();
    const answer = getResponse(question);
    
    setQaHistory([
      ...qaHistory,
      { id: Date.now(), type: 'question', content: question },
      { id: Date.now() + 1, type: 'answer', content: answer },
    ]);
    setQaInput('');
  };

  const quickAsk = (text) => setQaInput(text);

  return (
    <div className="card">
      <div className="card-header">
        <h2><i className="fas fa-comment-dots"></i> Tech Companion</h2>
        <span className="badge-pill"><i className="fas fa-microchip"></i> NLP</span>
      </div>

      <div className="qa-scroll">
        {qaHistory.map(item => (
          <div 
            className={`qa-bubble ${item.type === 'answer' ? 'answer' : ''}`} 
            key={item.id}
          >
            <div className="qa-label">
              {item.type === 'question' ? (
                <><i className="fas fa-user"></i> You</>
              ) : (
                <><i className="fas fa-robot"></i> Assistant</>
              )}
            </div>
            <div className="qa-text">{item.content}</div>
          </div>
        ))}
      </div>

      <div className="quick-chips">
        <span onClick={() => quickAsk('How to use React hooks?')}>
          ⚛️ React hooks
        </span>
        <span onClick={() => quickAsk('Django model best practices')}>
          🐍 Django models
        </span>
        <span onClick={() => quickAsk('MySQL indexing strategies')}>
          🗄️ MySQL
        </span>
        <span onClick={() => quickAsk('Explain Python decorators')}>
          🧩 Decorators
        </span>
      </div>

      <div className="qa-input-row">
        <input
          type="text"
          placeholder="Ask about code, errors, concepts..."
          value={qaInput}
          onChange={(e) => setQaInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
        />
        <button onClick={handleAsk}>
          <i className="fas fa-paper-plane"></i> Ask
        </button>
      </div>
      
      <div className="text-xs text-muted" style={{ marginTop: '0.5rem' }}>
        <i className="fas fa-lightbulb"></i> Try: "React hooks", "Django error", "MySQL query"
      </div>
    </div>
  );
}

export default TechCompanion;