# 🔍 Enable Logs to Debug HTTP 500 Error

## Step 1: Enable Application Logs in Azure

1. Go to Azure Portal → Your App Service (`chemtrac-legacy-app`)
2. Go to **"App Service logs"** (under Monitoring or Settings)
3. Enable:
   - **Application Logging (Filesystem)**: **On**
   - **Level**: **Information** or **Verbose**
   - **Web server logging**: **Off** (for now)
4. Click **"Save"** at the top
5. Wait 30 seconds for changes to apply

## Step 2: View Logs

1. Go to **"Log stream"** (under Monitoring)
2. Click **"Start"** or refresh the page
3. Now try accessing `/Tests` again
4. You should see the actual error message in the logs!

## Step 3: Share the Error

Copy the error message from the logs and we can fix it!

---

## Quick Fix: Check Database Path

The issue might be the database path. For **Windows App Service**, the path might be different.

Let me also update the code to handle Windows paths better.

