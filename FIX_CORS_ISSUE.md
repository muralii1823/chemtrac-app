# Fix CORS Issue

## Problem
CORS (Cross-Origin Resource Sharing) error blocking requests from Vercel frontend to Render backend.

Error: `Access to XMLHttpRequest at 'https://chemtrac-app.onrender.com/tests' from origin 'https://chemtrac-xz652hdr6-muralis-projects-6e29d5d0.vercel.app' has been blocked by CORS policy`

## Solution Applied

I've updated the backend to allow all origins temporarily. **This is fine for a demo/POC**, but for production you should restrict to specific domains.

### What Changed

1. ✅ Updated `Modern/backend/app/main.py` to allow all origins (`allow_origins=["*"]`)
2. ✅ Set `allow_credentials=False` (required when using wildcard origins)

### Deploy the Fix

1. **Commit and push the changes:**
   ```bash
   cd /Users/muralidharan/Documents/MURALIPOC
   git add Modern/backend/app/main.py
   git commit -m "Fix CORS: Allow all origins for Vercel previews"
   git push origin main
   ```

2. **Render will auto-deploy** - Wait 2-3 minutes for the backend to redeploy

3. **Test the frontend** - The CORS error should be gone!

## For Production (Later)

Once you have your final Vercel production domain, update the backend to use specific origins:

**In Render Dashboard → Environment Variables:**
```
ALLOWED_ORIGINS=https://your-production-domain.vercel.app,https://your-custom-domain.com
```

Then update `Modern/backend/app/main.py` line 89 to:
```python
allow_origins=allowed_origins,  # Use specific origins from env var
allow_credentials=True,  # Can enable when using specific origins
```

## Quick Test

After Render redeploys, test:
```bash
curl -I https://chemtrac-app.onrender.com/api/health
```

Should return 200 OK.

Then test from browser console on your Vercel frontend:
```javascript
fetch('https://chemtrac-app.onrender.com/api/tests')
  .then(r => r.json())
  .then(console.log)
```

No CORS errors should appear!

