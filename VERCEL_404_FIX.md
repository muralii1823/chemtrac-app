# 🔧 Fix 404 Errors on Vercel

## Problem
You're seeing 404 errors because Vercel isn't finding your app files. This happens when the **Root Directory** isn't set correctly.

## ✅ Fix Steps

### Step 1: Set Root Directory in Vercel
1. Go to **Vercel Dashboard** → Your project (`chemtrac-app-frontend`)
2. Click **Settings** tab
3. Click **General** in the left sidebar
4. Scroll down to **Root Directory**
5. Click **Edit** (or "Override" button)
6. Set to: `Modern/frontend`
7. Click **Save**

### Step 2: Verify Build Settings
In the same **General** settings, verify:
- **Framework Preset**: Vite (auto-detected)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Step 3: Add Environment Variable
1. Click **Environment Variables** tab
2. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://chemtrac-app.onrender.com`
   - **Environments**: Select all (Production, Preview, Development)
3. Click **Save**

### Step 4: Redeploy
1. Go to **Deployments** tab
2. Click **⋯** (three dots) on latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger auto-deploy

---

## What Should Happen

After setting Root Directory and redeploying:
- ✅ Build will find your `package.json` and `vite.config.ts`
- ✅ Build will output to `dist` folder
- ✅ App will be served correctly
- ✅ No more 404 errors

---

## Verify Build Logs

After redeploy, check build logs should show:
- ✅ "Installing dependencies..."
- ✅ "Building..."
- ✅ "Build completed"
- ✅ "Deployment ready"

---

## Test Your App

Once deployed successfully:
1. Visit your Vercel URL
2. Should see your React app (Home page)
3. Navigation should work
4. Can create/view tests

---

**The key fix is setting Root Directory to `Modern/frontend`!**

