# MySQL Database Setup

## Quick Setup

The FastAPI backend is now configured to use MySQL instead of SQLite.

### Step 1: Ensure MySQL is Running

```bash
# Check if MySQL is running (macOS)
brew services list | grep mysql

# Or start MySQL if needed
brew services start mysql
```

### Step 2: Set MySQL Credentials

You can set environment variables or modify `app/database.py` directly:

**Option A: Environment Variables**
```bash
export MYSQL_HOST=localhost
export MYSQL_PORT=3306
export MYSQL_USER=root
export MYSQL_PASSWORD=your_mysql_password
export MYSQL_DATABASE=chemical_tests
```

**Option B: Direct Configuration**
Edit `app/database.py` and change the default values:
```python
MYSQL_HOST = os.getenv("MYSQL_HOST", "localhost")
MYSQL_PORT = os.getenv("MYSQL_PORT", "3306")
MYSQL_USER = os.getenv("MYSQL_USER", "root")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "YOUR_PASSWORD_HERE")
MYSQL_DATABASE = os.getenv("MYSQL_DATABASE", "chemical_tests")
```

### Step 3: Initialize Database

```bash
cd Modern/backend
python3 init_db.py
```

This will:
- Create the `chemical_tests` database (if it doesn't exist)
- Create the `tests` table with proper schema
- Set up UTF8MB4 encoding for international characters

### Step 4: Start the Backend

```bash
python3 -m uvicorn app.main:app --reload --port 3001
```

## Troubleshooting

### Connection Refused
- Make sure MySQL server is running: `brew services list | grep mysql`
- Check MySQL is listening: `lsof -i:3306`

### Access Denied
- Verify your MySQL username and password
- Check if you need to create a MySQL user:
  ```sql
  CREATE USER 'root'@'localhost' IDENTIFIED BY 'your_password';
  GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
  FLUSH PRIVILEGES;
  ```

### Database Already Exists
- The init script will skip creation if database exists
- If you want to start fresh, drop the database first:
  ```sql
  DROP DATABASE chemical_tests;
  ```

## Database Schema

The `tests` table has the following structure:
- `id` - INTEGER PRIMARY KEY AUTO_INCREMENT
- `name` - VARCHAR (required)
- `description` - VARCHAR (optional)
- `version` - VARCHAR (default: "1.0")
- `status` - VARCHAR (default: "Draft")
- `createdAt` - DATETIME (auto-set on creation)

