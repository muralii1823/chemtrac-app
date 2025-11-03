from fastapi import FastAPI, Request, Depends
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .routes import tests
import traceback
import os
import sys

app = FastAPI(
    title="Chemical Testing API",
    description="Modern FastAPI backend for Chemical Testing Application",
    version="1.0.0"
)

# Add CORS middleware IMMEDIATELY after app creation, BEFORE anything else
# CRITICAL: Use allow_origins with explicit list instead of regex for better compatibility
# FastAPI's CORSMiddleware handles this more reliably than regex patterns
allowed_cors_origins = [
    "https://chemtrac-9pv6tha2u-muralis-projects-6e29d5d0.vercel.app",
    "https://chemtrac-app.vercel.app",  # Production Vercel URL if different
    "http://localhost:3000",
    "http://localhost:5173",  # Vite default port
]

# Also allow any Vercel preview URL by checking environment or using regex fallback
# But prefer explicit list for main deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_cors_origins,
    allow_origin_regex=r"https://.*\.vercel\.app",  # Fallback for any Vercel preview
    allow_credentials=False,  # Must be False with wildcard/regex
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"],
    allow_headers=["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
    expose_headers=["*"],
    max_age=3600,
)

print(">>> CORS middleware added immediately after app creation", file=sys.stderr, flush=True)

# Startup event - test database connection (non-blocking)
@app.on_event("startup")
async def startup_event():
    import sys
    import asyncio
    print(">>> FastAPI startup...", file=sys.stderr)
    sys.stderr.flush()
    # Run database test in background to avoid blocking startup
    async def test_db():
        try:
            from app.database import engine
            from sqlalchemy import text
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            print(">>> Database connection OK", file=sys.stderr)
            sys.stderr.flush()
        except Exception as e:
            print(f">>> Database warning: {e}", file=sys.stderr)
            sys.stderr.flush()
    
    # Don't await - let it run in background, don't block startup
    asyncio.create_task(test_db())

# Global exception handler - temporarily disabled to debug
# @app.exception_handler(Exception)
# async def global_exception_handler(request: Request, exc: Exception):
#     """Catch all unhandled exceptions and return proper JSON response"""
#     from fastapi import HTTPException as FastAPIHTTPException
#     import sys
#     
#     # Let HTTPExceptions pass through (they already have proper details)
#     if isinstance(exc, FastAPIHTTPException):
#         raise exc
#     
#     error_trace = traceback.format_exc()
#     error_msg = str(exc)
#     
#     # Log to stderr so it shows in terminal
#     print(f"\n{'='*70}", file=sys.stderr)
#     print(f"UNHANDLED EXCEPTION in {request.method} {request.url}", file=sys.stderr)
#     print(f"Error Type: {type(exc).__name__}", file=sys.stderr)
#     print(f"Error Message: {error_msg}", file=sys.stderr)
#     print(f"{'='*70}", file=sys.stderr)
#     print(error_trace, file=sys.stderr)
#     print(f"{'='*70}\n", file=sys.stderr)
#     sys.stderr.flush()
#     
#     return JSONResponse(
#         status_code=500,
#         content={
#             "detail": error_msg,
#             "error_type": type(exc).__name__,
#             "path": str(request.url.path)
#         }
#     )

# CORS middleware
# Get allowed origins from environment variable, default to localhost for development
allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
allowed_origins = allowed_origins_env.split(",")

# Clean up any whitespace
allowed_origins = [origin.strip() for origin in allowed_origins if origin.strip()]

# CORS middleware already configured above - remove duplicate config
# The middleware was added immediately after app creation (line 19-28)

# Also add routes directly at /tests for backward compatibility
# This ensures /tests routes are registered before /api routes
# Import the route functions directly
from .routes.tests import get_all_tests, get_test, create_test, update_test, delete_test
from .database import get_db
from .models import TestCreate, TestUpdate

@app.get("/tests")
def get_all_tests_wrapper(db: Session = Depends(get_db)):
    """Wrapper for /tests endpoint - backward compatibility"""
    import sys
    print(">>> /tests endpoint called (wrapper)", file=sys.stderr, flush=True)
    return get_all_tests(db)

@app.get("/tests/{test_id}")
def get_test_wrapper(test_id: int, db: Session = Depends(get_db)):
    """Wrapper for /tests/{id} endpoint"""
    return get_test(test_id, db)

@app.post("/tests")
def create_test_wrapper(test: TestCreate, db: Session = Depends(get_db)):
    """Wrapper for /tests POST endpoint"""
    return create_test(test, db)

@app.put("/tests/{test_id}")
def update_test_wrapper(test_id: int, test: TestUpdate, db: Session = Depends(get_db)):
    """Wrapper for /tests/{id} PUT endpoint"""
    return update_test(test_id, test, db)

@app.delete("/tests/{test_id}")
def delete_test_wrapper(test_id: int, db: Session = Depends(get_db)):
    """Wrapper for /tests/{id} DELETE endpoint"""
    return delete_test(test_id, db)

# Include routers
# The router has prefix="/tests", so including with "/api" gives us "/api/tests"
app.include_router(tests.router, prefix="/api")

@app.get("/api/health")
def health_check():
    """Simple health check without database"""
    import sys
    print(">>> health_check CALLED", file=sys.stderr, flush=True)
    try:
        result = {"status": "ok", "message": "FastAPI backend is running"}
        print(f">>> health_check returning: {result}", file=sys.stderr, flush=True)
        return result
    except Exception as e:
        print(f">>> health_check ERROR: {e}", file=sys.stderr, flush=True)
        import traceback
        traceback.print_exc(file=sys.stderr)
        raise

@app.get("/api/test-simple")
def test_simple():
    """Simple test endpoint that returns hardcoded data"""
    return {"message": "Simple endpoint works", "data": []}

@app.get("/api/test-db")
def test_db():
    """Test database query directly"""
    try:
        from app.database import get_db, TestDB
        from sqlalchemy import desc
        
        db = next(get_db())
        tests = db.query(TestDB).order_by(desc(TestDB.createdAt)).all()
        db.close()
        
        return {
            "status": "ok",
            "count": len(tests),
            "message": f"Database query successful: {len(tests)} tests"
        }
    except Exception as e:
        import traceback
        return {
            "status": "error",
            "message": str(e),
            "traceback": traceback.format_exc()
        }

# Custom 404 handler with CORS headers
from starlette.exceptions import HTTPException as StarletteHTTPException

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    """Handle HTTP exceptions (including 404) with CORS headers"""
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail if hasattr(exc, 'detail') else "Not Found"},
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001)

