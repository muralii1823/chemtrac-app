from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from .routes import tests
import traceback
import os
import sys

app = FastAPI(
    title="Chemical Testing API",
    description="Modern FastAPI backend for Chemical Testing Application",
    version="1.0.0"
)

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

# Log the configured origins
print(f">>> CORS: Configured allowed origins: {allowed_origins}", file=sys.stderr)
sys.stderr.flush()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now - update with specific domains in production
    allow_credentials=False,  # Must be False when allow_origins is ["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(tests.router, prefix="/api")

# Add redirect for old /tests endpoints (backward compatibility)
from fastapi.responses import RedirectResponse
@app.get("/tests")
@app.get("/tests/{path:path}")
def redirect_tests_to_api(path: str = ""):
    """Redirect /tests requests to /api/tests for backward compatibility"""
    import sys
    print(f">>> Redirecting /tests/{path} to /api/tests/{path}", file=sys.stderr, flush=True)
    if path:
        return RedirectResponse(url=f"/api/tests/{path}", status_code=307)
    return RedirectResponse(url="/api/tests", status_code=307)

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001)

