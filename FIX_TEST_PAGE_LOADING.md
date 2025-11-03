# Fix Test Page Loading Issue

## Problem
The test page keeps loading indefinitely. This happens because the frontend can't connect to the backend API.

## Root Cause
1. The frontend deployed on Vercel doesn't have `VITE_API_URL` environment variable set
2. Without this, it tries to call `/api/tests` on the Vercel domain (which doesn't exist)
3. The request fails or times out, causing infinite loading

## Solution

### Option 1: Set Environment Variable in Vercel (Recommended)

1. Go to your Vercel project dashboard
2. Click on **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://chemtrac-app.onrender.com/api`
   - **Environment**: Select all (Production, Preview, Development)
4. Click **Save**
5. **Redeploy** your frontend:
   - Go to **Deployments** tab
   - Click the **⋯** menu on the latest deployment
   - Select **Redeploy**

### Option 2: Use the Default (Already Fixed)

I've updated the code to automatically use the Render backend URL in production even if `VITE_API_URL` is not set. However, it's still **recommended** to set it explicitly in Vercel for clarity.

## Verify CORS is Configured

Check that your Render backend has the correct CORS origins:

1. Go to Render dashboard → Your backend service
2. Click **Environment** tab
3. Check `ALLOWED_ORIGINS` includes your Vercel URL:
   ```
   ALLOWED_ORIGINS=http://localhost:3000,https://your-vercel-app.vercel.app
   ```
   Replace `your-vercel-app` with your actual Vercel domain.

4. If missing, add your Vercel URL and click **Save Changes**

## Test the Fix

1. Open your Vercel frontend URL
2. Go to the Tests page
3. Open browser Developer Tools (F12) → Console tab
4. You should see:
   - `API Base URL: https://chemtrac-app.onrender.com/api`
   - `API Request: GET https://chemtrac-app.onrender.com/api/tests`
   - Either test data or an empty array

5. If you see errors, check:
   - Network tab for failed requests
   - Console for CORS errors
   - Backend logs in Render dashboard

## What I Fixed

1. ✅ Updated API client to default to Render backend in production
2. ✅ Added 30-second timeout to prevent infinite loading
3. ✅ Improved error messages to show what's wrong
4. ✅ Added console logging for debugging

The test page should now load correctly once the environment variable is set in Vercel!

