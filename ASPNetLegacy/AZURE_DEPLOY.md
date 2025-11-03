# 🚀 Deploy ASP.NET Legacy App to Azure App Service (Free Tier)

## Quick Deploy Guide

### Step 1: Create Azure Account (Free)
1. Go to https://azure.microsoft.com/free/
2. Sign up (Free tier includes 12 months of free services)
3. Verify your account

### Step 2: Create Azure App Service
1. Go to https://portal.azure.com
2. Click **"Create a resource"** or **"+ Create"**
3. Search for **"Web App"**
4. Click **"Create"**

### Step 3: Configure App Service
1. **Subscription**: Choose your free subscription
2. **Resource Group**: Create new (e.g., "chemtrac-legacy")
3. **Name**: `chemtrac-legacy-app` (or your preferred name)
4. **Publish**: Code
5. **Runtime stack**: `.NET 8`
6. **Operating System**: Linux (free tier) or Windows
7. **Region**: Choose closest to you
8. **App Service Plan**: 
   - Click "Create new"
   - Name: `chemtrac-legacy-plan`
   - **SKU and size**: **F1 (Free)** - 1 GB RAM
   - Click "OK"
9. Click **"Review + create"**
10. Click **"Create"**
11. Wait 2-3 minutes for deployment

### Step 4: Deploy from GitHub (Easiest Method)

**Option A: Using Azure Deployment Center (Recommended)**
1. Once created, go to your App Service
2. In the left menu, click **"Deployment Center"**
3. Select **"GitHub"** as source
4. Authorize GitHub if needed
5. Select:
   - **Organization**: Your GitHub username
   - **Repository**: `muralii1823/chemtrac-app` (or your repo)
   - **Branch**: `main`
   - **Build provider**: GitHub Actions (or App Service build service)
6. Click **"Save"**
7. Azure will automatically deploy when you push to main branch

**Option B: Manual ZIP Deploy (If GitHub Actions doesn't work)**
1. Go to **"Advanced Tools (Kudu)"** → **"Go"** (opens in new tab)
2. Click **"Debug console"** → **"CMD"**
3. Navigate to `site/wwwroot`
4. Or use Azure CLI:
   ```bash
   az webapp deployment source config-zip \
     --resource-group chemtrac-legacy \
     --name chemtrac-legacy-app \
     --src deploy.zip
   ```

### Step 5: Configure Build Settings (for Linux App Service)
1. Go to **"Configuration"** → **"General settings"**
2. **Startup command**: Leave empty (Azure will auto-detect)
3. **Working directory**: Leave as default
4. Click **"Save"**

**Note**: If using Windows App Service, you may need to set:
- **Startup command**: `dotnet LegacySim.dll`
- **Working directory**: `ASPNetLegacy/LegacySim`

### Step 6: Verify Deployment
1. Go to **"Overview"** in your App Service
2. Click the **URL** (e.g., `https://chemtrac-legacy-app.azurewebsites.net`)
3. You should see the Legacy Chemical Test App homepage!

## Alternative: Manual Deployment via ZIP

If GitHub Actions doesn't work:

1. **Build locally**:
   ```bash
   cd ASPNetLegacy/LegacySim
   dotnet publish -c Release -o ./publish
   ```

2. **Create ZIP**:
   ```bash
   cd publish
   zip -r ../deploy.zip .
   ```

3. **Deploy**:
   - Go to App Service → **"Deployment Center"**
   - Select **"Local Git"** or **"ZIP Deploy"**
   - Upload the ZIP file

## Troubleshooting

### If the app doesn't start:
1. Check **"Log stream"** in Azure Portal
2. Check **"Console"** for errors
3. Verify the startup command is correct

### Database issues:
- SQLite database is stored in persistent storage
- First request will create the database automatically

## Free Tier Limits

- **F1 (Free) Plan**:
  - 1 GB RAM
  - 1 GB storage
  - 60 minutes compute time per day
  - Perfect for demo/comparison purposes!

## Your App URL

Once deployed, your app will be available at:
```
https://[your-app-name].azurewebsites.net
```

Share this URL to show the legacy ASP.NET/IIS-style deployment!

---

**That's it!** Your legacy ASP.NET app is now live on Azure App Service (IIS-like hosting) for free! 🎉

