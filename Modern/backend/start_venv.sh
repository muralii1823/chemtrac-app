#!/bin/bash
cd "$(dirname "$0")"

echo "======================================"
echo "Starting FastAPI Backend with venv"
echo "======================================"
echo ""

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "❌ venv not found! Run ./setup_venv.sh first"
    exit 1
fi

# Verify venv was created
if [ ! -f "venv/bin/activate" ]; then
    echo "❌ venv/bin/activate not found! Run ./setup_venv.sh first"
    exit 1
fi

# Activate venv
echo "Activating virtual environment..."
source venv/bin/activate

# Verify activation (you should see (venv) in prompt)
echo "✓ Virtual environment activated"
echo "  Python: $(python --version)"
echo "  Pip: $(pip --version | cut -d' ' -f1-2)"
echo ""

echo "======================================"
echo "Starting server on http://127.0.0.1:3001"
echo "Press Ctrl+C to stop"
echo "======================================"
echo ""

# Start server with uvicorn
uvicorn app.main:app --reload --host 127.0.0.1 --port 3001

