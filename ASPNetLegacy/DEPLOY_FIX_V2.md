# 🔧 Fix Deployment - Build Provider Not Editable

Since you can't edit the build provider, here are **3 working solutions**:

---

## Solution 1: Fix GitHub Actions (Recommended)

GitHub Actions needs a publish profile secret. Here's how to set it up:

### Step 1: Get Publish Profile
1. Go to your App Service → **Overview**
2. Click **"Download publish profile"** (top bar)
3. Save the `.PublishSettings` file

### Step 2: Add to GitHub Secrets
1. Go to your GitHub repo: `https://github.com/muralii1823/chemtrac-app`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. **Name:** `AZURE_WEBAPP_PUBLISH_PROFILE`
5. **Secret:** Open the `.PublishSettings` file and copy **ALL** the content
6. Paste it into the secret value field
7. Click **"Add secret"**

### Step 3: Trigger Deployment
1. Go to your repo → **Actions** tab
2. Find the workflow: **"Deploy ASP.NET Legacy App to Azure"**
3. Click **"Run workflow"** → **"Run workflow"** button
4. Wait 2-3 minutes for deployment

---

## Solution 2: Disconnect & Reconnect GitHub

If you want to use App Service build service instead:

### Step 1: Disconnect GitHub
1. Go to **Deployment Center** → **Settings**
2. Click **"Disconnect"** button
3. Confirm disconnection

### Step 2: Reconnect with Different Settings
1. Click **"Setup"** or **"Connect"**
2. Select **"GitHub"**
3. Authorize if needed
4. Select your repo: `muralii1823/chemtrac-app`
5. **Important:** When choosing build provider, select **"App Service build service"** (not GitHub Actions)
6. Click **"Save"**

---

## Solution 3: Manual ZIP Deploy (Fastest - No Build Needed)

If you have .NET installed locally, we can build and deploy directly:

### Step 1: Create Deployment Script
I'll create a script that builds and deploys for you.

### Step 2: Use Azure CLI
```bash
# Install Azure CLI if needed
# macOS: brew install azure-cli

# Login
az login

# Build and deploy
cd ASPNetLegacy/LegacySim
dotnet publish -c Release -o ./publish
cd publish
zip -r ../../deploy.zip .

# Deploy
az webapp deployment source config-zip \
  --resource-group chemtrac-legacy-app_group \
  --name chemtrac-legacy-app \
  --src ../../deploy.zip
```

---

## Which Solution to Use?

- **Solution 1** (GitHub Actions): Best for automatic deployments on every push
- **Solution 2** (Reconnect): Best if you want Azure to build it automatically
- **Solution 3** (ZIP Deploy): Fastest if you just want it working now

---

## Quick Fix: Try Solution 1 First

The GitHub Actions workflow is already set up - you just need the publish profile secret. This will give you automatic deployments!

**Steps:**
1. Download publish profile from Azure
2. Add as GitHub secret: `AZURE_WEBAPP_PUBLISH_PROFILE`
3. Run workflow from Actions tab

This should work! 🎯

