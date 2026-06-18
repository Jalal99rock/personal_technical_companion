import React from 'react';

function Footer() {
  return (
    <div className="footer-row">
      <div>
        <i className="fas fa-layer-group"></i> modular backend · scalable · Django REST + MySQL
      </div>
      <div className="stack">
        <span><i className="fab fa-python"></i> Django</span>
        <span><i className="fab fa-react"></i> React</span>
        <span><i className="fas fa-database"></i> MySQL</span>
        <span><i className="fas fa-brain"></i> NLP</span>
        <span><i className="fas fa-code"></i> REST API</span>
      </div>
    </div>
  );
}

export default Footer;