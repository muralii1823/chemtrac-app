#!/bin/bash
set -e
echo "Upgrading pip..."
pip install --upgrade pip setuptools wheel
echo "Installing dependencies..."
pip install --only-binary=all -r requirements.txt || pip install -r requirements.txt
echo "Build completed successfully!"

