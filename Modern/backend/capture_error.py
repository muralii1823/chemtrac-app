#!/usr/bin/env python3
"""Capture the actual error from the backend"""
import sys
import subprocess
import time
import requests

print("=" * 70)
print("ERROR CAPTURE TEST")
print("=" * 70)

# Start backend
print("\n[1] Starting backend server...")
process = subprocess.Popen(
    ['python3', '-m', 'uvicorn', 'app.main:app', '--host', '127.0.0.1', '--port', '3001'],
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,
    text=True,
    bufsize=1
)

# Wait for server to start
time.sleep(6)

print("[2] Making request to /api/tests...")
try:
    response = requests.get('http://localhost:3001/api/tests', timeout=5)
    print(f"   Status: {response.status_code}")
    print(f"   Response length: {len(response.text)}")
    
    if response.status_code == 200:
        print("   ✅ SUCCESS!")
        import json
        data = response.json()
        print(f"   Tests: {len(data)}")
    else:
        print(f"   ❌ ERROR: {response.status_code}")
        print(f"   Response: {response.text[:500]}")
        
except Exception as e:
    print(f"   ❌ Request exception: {e}")

print("\n[3] Backend output (last 50 lines):")
print("-" * 70)

# Read output
output_lines = []
try:
    for line in iter(process.stdout.readline, ''):
        if not line:
            break
        output_lines.append(line.rstrip())
        if len(output_lines) > 50:
            output_lines.pop(0)
            
        # Check for errors
        if 'ERROR' in line or 'Exception' in line or 'Traceback' in line:
            print(line.rstrip())
except:
    pass

# Kill process
process.terminate()
process.wait(timeout=5)

# Print last lines
print("\nFull output:")
for line in output_lines[-30:]:
    print(line)

print("\n" + "=" * 70)

