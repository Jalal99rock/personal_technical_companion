"""
NLP helper functions for the technical companion.
Currently implements keyword-based responses, can be extended with ML models.
"""

import re
from typing import Dict, List, Tuple

# Knowledge base for technical questions
RESPONSE_PATTERNS: Dict[str, List[Tuple[str, str]]] = {
    'python': [
        (r'(python|django|flask)', 'Leverage Python best practices: use type hints, virtual environments, and follow PEP 8. For Django, use class-based views and DRF for APIs.'),
    ],
    'react': [
        (r'(react|frontend|javascript|js)', 'Use functional components with hooks (useState, useEffect). Manage state with Context API or Redux Toolkit. Follow component-based architecture.'),
    ],
    'database': [
        (r'(mysql|sql|database|postgres|mongodb)', 'Optimize queries with indexes, avoid N+1 queries, use connection pooling, and consider read replicas for scaling.'),
    ],
    'debugging': [
        (r'(error|debug|bug|exception)', 'Use logging, breakpoints, and unit tests. For Django, enable DEBUG mode and check stack traces. Use try-except blocks for graceful error handling.'),
    ],
    'devops': [
        (r'(deploy|devops|docker|kubernetes|aws|cloud)', 'Use Docker for containerization, CI/CD pipelines (GitHub Actions, Jenkins), and cloud platforms like AWS, GCP, or Azure.'),
    ],
    'architecture': [
        (r'(architecture|design pattern|microservice|rest|api)', 'Follow RESTful principles, use modular architecture, implement proper error handling, and consider caching strategies.'),
    ],
}

def get_technical_answer(question: str) -> str:
    """
    Get a technical answer based on the question using keyword matching.
    Extendable with ML models for better accuracy.
    
    Args:
        question: The user's question string
        
    Returns:
        A helpful technical answer string
    """
    question_lower = question.lower()
    
    # Check for matching patterns
    for category, patterns in RESPONSE_PATTERNS.items():
        for pattern, response in patterns:
            if re.search(pattern, question_lower):
                return response
    
    # Default response for unmatched queries
    return """I can help with various technical topics including:
    • Python/Django development
    • React/JavaScript frontend
    • Database optimization (MySQL, PostgreSQL)
    • Debugging and error resolution
    • DevOps and deployment
    • Software architecture
    
    Could you please specify your question in more detail?"""

def extract_keywords(text: str) -> List[str]:
    """
    Extract keywords from text for potential ML processing.
    
    Args:
        text: The input text
        
    Returns:
        List of extracted keywords
    """
    # Simple keyword extraction (can be enhanced with NLP libraries)
    words = re.findall(r'\b[a-z]{3,}\b', text.lower())
    return list(set(words))

def categorize_question(question: str) -> str:
    """
    Categorize the question based on content.
    
    Args:
        question: The user's question
        
    Returns:
        Category string
    """
    categories = {
        'python': ['python', 'django', 'flask', 'pip', 'venv'],
        'react': ['react', 'javascript', 'js', 'frontend', 'ui', 'component'],
        'database': ['mysql', 'sql', 'database', 'query', 'index'],
        'debugging': ['error', 'debug', 'bug', 'exception', 'traceback'],
        'devops': ['deploy', 'docker', 'kubernetes', 'aws', 'cloud', 'ci/cd'],
        'architecture': ['architecture', 'design', 'pattern', 'microservice', 'rest'],
    }
    
    question_lower = question.lower()
    for category, keywords in categories.items():
        if any(keyword in question_lower for keyword in keywords):
            return category
    
    return 'general'