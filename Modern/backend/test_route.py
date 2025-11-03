#!/usr/bin/env python3
"""Test the /api/tests route directly"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

print("=" * 60)
print("Testing /api/tests Route")
print("=" * 60)
print()

# Step 1: Test database connection
print("[1/3] Testing database connection...")
try:
    from app.database import get_db, TestDB, engine
    from sqlalchemy import text
    
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
    print("   ✓ Database connection OK")
except Exception as e:
    print(f"   ✗ Database connection failed: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

# Step 2: Test query
print("\n[2/3] Testing database query...")
try:
    db = next(get_db())
    from sqlalchemy import desc
    tests = db.query(TestDB).order_by(desc(TestDB.createdAt)).all()
    print(f"   ✓ Query successful: {len(tests)} tests")
    db.close()
except Exception as e:
    print(f"   ✗ Query failed: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

# Step 3: Test FastAPI route
print("\n[3/3] Testing FastAPI route...")
try:
    from fastapi.testclient import TestClient
    from app.main import app
    
    client = TestClient(app)
    response = client.get('/api/tests')
    
    print(f"   Status Code: {response.status_code}")
    
    if response.status_code == 200:
        print("   ✓ Route works!")
        data = response.json()
        print(f"   Returned {len(data)} tests")
        if data:
            print(f"   Sample: {data[0]}")
        else:
            print("   (Empty list - no tests in database)")
    else:
        print(f"   ✗ Route failed")
        print(f"   Response: {response.text[:500]}")
        sys.exit(1)
        
except Exception as e:
    print(f"   ✗ Route test failed: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

print("\n" + "=" * 60)
print("✅ All tests passed! Route is working correctly.")
print("=" * 60)

