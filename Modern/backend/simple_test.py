#!/usr/bin/env python3
"""Simple test that will definitely show output"""
import sys
print("Starting test...", file=sys.stderr)
sys.stderr.flush()

try:
    print("\n[1] Importing app...")
    from app.main import app
    print("✓ App imported")
    
    print("\n[2] Testing route...")
    from fastapi.testclient import TestClient
    client = TestClient(app)
    
    print("Calling /api/tests endpoint...")
    response = client.get('/api/tests')
    
    print(f"\nStatus Code: {response.status_code}")
    print(f"Response headers: {dict(response.headers)}")
    print(f"Response body: {response.text[:500]}")
    
    if response.status_code == 200:
        import json
        try:
            data = response.json()
            print(f"\n✅ SUCCESS! Got {len(data)} tests")
            print(f"Data: {json.dumps(data, indent=2)}")
        except:
            print("Response is not JSON")
    else:
        print(f"\n❌ FAILED: HTTP {response.status_code}")
        print(f"Full response: {response.text}")
        
except Exception as e:
    print(f"\n❌ ERROR: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

