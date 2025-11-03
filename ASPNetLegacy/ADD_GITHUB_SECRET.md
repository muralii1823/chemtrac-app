# ✅ Add Publish Profile to GitHub Secrets

Perfect! You have the publish profile. Now let's add it to GitHub so GitHub Actions can deploy.

## Step-by-Step Instructions:

### Step 1: Go to GitHub Secrets
1. Open your browser and go to:
   ```
   https://github.com/muralii1823/chemtrac-app/settings/secrets/actions
   ```

### Step 2: Add New Secret
1. Click **"New repository secret"** button (top right)

### Step 3: Fill in the Secret
1. **Name:** `AZURE_WEBAPP_PUBLISH_PROFILE`
   - Must be exactly this (case-sensitive)

2. **Secret:** 
   - Copy the **ENTIRE** publish profile XML content (from the image you showed)
   - It starts with `<publishData>` and ends with `</publishData>`
   - Include ALL the content, including all three profiles (Web Deploy, FTP, Zip Deploy)

3. Click **"Add secret"**

### Step 4: Verify Secret is Added
- You should see `AZURE_WEBAPP_PUBLISH_PROFILE` in the list of secrets
- It will show as masked (dots/asterisks) for security

### Step 5: Trigger Deployment
1. Go to your repo: `https://github.com/muralii1823/chemtrac-app`
2. Click **"Actions"** tab (top menu)
3. Find workflow: **"Deploy ASP.NET Legacy App to Azure"**
4. Click on it
5. Click **"Run workflow"** button (top right)
6. Select **"main"** branch
7. Click **"Run workflow"** (green button)

### Step 6: Watch Deployment
1. You'll see a new workflow run appear
2. Click on it to see the progress
3. It should take 2-3 minutes
4. Status should change to **"Success"** ✅

---

## What Happens Next:

1. GitHub Actions will:
   - Checkout your code
   - Build the ASP.NET app
   - Deploy it to Azure

2. Your app will be live at:
   ```
   https://chemtrac-legacy-app-h0f7awhad9fsbqg9.canadacentral-01.azurewebsites.net
   ```

3. Future deployments:
   - Every time you push to `main` branch
   - GitHub Actions will automatically deploy!

---

## If Deployment Fails:

Check the logs in GitHub Actions:
1. Click on the failed workflow run
2. Click on the job (e.g., "build-and-deploy")
3. Expand the failed step to see the error

Common issues:
- Wrong secret name (must be `AZURE_WEBAPP_PUBLISH_PROFILE`)
- Incomplete publish profile (must include all XML)
- Build errors (check the build step logs)

---

**Once the deployment succeeds, your legacy ASP.NET app will be live!** 🎉

