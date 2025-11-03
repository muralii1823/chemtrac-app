#!/usr/bin/env python3
"""Quick test to find the exact error"""
import sys
import traceback

print("=" * 70)
print("QUICK BACKEND TEST")
print("=" * 70)
print()

# Test 1: Import
print("[1] Testing imports...")
try:
    from app.main import app
    from fastapi.testclient import TestClient
    print("   ✓ Imports OK")
except Exception as e:
    print(f"   ✗ Import failed: {e}")
    traceback.print_exc()
    sys.exit(1)

# Test 2: Database
print("\n[2] Testing database...")
try:
    from app.database import get_db, TestDB
    from sqlalchemy import desc
    
    db = next(get_db())
    tests = db.query(TestDB).order_by(desc(TestDB.createdAt)).all()
    print(f"   ✓ Database OK: {len(tests)} tests")
    db.close()
except Exception as e:
    print(f"   ✗ Database failed: {e}")
    traceback.print_exc()
    sys.exit(1)

# Test 3: Route function
print("\n[3] Testing route function...")
try:
    from app.routes.tests import get_all_tests
    db = next(get_db())
    result = get_all_tests(db)
    db.close()
    print(f"   ✓ Route function OK: {len(result)} items")
except Exception as e:
    print(f"   ✗ Route function failed: {e}")
    traceback.print_exc()
    sys.exit(1)

# Test 4: FastAPI route
print("\n[4] Testing FastAPI endpoint...")
try:
    client = TestClient(app)
    response = client.get('/api/tests')
    
    print(f"   Status: {response.status_code}")
    if response.status_code == 200:
        print(f"   ✓ SUCCESS! Response: {response.json()}")
    else:
        print(f"   ✗ FAILED")
        print(f"   Response: {response.text}")
        sys.exit(1)
except Exception as e:
    print(f"   ✗ FastAPI test failed: {e}")
    traceback.print_exc()
    sys.exit(1)

print("\n" + "=" * 70)
print("✅ ALL TESTS PASSED!")
print("=" * 70)

