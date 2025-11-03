# ⚡ Quick Deployment Checklist

## Pre-Deployment Setup ✅

All configuration files have been created:
- ✅ API client updated for environment variables
- ✅ CORS configured for production
- ✅ Procfile created for Render
- ✅ Vercel config created
- ✅ TypeScript types fixed

## Quick Steps

### 1. GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. PlanetScale (5 min)
1. Sign up: https://planetscale.com
2. Create database: `chemical-tests`
3. Copy connection string details

### 3. Render Backend (10 min)
1. Sign up: https://render.com
2. New → Web Service → Connect GitHub
3. Settings:
   - Root Directory: `Modern/backend`
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Environment Variables:
   ```
   MYSQL_HOST=your-planetscale-host
   MYSQL_USER=your-username
   MYSQL_PASSWORD=your-password
   MYSQL_DATABASE=chemical-tests
   ALLOWED_ORIGINS=http://localhost:3000
   ```

### 4. Vercel Frontend (5 min)
1. Sign up: https://vercel.com
2. Import GitHub repo
3. Settings:
   - Root Directory: `Modern/frontend`
   - Build: `npm run build`
4. Environment Variable:
   ```
   VITE_API_URL=https://your-render-backend.onrender.com
   ```

### 5. Update CORS
After getting Vercel URL, update Render:
```
ALLOWED_ORIGINS=http://localhost:3000,https://your-app.vercel.app
```

## 🎉 Done!

Share your Vercel URL - everyone can use it!

See DEPLOYMENT_GUIDE.md for detailed instructions.

