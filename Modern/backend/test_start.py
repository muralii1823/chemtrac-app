#!/usr/bin/env python3
import sys
import os

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

print("Testing backend startup...")
print()

try:
    print("Importing app...")
    from app.main import app
    print("✅ App imported")
    
    print("Starting uvicorn...")
    import uvicorn
    
    print("\n" + "="*50)
    print("Server should start now. Check http://localhost:3001/api/health")
    print("Press Ctrl+C to stop")
    print("="*50 + "\n")
    
    uvicorn.run(
        app,
        host="127.0.0.1",
        port=3001,
        reload=False,
        log_level="info"
    )
except KeyboardInterrupt:
    print("\n✅ Server stopped")
except Exception as e:
    print(f"\n✗ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
