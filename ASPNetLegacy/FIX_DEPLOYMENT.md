# 🔧 Fix Azure Deployment Issues

## Issue 1: Wrong URL ❌

You tried: `chemtrac-legacy-app.azurewebsites.net`  
**Use this instead:**
```
https://chemtrac-legacy-app-h0f7awhad9fsbqg9.canadacentral-01.azurewebsites.net
```

## Issue 2: Deployments Failing

The GitHub Actions deployment is failing. Here's how to fix:

### Option A: Fix GitHub Actions (Recommended)

1. **Get Publish Profile:**
   - Go to Azure Portal → Your App Service → "Get publish profile"
   - Download the `.PublishSettings` file

2. **Add to GitHub Secrets:**
   - Go to your GitHub repo → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `AZURE_WEBAPP_PUBLISH_PROFILE`
   - Value: Copy the entire contents of the `.PublishSettings` file
   - Click "Add secret"

3. **Redeploy:**
   - Go to Actions tab in GitHub
   - Click "Run workflow" on the failed workflow
   - Or just push a new commit

### Option B: Use Azure Deployment Center (Simpler)

1. Go to **Deployment Center** in Azure Portal
2. Click **"Settings"** tab
3. Under **"Build Provider"**, select **"App Service build service"** (instead of GitHub Actions)
4. Click **"Save"**
5. Azure will automatically build and deploy from your GitHub repo

## Issue 3: Set Startup Command

Since you're on Windows App Service, add via Application Settings:

1. Go to **Settings** → **Environment variables** → **App settings**
2. Click **"+ Add"**
3. Name: `WEBSITE_STARTUP_COMMAND`
4. Value: `dotnet LegacySim.dll`
5. Click **"Apply"**

## Quick Test

After fixing deployment, visit:
```
https://chemtrac-legacy-app-h0f7awhad9fsbqg9.canadacentral-01.azurewebsites.net
```

---

**Note:** The URL with the long hash is normal for free tier Azure App Service. You can add a custom domain later if needed.

