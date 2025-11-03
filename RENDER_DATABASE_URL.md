# 🔧 Updated DATABASE_URL for Render

## New Password Connection String

Update the `DATABASE_URL` in Render's Environment variables:

### Session Pooler (Recommended):
```
postgresql://postgres.kqjbuywgoprczfaotvck:twrGXhRgBc01nUEu@aws-1-us-east-1.pooler.supabase.com:5432/postgres
```

### Transaction Pooler (Alternative):
```
postgresql://postgres.kqjbuywgoprczfaotvck:twrGXhRgBc01nUEu@aws-1-us-east-1.pooler.supabase.com:6543/postgres
```

## Steps to Update in Render:

1. Go to: https://dashboard.render.com
2. Your backend service (`chemtrac-app`)
3. Click **Environment** tab
4. Find `DATABASE_URL`
5. Click **Edit**
6. Replace with the connection string above
7. Click **Save Changes**

Render will auto-redeploy in 2-3 minutes.

---

## What to Check After Update:

In Render logs, you should see:
- ✅ "Using Supabase connection pooler (already IPv4 compatible)"
- ✅ No "password authentication failed" errors
- ✅ Tables created successfully
- ✅ Connection successful

---

## Note:

The password `twrGXhRgBc01nUEu` doesn't contain special characters, so URL encoding isn't required. But if you encounter issues, you can URL-encode it (though it should work as-is).

