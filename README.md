
### `README.md` (Root)
```md
# Personal & Technical Companion

A full-stack application combining personal productivity tools with technical guidance capabilities.

## Overview
This application provides:
- Task management with priority system
- Technical Q&A assistant with NLP capabilities
- Goal tracking and progress visualization
- Modular, scalable architecture

## Tech Stack

### Backend
- Django 4.2
- Django REST Framework
- MySQL Database
- JWT Authentication
- NLP Utilities

### Frontend
- React 18
- Axios for API calls
- Modern CSS with glass-morphism design

## Project Structure
personal_technical_companion/
├── backend/ # Django REST API
│ ├── api/ # Main API app
│ └── companion/ # Project settings
├── frontend/ # React application
│ ├── src/
│ │ ├── components/ # UI components
│ │ ├── services/ # API integration
│ │ └── styles/ # CSS modules
│ └── public/
└── README.md



## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- pip and npm

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

```bash
cd frontend
npm install
npm start

---------------------------------------------------------
Access the Application
Frontend: http://localhost:3000

Backend API: http://localhost:8000/api/

Admin Panel: http://localhost:8000/admin/

 API Endpoints
Tasks
GET /api/tasks/ - List all tasks

POST /api/tasks/ - Create task

PUT /api/tasks/{id}/ - Update task

DELETE /api/tasks/{id}/ - Delete task

GET /api/tasks/pending/ - Get pending tasks

Q&A
GET /api/qa/ - List Q&A history

POST /api/qa/ask/ - Ask a question

Goals
GET /api/goals/ - List goals

POST /api/goals/update_progress/ - Update goal progress
