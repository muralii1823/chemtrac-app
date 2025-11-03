#!/bin/bash
cd "$(dirname "$0")"

echo "======================================"
echo "Backend Diagnostic & Startup"
echo "======================================"
echo ""

# Test database connection
echo "[1] Testing database connection..."
python3 << 'PYEOF'
import sys
try:
    from app.database import get_db, TestDB
    from sqlalchemy import desc
    
    db = next(get_db())
    tests = db.query(TestDB).order_by(desc(TestDB.createdAt)).all()
    print(f"   ✓ OK: {len(tests)} tests in database")
    db.close()
except Exception as e:
    print(f"   ✗ FAILED: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
PYEOF

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Database test failed. Fix database issues first."
    exit 1
fi

echo ""
echo "[2] Testing route function..."
python3 << 'PYEOF'
import sys
try:
    from app.routes.tests import get_all_tests
    from app.database import get_db
    
    db = next(get_db())
    result = get_all_tests(db)
    db.close()
    print(f"   ✓ OK: Route returns {len(result)} items")
except Exception as e:
    print(f"   ✗ FAILED: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
PYEOF

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Route test failed."
    exit 1
fi

echo ""
echo "[3] Testing FastAPI endpoint..."
python3 << 'PYEOF'
import sys
try:
    from app.main import app
    from fastapi.testclient import TestClient
    
    client = TestClient(app)
    response = client.get('/api/tests')
    
    if response.status_code == 200:
        import json
        data = response.json()
        print(f"   ✓ OK: HTTP {response.status_code}, {len(data)} tests")
    else:
        print(f"   ✗ FAILED: HTTP {response.status_code}")
        print(f"   Response: {response.text[:300]}")
        sys.exit(1)
except Exception as e:
    print(f"   ✗ FAILED: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
PYEOF

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ API endpoint test failed."
    exit 1
fi

echo ""
echo "======================================"
echo "✅ All tests passed! Starting server..."
echo "======================================"
echo ""
echo "Server will run on: http://127.0.0.1:3001"
echo "Press Ctrl+C to stop"
echo ""

python3 -m uvicorn app.main:app --host 127.0.0.1 --port 3001 --reload

