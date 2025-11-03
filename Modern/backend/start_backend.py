#!/usr/bin/env python3
"""
Simple script to start the FastAPI backend with clear output
"""
import sys
import os

# Ensure we're in the right directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

print("=" * 60)
print("  FastAPI Backend Startup")
print("=" * 60)
print()

# Step 1: Check Python version
print("✓ Python version:", sys.version.split()[0])

# Step 2: Check dependencies
print("\n[1/4] Checking dependencies...")
try:
    import fastapi
    print(f"   ✓ fastapi {fastapi.__version__}")
except ImportError as e:
    print(f"   ✗ fastapi not found: {e}")
    print("   Install with: pip3 install --user fastapi")
    sys.exit(1)

try:
    import uvicorn
    print(f"   ✓ uvicorn {uvicorn.__version__}")
except ImportError as e:
    print(f"   ✗ uvicorn not found: {e}")
    print("   Install with: pip3 install --user 'uvicorn[standard]'")
    sys.exit(1)

try:
    import sqlalchemy
    print(f"   ✓ sqlalchemy {sqlalchemy.__version__}")
except ImportError as e:
    print(f"   ✗ sqlalchemy not found: {e}")
    print("   Install with: pip3 install --user sqlalchemy")
    sys.exit(1)

try:
    import pydantic
    print(f"   ✓ pydantic {pydantic.__version__}")
except ImportError as e:
    print(f"   ✗ pydantic not found: {e}")
    print("   Install with: pip3 install --user pydantic")
    sys.exit(1)

# Step 3: Import app
print("\n[2/4] Importing application...")
try:
    from app.main import app
    print("   ✓ App imported successfully")
except Exception as e:
    print(f"   ✗ Failed to import app: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

# Step 4: Test database connection
print("\n[3/4] Testing database connection...")
try:
    from app.database import engine
    from sqlalchemy import text
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    print("   ✓ Database connection OK")
except Exception as e:
    print(f"   ⚠ Database connection warning: {e}")
    print("   (Server will start, but database operations may fail)")

# Step 5: Start server
print("\n[4/4] Starting server...")
print("\n" + "=" * 60)
print("  Server starting on http://127.0.0.1:3001")
print("  API docs: http://127.0.0.1:3001/docs")
print("  Health check: http://127.0.0.1:3001/api/health")
print("=" * 60)
print("\nPress Ctrl+C to stop the server\n")

try:
    import uvicorn
    uvicorn.run(
        app,
        host="127.0.0.1",
        port=3001,
        reload=False,  # Disable reload for cleaner output
        log_level="info"
    )
except KeyboardInterrupt:
    print("\n\n✓ Server stopped by user")
except Exception as e:
    print(f"\n✗ Error starting server: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

