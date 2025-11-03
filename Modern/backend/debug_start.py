#!/usr/bin/env python3
"""Start backend with full error visibility"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Enable detailed error output
import logging
logging.basicConfig(level=logging.DEBUG)

print("=" * 70)
print("Starting FastAPI Backend with Debug Mode")
print("=" * 70)
print()

try:
    # Test imports
    print("Testing imports...")
    from app.main import app
    print("✓ App imported")
    
    # Test database
    print("\nTesting database connection...")
    from app.database import get_db, TestDB
    db = next(get_db())
    from sqlalchemy import desc
    tests = db.query(TestDB).order_by(desc(TestDB.createdAt)).all()
    print(f"✓ Database OK: {len(tests)} tests")
    db.close()
    
    # Test route
    print("\nTesting route...")
    from fastapi.testclient import TestClient
    client = TestClient(app)
    response = client.get('/api/tests')
    print(f"✓ Route test: HTTP {response.status_code}")
    if response.status_code != 200:
        print(f"  Error: {response.text[:200]}")
    
    print("\n" + "=" * 70)
    print("All checks passed. Starting server...")
    print("=" * 70)
    print("\nServer will run on: http://127.0.0.1:3001")
    print("Press Ctrl+C to stop\n")
    
    import uvicorn
    uvicorn.run(
        app,
        host="127.0.0.1",
        port=3001,
        log_level="debug",
        reload=False
    )
    
except KeyboardInterrupt:
    print("\n\n✓ Server stopped")
except Exception as e:
    print(f"\n✗ FATAL ERROR: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

