#!/bin/bash
cd "$(dirname "$0")"

echo "Starting FastAPI backend..."
echo ""

# Check if uvicorn is installed
if ! python3 -c "import uvicorn" 2>/dev/null; then
    echo "❌ Error: uvicorn is not installed"
    echo "Install it with: pip3 install --user uvicorn[standard]"
    exit 1
fi

# Test app import
if ! python3 -c "from app.main import app" 2>/dev/null; then
    echo "❌ Error: Cannot import app"
    echo "Checking for errors..."
    python3 -c "from app.main import app" 2>&1
    exit 1
fi

echo "✅ Dependencies OK"
echo "✅ App imports OK"
echo ""
echo "Starting server on http://127.0.0.1:3001"
echo "Press Ctrl+C to stop"
echo ""

python3 -m uvicorn app.main:app --host 127.0.0.1 --port 3001 --reload

