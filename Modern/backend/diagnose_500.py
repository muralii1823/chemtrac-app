#!/usr/bin/env python3
"""Diagnose the 500 error - identify root cause"""
import sys
import traceback

def test_step(name, func):
    print(f"\n{'='*70}")
    print(f"[{name}]")
    print('='*70)
    try:
        result = func()
        print(f"✅ PASSED")
        return result
    except Exception as e:
        print(f"❌ FAILED: {e}")
        print("\nFull traceback:")
        traceback.print_exc()
        return None

# Step 1: Database connection
def test_db_connection():
    from app.database import engine
    from sqlalchemy import text
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        return result.fetchone()

# Step 2: ORM query
def test_orm_query():
    from app.database import get_db, TestDB
    from sqlalchemy import desc
    db = next(get_db())
    try:
        tests = db.query(TestDB).order_by(desc(TestDB.createdAt)).all()
        return len(tests)
    finally:
        db.close()

# Step 3: Route function
def test_route_function():
    from app.routes.tests import get_all_tests
    from app.database import get_db
    db = next(get_db())
    try:
        result = get_all_tests(db)
        return result
    finally:
        db.close()

# Step 4: FastAPI endpoint
def test_fastapi_endpoint():
    from app.main import app
    from fastapi.testclient import TestClient
    client = TestClient(app)
    response = client.get('/api/tests')
    return response

print("=" * 70)
print("500 ERROR ROOT CAUSE ANALYSIS")
print("=" * 70)

# Run tests
db_ok = test_step("1. Database Connection", test_db_connection)
if not db_ok:
    print("\n🔴 ROOT CAUSE: Database connection issue!")
    sys.exit(1)

orm_ok = test_step("2. ORM Query", test_orm_query)
if orm_ok is None:
    print("\n🔴 ROOT CAUSE: ORM/Query issue!")
    sys.exit(1)
print(f"   Found {orm_ok} tests in database")

route_ok = test_step("3. Route Function", test_route_function)
if route_ok is None:
    print("\n🔴 ROOT CAUSE: Route function issue!")
    sys.exit(1)
print(f"   Route returned {len(route_ok)} items")
if route_ok:
    print(f"   Sample: {route_ok[0]}")

endpoint_ok = test_step("4. FastAPI Endpoint", test_fastapi_endpoint)
if endpoint_ok is None:
    print("\n🔴 ROOT CAUSE: FastAPI endpoint issue!")
    sys.exit(1)

print(f"\n   Status: {endpoint_ok.status_code}")
if endpoint_ok.status_code == 200:
    print("   ✅ All tests passed - no issues found!")
    data = endpoint_ok.json()
    print(f"   Returned {len(data)} tests")
else:
    print(f"   ❌ HTTP {endpoint_ok.status_code}")
    print(f"   Response: {endpoint_ok.text[:500]}")
    print("\n🔴 ROOT CAUSE: FastAPI serialization/response issue!")

print("\n" + "=" * 70)
print("DIAGNOSIS COMPLETE")
print("=" * 70)

