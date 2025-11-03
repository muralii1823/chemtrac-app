#!/bin/bash
# Start FastAPI backend without requiring venv
# Dependencies should be installed with: pip3 install --user -r requirements.txt

cd "$(dirname "$0")"

echo "Starting FastAPI backend..."
echo "Using system Python (dependencies installed with --user flag)"
echo ""

# Check if dependencies are available
if ! python3 -c "import fastapi, uvicorn" 2>/dev/null; then
    echo "⚠ Warning: Some dependencies may not be available"
    echo "Install them with: pip3 install --user -r requirements.txt"
    echo ""
fi

# Initialize database if needed
python3 init_db.py 2>&1 | grep -v "^$" || true

echo "Starting server on http://127.0.0.1:3001"
echo "Press Ctrl+C to stop"
echo ""

python3 -m uvicorn app.main:app --host 127.0.0.1 --port 3001 --reload
