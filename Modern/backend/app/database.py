from sqlalchemy import create_engine, Column, Integer, String, DateTime, Date, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os
from urllib.parse import quote_plus

# PostgreSQL Database Configuration (Supabase)
# Support both DATABASE_URL (from Supabase) and individual components
DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    # Supabase provides full connection string
    # Fix postgres:// to postgresql:// for SQLAlchemy compatibility
    if DATABASE_URL.startswith("postgres://"):
        SQLALCHEMY_DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
    else:
        SQLALCHEMY_DATABASE_URL = DATABASE_URL
    
    # Force IPv4 connection (Render network doesn't support IPv6)
    # Convert to Supabase connection pooler format which uses IPv4
    if "supabase.co" in SQLALCHEMY_DATABASE_URL or "[" in SQLALCHEMY_DATABASE_URL:
        # Extract credentials and project ID from connection string
        from urllib.parse import urlparse, parse_qs, urlunparse
        parsed = urlparse(SQLALCHEMY_DATABASE_URL)
        
        # Extract password from URL
        auth = parsed.netloc.split("@")[0] if "@" in parsed.netloc else ""
        if ":" in auth:
            user, password = auth.split(":", 1)
        else:
            user = auth
            password = ""
        
        # Extract project ID from hostname (e.g., db.kqjbuywgoprczfaotvck.supabase.co -> kqjbuywgoprczfaotvck)
        host = parsed.netloc.split("@")[-1] if "@" in parsed.netloc else parsed.netloc
        host = host.split(":")[0]  # Remove port
        if "supabase.co" in host:
            project_id = host.split(".")[1] if "." in host else host.split(".")[0]
            
            # Construct pooler connection string (uses IPv4)
            # Format: postgresql://postgres.[PROJECT_ID]:[PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
            # We'll try common regions, or use a generic pooler format
            pooler_hosts = [
                f"aws-0-us-west-1.pooler.supabase.com",  # Most common
                f"aws-0-us-east-1.pooler.supabase.com",
                f"pooler.supabase.com",  # Fallback
            ]
            
            # Try to extract region from original host if available
            if "us-west" in host or "us-east" in host or "eu-west" in host:
                # Extract region if present
                for part in host.split("."):
                    if "us-west" in part or "us-east" in part or "eu-west" in part:
                        region = part
                        pooler_host = f"aws-0-{region}.pooler.supabase.com"
                        break
                else:
                    pooler_host = pooler_hosts[0]
            else:
                pooler_host = pooler_hosts[0]
            
            # Build new connection string with pooler
            encoded_password = quote_plus(password) if password else ""
            new_netloc = f"postgres.{project_id}:{encoded_password}@{pooler_host}:6543"
            SQLALCHEMY_DATABASE_URL = urlunparse((
                parsed.scheme,
                new_netloc,
                parsed.path,
                parsed.params,
                parsed.query,
                parsed.fragment
            ))
            print(f"Converted to connection pooler format (IPv4): {pooler_host}")
        else:
            # Fallback: just change port to 6543 and remove IPv6 brackets
            SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace(":5432", ":6543").replace("[", "").replace("]", "")
            print("Using port 6543 to attempt IPv4 connection")
else:
    # Fallback to individual components for local development
    POSTGRES_HOST = os.getenv("POSTGRES_HOST", "localhost")
    POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5432")
    POSTGRES_USER = os.getenv("POSTGRES_USER", "postgres")
    POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "postgres")
    POSTGRES_DATABASE = os.getenv("POSTGRES_DATABASE", "postgres")
    
    encoded_password = quote_plus(POSTGRES_PASSWORD)
    SQLALCHEMY_DATABASE_URL = f"postgresql://{POSTGRES_USER}:{encoded_password}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DATABASE}"

# Create engine with PostgreSQL settings
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_pre_ping=True,  # Verify connections before using
    pool_recycle=3600,    # Recycle connections after 1 hour
    echo=False,           # Set to True for SQL query logging
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Model
class TestDB(Base):
    __tablename__ = "tests"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)  # Changed to Text for longer descriptions
    version = Column(String(50), default="1.0")
    status = Column(String(50), default="Draft")
    category = Column(String(100), nullable=True)
    priority = Column(String(50), nullable=True, default="Medium")
    testType = Column(String(100), nullable=True)
    assignedTo = Column(String(255), nullable=True)
    dueDate = Column(Date, nullable=True)
    notes = Column(Text, nullable=True)
    createdAt = Column("createdAt", DateTime, default=datetime.utcnow)  # Explicit column name mapping

# Create tables automatically on first import
# This ensures tables exist even if init_db.py wasn't run
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    # If connection fails (e.g., MySQL not configured), log but don't crash
    # User should run init_db.py to set up database first
    print(f"Warning: Could not create tables automatically: {e}")
    print("Please ensure PostgreSQL is running and configured")

# Dependency for database sessions
# Note: Works with both sync and async routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

