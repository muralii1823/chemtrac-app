#!/bin/bash
set -e
echo "Upgrading pip and build tools..."
pip install --upgrade pip setuptools wheel
echo "Installing dependencies with pre-built wheels..."
# Force use of pre-built wheels, avoid source builds
pip install --only-binary :all: --upgrade pip
pip install --only-binary :all: -r requirements.txt
echo "Build completed successfully!"

