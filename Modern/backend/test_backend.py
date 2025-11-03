#!/usr/bin/env python3
"""
Test script to diagnose backend issues
Run this to see what errors are occurring
"""
import sys
import traceback

print("=" * 50)
print("Backend Diagnostic Test")
print("=" * 50)
print()

# Test 1: Database connection
print("1. Testing database connection...")
try:
    from app.database import engine, MYSQL_DATABASE
    from sqlalchemy import text
    
    with engine.connect() as conn:
        result = conn.execute(text('SELECT DATABASE()'))
        db = result.scalar()
        print(f"   ✓ Connected to: {db}")
        
        result = conn.execute(text("SELECT COUNT(*) FROM tests"))
        count = result.scalar()
        print(f"   ✓ Tests table has {count} records")
except Exception as e:
    print(f"   ✗ FAILED: {e}")
    traceback.print_exc()
    sys.exit(1)

# Test 2: Model query
print("\n2. Testing SQLAlchemy model...")
try:
    from app.database import TestDB, get_db
    
    db = next(get_db())
    tests = db.query(TestDB).all()
    print(f"   ✓ Query successful: {len(tests)} tests")
    
    if tests:
        test = tests[0]
        print(f"   ✓ Sample test: id={test.id}, name={test.name}, createdAt={test.createdAt}")
    
    db.close()
except Exception as e:
    print(f"   ✗ FAILED: {e}")
    traceback.print_exc()
    sys.exit(1)

# Test 3: Pydantic serialization
print("\n3. Testing Pydantic model conversion...")
try:
    from app.database import TestDB, get_db
    from app.models import Test
    
    db = next(get_db())
    test_db = db.query(TestDB).first()
    
    if not test_db:
        # Create a test record
        print("   Creating test record...")
        test_db = TestDB(name="Diagnostic Test", version="1.0", status="Draft")
        db.add(test_db)
        db.commit()
        db.refresh(test_db)
    
    # Convert to Pydantic
    test_model = Test.model_validate(test_db)
    print(f"   ✓ Pydantic conversion works")
    print(f"   ✓ Model data: {test_model.model_dump()}")
    
    db.close()
except Exception as e:
    print(f"   ✗ FAILED: {e}")
    traceback.print_exc()
    sys.exit(1)

# Test 4: FastAPI route
print("\n4. Testing FastAPI route...")
try:
    from fastapi.testclient import TestClient
    from app.main import app
    
    client = TestClient(app)
    response = client.get('/api/tests')
    
    if response.status_code == 200:
        data = response.json()
        print(f"   ✓ Route works! Returned {len(data)} tests")
    else:
        print(f"   ✗ Route failed with status {response.status_code}")
        print(f"   Error: {response.text[:500]}")
        sys.exit(1)
        
except Exception as e:
    print(f"   ✗ FAILED: {e}")
    traceback.print_exc()
    sys.exit(1)

print("\n" + "=" * 50)
print("✅ ALL TESTS PASSED!")
print("=" * 50)
print("\nYour backend should work now. Start it with:")
print("  python3 -m uvicorn app.main:app --host 127.0.0.1 --port 3001 --reload")

