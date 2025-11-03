#!/bin/bash
set -e
echo "Upgrading pip..."
pip install --upgrade pip
echo "Installing build tools..."
pip install setuptools wheel
echo "Installing dependencies with pre-built wheels only..."
# Force use of pre-built wheels only - fail if wheel not available
pip install --prefer-binary --only-binary :all: -r requirements.txt
echo "Build completed successfully!"

