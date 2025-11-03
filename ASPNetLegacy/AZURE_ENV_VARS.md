# 🔧 Adding Environment Variables in Azure App Service

## Step-by-Step: Add Application Settings

### 1. Navigate to Environment Variables
You're already on the right page! You're at:
- **Settings** → **Environment variables** → **App settings** tab

### 2. Add Startup Command Setting

Click **"+ Add"** button and add:

**Setting 1:**
- **Name:** `WEBSITE_STARTUP_COMMAND`
- **Value:** `dotnet LegacySim.dll`
- **Deployment slot setting:** Leave unchecked (or check if you want it for all slots)
- Click **OK**

### 3. Add Working Directory Setting (Optional but helpful)

Click **"+ Add"** again and add:

**Setting 2:**
- **Name:** `SCM_SCRIPT_PATH`
- **Value:** `ASPNetLegacy\LegacySim`
- Click **OK**

### 4. Save Changes

1. Click **"Apply"** button at the bottom
2. Azure will restart your app automatically
3. Wait 1-2 minutes for restart

### 5. Verify

Visit your app URL:
```
https://chemtrac-legacy-app.azurewebsites.net
```

---

## Alternative: If Environment Variables Don't Work

If the app still doesn't start after adding these, try:

### Option A: Use web.config (Already Created)
The `web.config` file in `LegacySim` folder should handle this automatically. Make sure it's deployed.

### Option B: Fix Deployment Center
The deployment failed because Azure doesn't know where to build. 

1. Go to **Deployment Center** → **Settings**
2. Set **Working Directory** to: `ASPNetLegacy/LegacySim`
3. Save and redeploy

---

## Notes

- Environment variables take effect immediately after "Apply"
- The app will restart automatically
- Check **Log stream** in Azure Portal to see if it starts correctly

