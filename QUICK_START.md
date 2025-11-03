# Quick Start Guide - POC Demo

This guide will help you quickly run both the legacy and modern applications side-by-side for your customer demo.

## Prerequisites Check

Before starting, ensure you have:
- ✅ Python 3.9+ installed (`python --version`)
- ✅ Node.js 18+ installed (`node --version`)
- ✅ .NET 8.0 SDK installed (`dotnet --version`)

## Demo Setup - 3 Terminal Windows

### Terminal 1: Legacy ASP.NET App
```bash
cd ASPNetLegacy/LegacySim
dotnet restore
dotnet run
```
**Access:** http://localhost:5000 or https://localhost:5001

### Terminal 2: Modern FastAPI Backend
```bash
cd Modern/backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 3001
```
**Access:** 
- API: http://localhost:3001
- API Docs: http://localhost:3001/docs

### Terminal 3: Modern React Frontend
```bash
cd Modern/frontend
npm install
npm run dev
```
**Access:** http://localhost:3000

## Demo Flow

### 1. Show Legacy Application
- Navigate to http://localhost:5000
- Demonstrate:
  - View Tests page (full page reload)
  - Create Test form (form submission with page reload)
  - Traditional server-side rendering
  - Bootstrap 3 styling

### 2. Show Modern Application
- Navigate to http://localhost:3000
- Demonstrate:
  - Instant navigation (no page reloads)
  - Create Test with smooth UX
  - Responsive design
  - Modern UI/UX

### 3. Show FastAPI Backend
- Navigate to http://localhost:3001/docs
- Demonstrate:
  - Auto-generated API documentation
  - Interactive API testing
  - OpenAPI specification
  - Type-safe models (Pydantic)

## Key Points to Highlight

1. **Performance**: FastAPI is one of the fastest Python frameworks
2. **Developer Experience**: Auto-generated docs, type safety
3. **Modern UX**: No page reloads, smooth interactions
4. **Scalability**: API-first architecture allows multiple clients
5. **Maintainability**: Clear separation of frontend and backend
6. **Future-Proof**: Easy to add features, integrate with modern tools

## Troubleshooting

### Backend won't start
- Make sure virtual environment is activated
- Check Python version: `python --version` (need 3.9+)
- Reinstall dependencies: `pip install -r requirements.txt --force-reinstall`

### Frontend won't start
- Make sure Node.js is installed
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check port 3000 is not in use

### Legacy app won't start
- Make sure .NET SDK 8.0 is installed
- Restore packages: `dotnet restore`
- Check if port 5000/5001 is available

## Database Notes

- **Legacy**: Uses `ASPNetLegacy/LegacySim/app.db`
- **Modern**: Uses `Modern/backend/data/app.db`
- Both use SQLite but are separate databases for demo purposes
- In production, you'd migrate data from legacy to modern

