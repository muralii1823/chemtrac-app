# DBeaver Connection Guide for MySQL

## Connection Settings

To connect to your MySQL database in DBeaver:

1. **Open DBeaver** and click the "New Database Connection" button (plug icon) or go to `Database` → `New Database Connection`

2. **Select MySQL** from the list of database types

3. **Enter the following connection details:**
   - **Host:** `localhost`
   - **Port:** `3306`
   - **Database:** `chemical_tests` (or leave empty and select it after connecting)
   - **Username:** `root`
   - **Password:** `root123`

4. **Optional - Advanced Settings:**
   - Go to "Driver properties" tab
   - Make sure "allowPublicKeyRetrieval" is set to `true` (for MySQL 8.0+)
   - Make sure "useSSL" is set to `false` (for local development)

5. **Test Connection:**
   - Click "Test Connection" button
   - You should see "Connected" if successful

6. **Finish:**
   - Click "Finish" to save the connection

## Navigating the Database

Once connected:
- Expand the connection in the Database Navigator
- You should see: `Databases` → `chemical_tests` → `Tables` → `tests`
- Right-click on `tests` and select "View Data" to see the test records

## Quick Verification

Run this query in DBeaver SQL Editor:
```sql
SELECT * FROM chemical_tests.tests;
```

You should see the test records.

