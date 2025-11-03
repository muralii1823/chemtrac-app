#!/usr/bin/env python3
"""
Database initialization script.
This will create the database if it doesn't exist and set up the tables.
"""
import os
import sys
import pymysql
from app.database import MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, Base, engine

def create_database_if_not_exists():
    """Create the database if it doesn't exist"""
    try:
        # Connect to MySQL server (without specifying database)
        # allow_public_key_retrieval=True is needed for MySQL 8.0+ authentication
        connection = pymysql.connect(
            host=MYSQL_HOST,
            port=int(MYSQL_PORT),
            user=MYSQL_USER,
            password=MYSQL_PASSWORD,
            charset='utf8mb4'
        )
        
        with connection.cursor() as cursor:
            # Check if database exists
            cursor.execute(f"SHOW DATABASES LIKE '{MYSQL_DATABASE}'")
            result = cursor.fetchone()
            
            if not result:
                # Create database
                cursor.execute(f"CREATE DATABASE `{MYSQL_DATABASE}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
                print(f"✓ Database '{MYSQL_DATABASE}' created successfully")
            else:
                print(f"✓ Database '{MYSQL_DATABASE}' already exists")
        
        connection.close()
        return True
    except Exception as e:
        print(f"✗ Error creating database: {e}")
        return False

def create_tables():
    """Create all tables defined in the models"""
    try:
        Base.metadata.create_all(bind=engine)
        print("✓ Tables created successfully")
        return True
    except Exception as e:
        print(f"✗ Error creating tables: {e}")
        return False

if __name__ == "__main__":
    print("Initializing MySQL database...")
    print(f"Host: {MYSQL_HOST}:{MYSQL_PORT}")
    print(f"Database: {MYSQL_DATABASE}")
    print(f"User: {MYSQL_USER}")
    print()
    
    if create_database_if_not_exists():
        if create_tables():
            print("\n✓ Database initialization complete!")
            sys.exit(0)
        else:
            print("\n✗ Failed to create tables")
            sys.exit(1)
    else:
        print("\n✗ Failed to create database")
        sys.exit(1)

