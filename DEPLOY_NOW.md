# 🚀 DEPLOY NOW - Quick Instructions

## ✅ Code is Ready!

All code changes are complete. Just need 3 quick steps:

---

## STEP 1: Push to GitHub (2 minutes)

**Option A - Terminal:**
```bash
cd /Users/muralidharan/Documents/MURALIPOC
git push -u origin main
```
*Enter GitHub username/password when prompted*

**Option B - GitHub Desktop:**
1. Open GitHub Desktop
2. File → Add Local Repository → Select this folder
3. Click "Publish repository"

**Option C - VS Code:**
1. Open this folder in VS Code
2. Source Control tab (sidebar)
3. Click "..." → "Push"

---

## STEP 2: Deploy Backend on Render (5 minutes)

1. **Go to**: https://render.com
2. **Sign up** with GitHub (free)
3. **Click**: "New +" → "Web Service"
4. **Select**: `muralii1823/chemtrac-app` repository
5. **Settings**:
   - Name: `chemtrac-backend`
   - Root Directory: `Modern/backend`
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. **Environment Variables** → Add:
   ```
   DATABASE_URL=postgresql://postgres:Kingboss%401823@db.kqjbuywgoprczfaotvck.supabase.co:5432/postgres
   ALLOWED_ORIGINS=http://localhost:3000
   ```
7. **Click**: "Create Web Service"
8. **Wait** 3-5 minutes
9. **Copy** the URL (e.g., `https://chemtrac-backend.onrender.com`)
10. **Test**: Visit `/api/health` - should show `{"status":"ok"}`

---

## STEP 3: Deploy Frontend on Vercel (3 minutes)

1. **Go to**: https://vercel.com
2. **Sign up** with GitHub (free)
3. **Click**: "Add New..." → "Project"
4. **Import**: `muralii1823/chemtrac-app`
5. **Settings**:
   - Root Directory: `Modern/frontend`
   - Framework: Vite (auto)
6. **Environment Variables** → Add:
   ```
   VITE_API_URL=https://your-render-url.onrender.com
   ```
   *(Use your Render URL from Step 2)*
7. **Click**: "Deploy"
8. **Wait** 2-3 minutes
9. **Copy** your Vercel URL
10. **Go back to Render** → Update `ALLOWED_ORIGINS`:
    ```
    http://localhost:3000,https://your-vercel-url.vercel.app
    ```

---

## ✅ DONE!

Your app is live! Share the Vercel URL with anyone.

**Test it:**
- Visit your Vercel URL
- Click "Tests" → "Create New Test"
- Fill form → Submit
- Should appear in the list!

---

## 🔗 Quick Links

- **Supabase Dashboard**: https://supabase.com/dashboard/project/kqjbuywgoprczfaotvck
- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repo**: https://github.com/muralii1823/chemtrac-app

---

**That's it!** Just 3 steps and you're live. 🎉

