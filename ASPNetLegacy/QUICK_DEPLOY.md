# ⚡ Quick Deploy to Azure App Service (5 Minutes)

## Prerequisites
- Azure account (free tier: https://azure.microsoft.com/free/)
- GitHub repo pushed

## Steps

### 1. Create App Service (3 minutes)
```
Portal → Create Resource → Web App
- Name: chemtrac-legacy-app
- Runtime: .NET 8
- OS: Linux (Free) or Windows
- Plan: F1 (Free)
- Create
```

### 2. Deploy from GitHub (2 minutes)
```
App Service → Deployment Center
- Source: GitHub
- Repository: your-repo
- Branch: main
- Save
```

### 3. Done! 🎉
Your app will be at: `https://chemtrac-legacy-app.azurewebsites.net`

## If Auto-Deploy Doesn't Work

1. **Get Publish Profile**:
   - App Service → "Get publish profile" → Download

2. **Use GitHub Actions** (already configured):
   - Go to your repo → Settings → Secrets
   - Add secret: `AZURE_WEBAPP_PUBLISH_PROFILE`
   - Paste the publish profile content
   - Push to main branch → GitHub Actions will deploy

## Free Tier Info
- **F1 Plan**: 1 GB RAM, 60 min/day compute
- Perfect for demos and comparisons!
- Shareable URL included

---

**That's it!** Your legacy ASP.NET app is live for free! 🚀

