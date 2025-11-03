#!/usr/bin/env python3
"""
Update database schema for PostgreSQL (Supabase).
Run this script to add the new fields we introduced.
"""

from sqlalchemy import text
from app.database import engine, TestDB, Base
import sys

def update_schema():
    """Add new columns to the tests table if they don't exist"""
    print("Updating database schema for PostgreSQL...")
    
    with engine.connect() as conn:
        try:
            # Start a transaction
            trans = conn.begin()
            
            # Check if table exists
            result = conn.execute(text("""
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    AND table_name = 'tests'
                );
            """))
            table_exists = result.scalar()
            
            if not table_exists:
                print("Creating tests table...")
                Base.metadata.create_all(bind=engine)
            else:
                print("Tests table exists, checking for new columns...")
            
            # Get existing columns
            result = conn.execute(text("""
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'tests'
            """))
            existing_columns = {row[0] for row in result}
            
            # Add missing columns (PostgreSQL uses double quotes for case-sensitive names)
            columns_to_add = [
                ("category", "VARCHAR(100)", "NULL"),
                ("priority", "VARCHAR(50)", "DEFAULT 'Medium'"),
                ("\"testType\"", "VARCHAR(100)", "NULL"),
                ("\"assignedTo\"", "VARCHAR(255)", "NULL"),
                ("\"dueDate\"", "DATE", "NULL"),
                ("notes", "TEXT", "NULL"),
            ]
            
            for column_name, column_type, column_default in columns_to_add:
                # Remove quotes for checking existence
                check_name = column_name.strip('"')
                if check_name not in existing_columns:
                    alter_sql = f'ALTER TABLE tests ADD COLUMN {column_name} {column_type} {column_default}'
                    print(f"Adding column: {check_name}")
                    conn.execute(text(alter_sql))
                else:
                    print(f"Column {check_name} already exists, skipping...")
            
            # Update description to TEXT if it's still VARCHAR
            if 'description' in existing_columns:
                result = conn.execute(text("""
                    SELECT data_type, character_maximum_length
                    FROM information_schema.columns 
                    WHERE table_schema = 'public' 
                    AND table_name = 'tests'
                    AND column_name = 'description'
                """))
                desc_info = result.fetchone()
                if desc_info and desc_info[0] == 'character varying' and desc_info[1]:
                    print("Updating description column to TEXT...")
                    conn.execute(text("ALTER TABLE tests ALTER COLUMN description TYPE TEXT"))
            
            # Commit the transaction
            trans.commit()
            print("\n✓ Schema update completed successfully!")
            print("\nNew columns added:")
            for col_name, _, _ in columns_to_add:
                print(f"  - {col_name.strip('\"')}")
            
        except Exception as e:
            trans.rollback()
            print(f"\n✗ Error updating schema: {e}")
            import traceback
            traceback.print_exc()
            sys.exit(1)
        finally:
            conn.close()

if __name__ == "__main__":
    print("=" * 60)
    print("PostgreSQL Database Schema Update Script")
    print("=" * 60)
    update_schema()
    print("=" * 60)
