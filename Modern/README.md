# Modern Test Application - POC

A modern full-stack application built with **React + TypeScript** (frontend) and **FastAPI** (Python backend), demonstrating a modernization path for the legacy ASP.NET Core MVC application.

## Project Structure

```
Modern/
├── frontend/          # React + TypeScript frontend (Vite)
│   ├── src/
│   │   ├── api/      # API client
│   │   ├── components/   # React components
│   │   ├── pages/    # Page components
│   │   └── types.ts  # TypeScript types
│   └── package.json
└── backend/          # FastAPI backend (Python)
    ├── app/
    │   ├── models.py     # Pydantic models
    │   ├── database.py   # SQLAlchemy database setup
    │   ├── routes/       # API routes
    │   │   └── tests.py
    │   └── main.py       # FastAPI app entry point
    └── requirements.txt
```

## Prerequisites

- **Python 3.9+** (for backend)
- **Node.js 18+** (for frontend)
- **npm** or **yarn**
- **MySQL Server** (local installation)

## Setup Instructions

### Backend Setup (FastAPI)

1. Navigate to the backend directory:
```bash
cd Modern/backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure MySQL database:
   - Make sure MySQL is running locally
   - Set environment variables (or use defaults):
     ```bash
     export MYSQL_HOST=localhost
     export MYSQL_PORT=3306
     export MYSQL_USER=root
     export MYSQL_PASSWORD=your_password
     export MYSQL_DATABASE=chemical_tests
     ```
   - Or create a `.env` file with these values

5. Initialize the database:
```bash
python init_db.py
```
This will create the database and tables if they don't exist.

6. Start the development server:
```bash
python -m uvicorn app.main:app --reload --port 3001
```

Or run directly:
```bash
python app/main.py
```

The backend will run on `http://localhost:3001`
- API documentation: `http://localhost:3001/docs` (Swagger UI)
- Alternative docs: `http://localhost:3001/redoc`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd Modern/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Features

- **Modern UI**: Built with React and TypeScript for type safety
- **FastAPI Backend**: High-performance Python API with automatic OpenAPI documentation
- **RESTful API**: Clean API architecture with async/await support
- **MySQL Database**: Production-ready MySQL database with connection pooling (SQLAlchemy ORM)
- **CRUD Operations**: Create, Read, Update, Delete tests
- **Responsive Design**: Works on all device sizes
- **Auto Documentation**: Interactive API docs at `/docs` endpoint

## API Endpoints

- `GET /api/tests` - Get all tests
- `GET /api/tests/:id` - Get test by ID
- `POST /api/tests` - Create a new test
- `PUT /api/tests/:id` - Update a test
- `DELETE /api/tests/:id` - Delete a test
- `GET /api/health` - Health check endpoint

## Database

The backend uses **MySQL** for data persistence. 

### Database Configuration

Database settings can be configured via environment variables:

- `MYSQL_HOST` (default: `localhost`)
- `MYSQL_PORT` (default: `3306`)
- `MYSQL_USER` (default: `root`)
- `MYSQL_PASSWORD` (default: empty string)
- `MYSQL_DATABASE` (default: `chemical_tests`)

### Database Initialization

Run the initialization script to create the database and tables:

```bash
python init_db.py
```

This script will:
- Create the database if it doesn't exist
- Create all necessary tables
- Set up proper character encoding (utf8mb4)

