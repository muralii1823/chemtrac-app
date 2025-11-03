# 🔧 Fix Azure Deployment - Step by Step

## Problem: All Deployments Are Failing

Your app is showing the default Azure page because no code has been successfully deployed yet.

## Solution: Switch to Azure's Built-in Build Service

GitHub Actions requires a publish profile secret which is complex. Let's use Azure's simpler deployment method instead.

---

## Step 1: Fix Deployment Center Settings

1. **Go to Azure Portal** → Your App Service (`chemtrac-legacy-app`)
2. Click **"Deployment Center"** (left menu)
3. Click **"Settings"** tab (not Logs)
4. You should see:
   - **Source**: GitHub
   - **Repository**: `muralii1823/chemtrac-app`
   - **Branch**: `main`
   - **Build Provider**: Should be "GitHub Actions" (this is the problem!)

5. **Change Build Provider:**
   - Click **"Edit"** or **"Settings"**
   - Change **"Build Provider"** from **"GitHub Actions"** to **"App Service build service"**
   - Click **"Save"**

6. **Wait for Deployment:**
   - Azure will automatically start a new deployment
   - Go to **"Logs"** tab to watch the progress
   - This should take 2-3 minutes

---

## Step 2: Configure Build Settings (If Needed)

If the build still fails, configure the build:

1. In **Deployment Center** → **Settings**
2. Look for **"Build Configuration"** or **"Deployment Settings"**
3. Set:
   - **Working Directory**: `ASPNetLegacy/LegacySim`
   - **Project**: `LegacySim.csproj`
4. Click **"Save"**

---

## Step 3: Add Application Settings

While deployment is running, add these settings:

1. Go to **Settings** → **Environment variables** → **App settings**
2. Click **"+ Add"** and add:

   **Setting 1:**
   - Name: `WEBSITE_STARTUP_COMMAND`
   - Value: `dotnet LegacySim.dll`
   - Click OK

   **Setting 2:**
   - Name: `SCM_SCRIPT_PATH`
   - Value: `ASPNetLegacy\LegacySim`
   - Click OK

3. Click **"Apply"** at the bottom
4. Wait for restart (1-2 minutes)

---

## Step 4: Verify Deployment

1. Go to **Deployment Center** → **Logs** tab
2. Look for the latest deployment
3. Status should be **"Success"** (green checkmark)
4. If still "Failed", click **"Build/Deploy logs"** to see the error

---

## Step 5: Test Your App

Once deployment succeeds:

1. Click **"Browse"** button in Overview page
2. Or visit: `https://chemtrac-legacy-app-h0f7awhad9fsbqg9.canadacentral-01.azurewebsites.net`
3. You should see: **"Legacy Chemical Test App"** homepage

---

## Alternative: Manual ZIP Deploy (If Above Doesn't Work)

If Azure's build service still fails, we can deploy manually:

1. **Build locally** (if you have .NET installed):
   ```bash
   cd ASPNetLegacy/LegacySim
   dotnet publish -c Release -o ./publish
   cd publish
   zip -r ../../deploy.zip .
   ```

2. **Deploy via Azure Portal:**
   - Go to **Advanced Tools (Kudu)** → **Go**
   - Click **"Zip Push Deploy"**
   - Upload `deploy.zip`
   - Or use Azure CLI:
     ```bash
     az webapp deployment source config-zip \
       --resource-group chemtrac-legacy-app_group \
       --name chemtrac-legacy-app \
       --src deploy.zip
     ```

---

## Quick Fix Summary

**The main fix:** Change Build Provider from "GitHub Actions" to "App Service build service" in Deployment Center → Settings.

This will automatically build and deploy your ASP.NET app from the GitHub repo!

---

**After deployment succeeds, your app will be live!** 🎉

