#!/bin/bash
cd "$(dirname "$0")"

echo "Starting backend with full logging..."
echo ""

source venv/bin/activate

# Start with maximum logging
python3 -m uvicorn app.main:app \
    --host 127.0.0.1 \
    --port 3001 \
    --log-level trace \
    --reload

