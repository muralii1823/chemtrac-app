# 🚀 Supabase Deployment - Quick Steps

## ✅ Code Changes Completed!

All files have been updated:
- ✅ `requirements.txt` - Now uses `psycopg2-binary` for PostgreSQL
- ✅ `database.py` - Switched to PostgreSQL connection
- ✅ `update_schema.py` - Updated for PostgreSQL syntax

## 📤 Step 1: Push to GitHub

**Choose one method:**

### Method A: Terminal (requires authentication)
```bash
cd /Users/muralidharan/Documents/MURALIPOC
git push -u origin main
```
*You'll be prompted for GitHub credentials*

### Method B: GitHub Desktop
1. Open GitHub Desktop
2. File → Add Local Repository
3. Select `/Users/muralidharan/Documents/MURALIPOC`
4. Click "Publish repository"

### Method C: VS Code
1. Open VS Code in the project
2. Source Control tab → "..." → "Push"

---

## 🔧 Step 2: Deploy Backend to Render

### 2.1 Create Account
1. Go to https://render.com
2. Sign up/login with GitHub

### 2.2 Create Web Service
1. Click **"New +"** → **"Web Service"**
2. **Connect** your GitHub account if not already
3. Select repository: **`muralii1823/chemtrac-app`**
4. Click **"Connect"**

### 2.3 Configure Service
Fill in these settings:

**Basic Settings:**
- **Name**: `chemtrac-backend`
- **Environment**: `Python 3`
- **Region**: Choose closest to you (US East, US West, etc.)
- **Branch**: `main`

**Build & Deploy:**
- **Root Directory**: `Modern/backend`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### 2.4 Add Environment Variables
Click **"Environment"** tab, then **"Add Environment Variable"**:

**Variable 1:**
- **Key**: `DATABASE_URL`
- **Value**: `postgresql://postgres:Kingboss%401823@db.kqjbuywgoprczfaotvck.supabase.co:5432/postgres`

**Variable 2:**
- **Key**: `ALLOWED_ORIGINS`
- **Value**: `http://localhost:3000`

*(We'll update this after getting Vercel URL)*

### 2.5 Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (3-5 minutes first time)
3. Watch the logs - should see "Application startup complete"
4. **Copy your backend URL** (e.g., `https://chemtrac-backend.onrender.com`)

### 2.6 Test Backend
Visit: `https://your-backend-url.onrender.com/api/health`

Should return: `{"status":"ok","message":"FastAPI backend is running"}`

### 2.7 Initialize Database
1. Render Dashboard → Your backend service → **"Shell"** tab
2. Click **"Open Shell"**
3. Run:
```bash
cd Modern/backend
python update_schema.py
```
4. Should see: "✓ Schema update completed successfully!"

**OR** - Tables will auto-create on first API call from frontend.

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Create Account
1. Go to https://vercel.com
2. Sign up/login with GitHub

### 3.2 Import Project
1. Click **"Add New..."** → **"Project"**
2. Import from GitHub → Select **`muralii1823/chemtrac-app`**
3. Click **"Import"**

### 3.3 Configure Project
**Framework Preset:**
- Auto-detects as "Vite" ✅

**Root Directory:**
- Click **"Edit"** next to Root Directory
- Change to: `Modern/frontend`
- Click **"Continue"**

**Build Settings:**
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### 3.4 Add Environment Variable
Click **"Environment Variables"** → **"Add"**:

- **Key**: `VITE_API_URL`
- **Value**: `https://your-render-backend-url.onrender.com`
  *(Replace with your actual Render backend URL from Step 2.5)*

### 3.5 Deploy
1. Click **"Deploy"**
2. Wait for build (2-3 minutes)
3. **Copy your Vercel URL** (e.g., `https://chemtrac-app.vercel.app`)

---

## 🔗 Step 4: Update CORS

Go back to **Render Dashboard**:

1. Your backend service → **"Environment"** tab
2. Find `ALLOWED_ORIGINS` variable
3. Click **"Edit"**
4. Update value to:
```
http://localhost:3000,https://your-vercel-app.vercel.app
```
*(Replace with your actual Vercel URL)*

5. Click **"Save Changes"**
6. Render will auto-redeploy (1-2 minutes)

---

## ✅ Step 5: Test Everything

### Test Backend:
1. Health check: `https://your-backend.onrender.com/api/health`
2. API endpoint: `https://your-backend.onrender.com/api/tests` (should return `[]`)

### Test Frontend:
1. Visit your Vercel URL
2. Navigate to **Tests** page
3. Click **"Create New Test"**
4. Fill in form and submit
5. Should see the test in the list!

---

## 🎉 You're Live!

**Share your Vercel URL** - anyone can now:
- ✅ View all pages (Home, History, News, Products, Tests)
- ✅ Create new tests → Saves to Supabase!
- ✅ View all tests from database
- ✅ Search and filter tests
- ✅ Everything works in real-time!

---

## 🔧 Troubleshooting

### Backend won't start
- Check Render logs for errors
- Verify `DATABASE_URL` is correct
- Check Python version (should be 3.11)

### Frontend can't connect to backend
- Verify `VITE_API_URL` is set correctly in Vercel
- Check CORS includes your Vercel URL
- Test backend URL directly in browser

### Database connection errors
- Verify `DATABASE_URL` format is correct
- Check Supabase database is active (not paused)
- Password should be URL-encoded (`@` → `%40`)

### Tables don't exist
- Run `update_schema.py` via Render Shell
- Or make an API call from frontend (auto-creates)

---

## 📝 Your URLs Summary

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **API Health**: `https://your-backend.onrender.com/api/health`
- **API Docs**: `https://your-backend.onrender.com/docs` (FastAPI auto-generated)
- **Supabase**: https://kqjbuywgoprczfaotvck.supabase.co

---

## 💰 Cost

- **Supabase**: FREE (up to 500MB database, 2GB bandwidth/month)
- **Render**: FREE (spins down after 15 min inactivity)
- **Vercel**: FREE (unlimited bandwidth on hobby plan)
- **Total**: $0/month! 🎉

---

**Need help?** Check the logs in Render/Vercel dashboards for detailed error messages.

