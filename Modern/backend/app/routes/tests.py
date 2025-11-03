from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List

from ..database import get_db, TestDB, ensure_tables_exist
from ..models import Test, TestCreate, TestUpdate

router = APIRouter(prefix="/tests", tags=["tests"])

@router.get("")
def get_all_tests(db: Session = Depends(get_db)):
    """Get all chemical tests"""
    # Ensure tables exist before querying
    ensure_tables_exist()
    import sys
    import json
    
    print(">>> get_all_tests CALLED", file=sys.stderr, flush=True)
    try:
        print(">>> Querying database...", file=sys.stderr, flush=True)
        # Query database
        tests = db.query(TestDB).order_by(desc(TestDB.createdAt)).all()
        print(f">>> Found {len(tests)} tests", file=sys.stderr, flush=True)
        
        # Return simple dicts - FastAPI handles serialization
        result = []
        for test in tests:
            created_at = None
            if test.createdAt:
                if hasattr(test.createdAt, 'isoformat'):
                    created_at = test.createdAt.isoformat()
                else:
                    created_at = str(test.createdAt)
            
            result.append({
                "id": test.id,
                "name": test.name or "",
                "description": test.description if test.description else None,
                "version": test.version or "1.0",
                "status": test.status or "Draft",
                "category": test.category if hasattr(test, 'category') else None,
                "priority": test.priority if hasattr(test, 'priority') else None,
                "testType": test.testType if hasattr(test, 'testType') else None,
                "assignedTo": test.assignedTo if hasattr(test, 'assignedTo') else None,
                "dueDate": test.dueDate.isoformat() if hasattr(test, 'dueDate') and test.dueDate else None,
                "notes": test.notes if hasattr(test, 'notes') else None,
                "createdAt": created_at
            })
        
        print(f">>> Returning {len(result)} items", file=sys.stderr, flush=True)
        # Test JSON serialization
        try:
            json.dumps(result)
            print(">>> JSON serialization OK", file=sys.stderr, flush=True)
        except Exception as e:
            print(f">>> JSON serialization ERROR: {e}", file=sys.stderr, flush=True)
            raise
        
        print(">>> About to return result...", file=sys.stderr, flush=True)
        # CRITICAL: Return JSONResponse with explicit CORS headers
        # This ensures headers are ALWAYS included in the response
        json_response = JSONResponse(content=result)
        json_response.headers["Access-Control-Allow-Origin"] = "*"
        json_response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH"
        json_response.headers["Access-Control-Allow-Headers"] = "*"
        json_response.headers["Access-Control-Allow-Credentials"] = "false"
        json_response.headers["Access-Control-Expose-Headers"] = "*"
        print(f">>> CORS headers set: Access-Control-Allow-Origin = {json_response.headers.get('Access-Control-Allow-Origin', 'NOT SET')}", file=sys.stderr, flush=True)
        return json_response
    except Exception as e:
        import traceback
        import sys
        error_msg = str(e)
        error_trace = traceback.format_exc()
        
        # Log to stderr so it shows in uvicorn logs
        print(f"\n{'='*60}", file=sys.stderr)
        print(f"ERROR in get_all_tests: {error_msg}", file=sys.stderr)
        print(f"{'='*60}", file=sys.stderr)
        print(error_trace, file=sys.stderr)
        print(f"{'='*60}\n", file=sys.stderr)
        sys.stderr.flush()
        
        # Return error - ensure detail is always a string
        detail_str = f"{type(e).__name__}: {error_msg}"
        raise HTTPException(status_code=500, detail=detail_str)

@router.get("/{test_id}", response_model=Test)
def get_test(test_id: int, db: Session = Depends(get_db)):
    """Get a specific test by ID"""
    test = db.query(TestDB).filter(TestDB.id == test_id).first()
    if not test:
        raise HTTPException(status_code=404, detail="Test not found")
    return test

@router.post("", status_code=201)
def create_test(test: TestCreate, db: Session = Depends(get_db)):
    """Create a new chemical test"""
    ensure_tables_exist()
    db_test = TestDB(**test.model_dump())
    db.add(db_test)
    db.commit()
    db.refresh(db_test)
    # Convert to dict and return with CORS headers
    created_at = None
    if db_test.createdAt:
        if hasattr(db_test.createdAt, 'isoformat'):
            created_at = db_test.createdAt.isoformat()
        else:
            created_at = str(db_test.createdAt)
    
    result = {
        "id": db_test.id,
        "name": db_test.name or "",
        "description": db_test.description if db_test.description else None,
        "version": db_test.version or "1.0",
        "status": db_test.status or "Draft",
        "category": db_test.category if hasattr(db_test, 'category') else None,
        "priority": db_test.priority if hasattr(db_test, 'priority') else None,
        "testType": db_test.testType if hasattr(db_test, 'testType') else None,
        "assignedTo": db_test.assignedTo if hasattr(db_test, 'assignedTo') else None,
        "dueDate": db_test.dueDate.isoformat() if hasattr(db_test, 'dueDate') and db_test.dueDate else None,
        "notes": db_test.notes if hasattr(db_test, 'notes') else None,
        "createdAt": created_at
    }
    
    json_response = JSONResponse(content=result, status_code=201)
    json_response.headers["Access-Control-Allow-Origin"] = "*"
    json_response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH"
    json_response.headers["Access-Control-Allow-Headers"] = "*"
    json_response.headers["Access-Control-Allow-Credentials"] = "false"
    json_response.headers["Access-Control-Expose-Headers"] = "*"
    return json_response

@router.put("/{test_id}", response_model=Test)
def update_test(test_id: int, test: TestUpdate, db: Session = Depends(get_db)):
    """Update an existing test"""
    db_test = db.query(TestDB).filter(TestDB.id == test_id).first()
    if not db_test:
        raise HTTPException(status_code=404, detail="Test not found")
    
    update_data = test.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_test, field, value)
    
    db.commit()
    db.refresh(db_test)
    return db_test

@router.delete("/{test_id}", status_code=204)
def delete_test(test_id: int, db: Session = Depends(get_db)):
    """Delete a test"""
    db_test = db.query(TestDB).filter(TestDB.id == test_id).first()
    if not db_test:
        raise HTTPException(status_code=404, detail="Test not found")
    
    db.delete(db_test)
    db.commit()
    return None

