#!/bin/bash
# Simple script to activate venv and show instructions
cd "$(dirname "$0")"

if [ ! -d "venv" ]; then
    echo "❌ venv not found!"
    echo "Run: ./setup_venv.sh first"
    exit 1
fi

echo "======================================"
echo "Activating Virtual Environment"
echo "======================================"
echo ""
echo "Run this command in your terminal:"
echo ""
echo "  cd $(pwd)"
echo "  source venv/bin/activate"
echo ""
echo "You should see (venv) in your prompt!"
echo ""
echo "Then start backend with:"
echo "  uvicorn app.main:app --reload --host 127.0.0.1 --port 3001"
echo ""

