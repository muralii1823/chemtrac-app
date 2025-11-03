#!/bin/bash
cd "$(dirname "$0")"

echo "======================================"
echo "Setting up Virtual Environment"
echo "======================================"
echo ""

# Remove old venv if exists
if [ -d "venv" ]; then
    echo "Removing old venv..."
    rm -rf venv
fi

# Create venv with Python 3.11
echo "[1] Creating venv with Python 3.11..."
python3.11 -m venv venv

# Wait a moment for creation
sleep 2

# Verify it was created
echo "[2] Verifying venv creation..."
if [ ! -f "venv/bin/activate" ]; then
    echo "❌ ERROR: venv creation failed!"
    exit 1
fi

echo "✅ venv created successfully"
ls -la venv/bin/ | head -5

# Activate and install dependencies
echo ""
echo "[3] Activating venv and installing dependencies..."
source venv/bin/activate

echo "[4] Upgrading pip..."
pip install --upgrade pip

echo "[5] Installing requirements..."
pip install -r requirements.txt

echo ""
echo "======================================"
echo "✅ Virtual environment setup complete!"
echo "======================================"
echo ""
echo "To activate venv manually:"
echo "  source venv/bin/activate"
echo ""
echo "To start backend:"
echo "  ./start_venv.sh"
