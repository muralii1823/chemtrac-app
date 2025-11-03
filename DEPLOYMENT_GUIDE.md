# 🚀 Deployment Guide: PlanetScale + Render + Vercel

Complete step-by-step guide to deploy your CHEMTRAC application online for free.

## 📋 Prerequisites

1. GitHub account
2. PlanetScale account (free)
3. Render account (free)
4. Vercel account (free)

---

## Step 1: Push Code to GitHub

### 1.1 Initialize Git (if not already done)
```bash
cd /Users/muralidharan/Documents/MURALIPOC
git init
git add .
git commit -m "Prepare for deployment"
```

### 1.2 Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository (e.g., `chemtrac-app`)
3. Don't initialize with README
4. Copy the repository URL

### 1.3 Push Code
```bash
git remote add origin https://github.com/YOUR_USERNAME/chemtrac-app.git
git branch -M main
git push -u origin main
```

---

## Step 2: Set Up PlanetScale Database (MySQL)

### 2.1 Create Account
1. Go to https://planetscale.com
2. Sign up for free account (GitHub login works)

### 2.2 Create Database
1. Click "New database"
2. Name it: `chemical-tests`
3. Region: Choose closest to you (US East, US West, etc.)
4. Plan: Free (Hobby)
5. Click "Create database"

### 2.3 Get Connection String
1. Click on your database
2. Click "Connect" button
3. Select "General" connection string
4. Copy the connection details:
   - Host
   - Username
   - Password (click "Show" to reveal)
   - Database name

**Save these for Step 3!**

### 2.4 Create Branch (Optional for schema updates)
PlanetScale uses branching. For initial setup:
1. The default branch is `main` - this is your production database
2. You can create branches for schema changes later if needed

---

## Step 3: Deploy Backend to Render

### 3.1 Create Account
1. Go to https://render.com
2. Sign up with GitHub (free tier available)

### 3.2 Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Authorize Render to access your repo

### 3.3 Configure Service
**Basic Settings:**
- **Name**: `chemtrac-backend`
- **Environment**: `Python 3`
- **Region**: Choose closest to you
- **Branch**: `main`

**Build & Deploy:**
- **Root Directory**: `Modern/backend`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### 3.4 Set Environment Variables
Click "Environment" tab and add:

```
MYSQL_HOST=your-planetscale-host.planetscale.com
MYSQL_PORT=3306
MYSQL_USER=your-planetscale-username
MYSQL_PASSWORD=your-planetscale-password
MYSQL_DATABASE=chemical-tests
ALLOWED_ORIGINS=http://localhost:3000,https://your-vercel-app.vercel.app
```

**Important**: Replace:
- `your-planetscale-host` with actual PlanetScale host
- `your-planetscale-username` with your username
- `your-planetscale-password` with your password
- `your-vercel-app` with your Vercel app name (we'll get this in Step 4)

### 3.5 Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes first time)
3. **Copy the URL** when deployed (e.g., `https://chemtrac-backend.onrender.com`)

### 3.6 Initialize Database Schema
Once deployed:

1. Go to Render dashboard → Your service → "Shell"
2. Run:
```bash
cd Modern/backend
python update_schema.py
```

Or wait - the tables will auto-create on first API call if `init_db.py` runs.

---

## Step 4: Deploy Frontend to Vercel

### 4.1 Create Account
1. Go to https://vercel.com
2. Sign up with GitHub

### 4.2 Import Project
1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Select the repository

### 4.3 Configure Project
**Framework Preset:**
- Choose "Vite" or "Other"

**Root Directory:**
- Click "Edit" → Set to: `Modern/frontend`

**Build Settings:**
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install` (auto-detected)

### 4.4 Set Environment Variables
Click "Environment Variables" and add:

```
VITE_API_URL=https://your-render-backend-url.onrender.com
```

**Important**: Replace `your-render-backend-url` with your actual Render backend URL from Step 3.5

### 4.5 Deploy
1. Click "Deploy"
2. Wait for build (2-3 minutes)
3. **Copy your Vercel URL** (e.g., `https://chemtrac-app.vercel.app`)

### 4.6 Update CORS in Render
Go back to Render dashboard:

1. Your backend service → "Environment"
2. Update `ALLOWED_ORIGINS`:
```
ALLOWED_ORIGINS=http://localhost:3000,https://chemtrac-app.vercel.app
```
3. Click "Save Changes" - this will trigger a redeploy

---

## Step 5: Final Configuration

### 5.1 Verify Backend Health
Visit: `https://your-render-backend.onrender.com/api/health`

Should return: `{"status":"ok","message":"FastAPI backend is running"}`

### 5.2 Test Frontend
Visit your Vercel URL. You should see:
- Home page loads
- Navigation works
- Can view tests (if database has data)
- Can create new tests

### 5.3 Initialize Database (if needed)
If tables don't exist yet:

1. Go to Render → Your backend → Shell
2. Run:
```bash
cd Modern/backend
python update_schema.py
```

Or make an API call from frontend - it will auto-create tables.

---

## ✅ Success Checklist

- [ ] Code pushed to GitHub
- [ ] PlanetScale database created and connected
- [ ] Backend deployed on Render
- [ ] Environment variables set in Render
- [ ] Frontend deployed on Vercel
- [ ] Environment variables set in Vercel
- [ ] CORS updated with Vercel URL
- [ ] Database schema initialized
- [ ] Frontend can connect to backend
- [ ] Can create/view tests from deployed app

---

## 🔧 Troubleshooting

### Backend won't start
- Check Render logs: Dashboard → Service → Logs
- Verify environment variables are set correctly
- Check Python version matches (3.11)

### Frontend can't connect to backend
- Verify `VITE_API_URL` is set in Vercel
- Check CORS settings in Render (include Vercel URL)
- Test backend URL directly: `https://your-backend.onrender.com/api/health`

### Database connection errors
- Verify PlanetScale credentials in Render environment variables
- Check PlanetScale database is active (not paused)
- Test connection string format

### Tables don't exist
- Run `update_schema.py` via Render Shell
- Or make a test API call from frontend

### CORS errors in browser
- Update `ALLOWED_ORIGINS` in Render to include your Vercel URL
- Make sure it's comma-separated: `http://localhost:3000,https://your-app.vercel.app`

---

## 🌐 Your Live URLs

Once deployed:
- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://your-backend.onrender.com`
- **API Health**: `https://your-backend.onrender.com/api/health`
- **API Docs**: `https://your-backend.onrender.com/docs` (FastAPI auto-generated)

---

## 📝 Notes

1. **Free Tier Limits**:
   - Render: Service spins down after 15 min inactivity (first request after spin-down is slow)
   - PlanetScale: 1 database, 5GB storage, 1 billion rows read/month
   - Vercel: Unlimited bandwidth, 100GB bandwidth/month on hobby plan

2. **Updates**:
   - Push to GitHub → Auto-deploys to both Render and Vercel
   - Render: Manual redeploy may be needed sometimes
   - Vercel: Auto-deploys on every push

3. **Custom Domain** (Optional):
   - Vercel: Add custom domain in project settings
   - Update CORS in Render with custom domain
   - Update `VITE_API_URL` in Vercel

---

## 🎉 You're Done!

Share your Vercel URL with anyone - they can:
- View all pages (Home, History, News, Products, Tests)
- Create new tests (saves to PlanetScale database)
- View all tests from the database
- Search and filter tests
- Everything works in real-time!

---

**Need Help?**
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- PlanetScale Docs: https://planetscale.com/docs

