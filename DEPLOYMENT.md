# Deployment Guide

This guide will help you deploy your Valentine Proposal app to production.

## Prerequisites

1. **Database**: You already have a Neon PostgreSQL database set up
2. **Environment Variables**: You'll need to set these in your hosting platform:
   - `DATABASE_URL` - Your Neon database connection string
   - `PORT` - (Optional) Server port, defaults to 5000
   - `NODE_ENV` - Set to `production`

## Build the Application

Before deploying, test the build locally:

```bash
npm run build
```

This will:
- Build the React client (outputs to `dist/public/`)
- Build the Express server (outputs to `dist/index.cjs`)

## Deployment Options

### Option 1: Railway (Recommended - Easiest)

Railway is great for full-stack apps with databases.

1. **Sign up**: Go to https://railway.app and sign up (free tier available)

2. **Install Railway CLI** (optional, or use web UI):
   ```bash
   npm i -g @railway/cli
   railway login
   ```

3. **Deploy**:
   - **Via Web UI**:
     - Go to Railway dashboard
     - Click "New Project"
     - Select "Deploy from GitHub repo" (connect your GitHub)
     - OR "Empty Project" then "Add Service" → "GitHub Repo"
   
   - **Via CLI**:
     ```bash
     railway init
     railway up
     ```

4. **Set Environment Variables** in Railway:
   - Go to your project → Variables tab
   - Add:
     ```
     DATABASE_URL=your_neon_connection_string
     NODE_ENV=production
     PORT=5000
     ```

5. **Configure Build & Start**:
   - Railway will auto-detect `package.json`
   - Build command: `npm run build`
   - Start command: `npm start`
   - Root directory: `/` (project root)

6. **Your app will be live!** Railway gives you a URL like `https://your-app.railway.app`

---

### Option 2: Render

Render is another great option for Node.js apps.

1. **Sign up**: Go to https://render.com and sign up

2. **Create a Web Service**:
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Or use "Public Git repository" and paste your repo URL

3. **Configure**:
   - **Name**: `valentine-proposal` (or any name)
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Root Directory**: `/` (leave empty)

4. **Set Environment Variables**:
   - Scroll to "Environment Variables"
   - Add:
     ```
     DATABASE_URL=your_neon_connection_string
     NODE_ENV=production
     PORT=10000
     ```
   - Note: Render uses port 10000 by default, or check the PORT env var they provide

5. **Deploy**: Click "Create Web Service"

6. **Your app will be live!** Render gives you a URL like `https://valentine-proposal.onrender.com`

---

### Option 3: Vercel (Frontend) + Railway/Render (Backend)

For better performance, you can split frontend and backend:

**Backend (Railway/Render)**:
- Deploy the full app as above
- Get the backend URL (e.g., `https://api.railway.app`)

**Frontend (Vercel)**:
1. Go to https://vercel.com
2. Import your GitHub repo
3. Configure:
   - Framework Preset: `Vite`
   - Build Command: `npm run build` (but only build client)
   - Output Directory: `dist/public`
   - Install Command: `npm install`

**Note**: This requires more setup to proxy API calls. The single-server approach (Option 1 or 2) is simpler.

---

### Option 4: Fly.io

1. **Install Fly CLI**:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login**:
   ```bash
   fly auth login
   ```

3. **Create app**:
   ```bash
   fly launch
   ```

4. **Set secrets**:
   ```bash
   fly secrets set DATABASE_URL=your_neon_connection_string
   fly secrets set NODE_ENV=production
   ```

5. **Deploy**:
   ```bash
   fly deploy
   ```

---

## Important Notes

### File Uploads

Currently, uploaded images are stored in `client/public/uploads/`. In production:

- **Option A**: Keep using local storage (files will be lost on redeploy)
  - Works for temporary/demo deployments
  - Files are stored on the server's filesystem

- **Option B**: Use cloud storage (Recommended for production)
  - Upload to AWS S3, Cloudinary, or similar
  - Update `server/routes.ts` to use cloud storage instead of multer disk storage
  - This requires code changes

For now, **Option A** will work for your Valentine proposal! 🎉

### Database Migrations

If you need to update the database schema:
```bash
npm run db:push
```

Make sure `DATABASE_URL` is set in your environment.

---

## Quick Deploy Checklist

- [ ] Build works locally: `npm run build`
- [ ] Database connection string is ready
- [ ] Environment variables are set in hosting platform
- [ ] Build command: `npm run build`
- [ ] Start command: `npm start`
- [ ] Port is configured (check hosting platform requirements)

---

## Testing Production Build Locally

Before deploying, test the production build:

```bash
# Build
npm run build

# Set environment variables
export DATABASE_URL=your_neon_connection_string
export NODE_ENV=production
export PORT=5000

# Start
npm start
```

Visit `http://localhost:5000` to verify everything works!

---

## Need Help?

- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs
- **Fly.io Docs**: https://fly.io/docs

Good luck with your deployment! 💕
