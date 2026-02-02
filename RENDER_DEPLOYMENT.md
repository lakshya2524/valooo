# Render Deployment Guide - Step by Step

Follow these steps to deploy your Valentine Proposal app to Render.

## Prerequisites

✅ Your code is pushed to GitHub (or GitLab/Bitbucket)  
✅ You have your Neon database connection string ready  
✅ You have a Render account (free tier available)

---

## Step 1: Sign Up / Log In to Render

1. Go to **https://render.com**
2. Click **"Get Started for Free"** or **"Log In"**
3. Sign up with GitHub (recommended) or email

---

## Step 2: Create a New Web Service

1. In your Render dashboard, click **"New +"** button (top right)
2. Select **"Web Service"**
3. You'll see two options:
   - **"Connect a repository"** (if you signed up with GitHub)
   - **"Public Git repository"** (for any Git repo)

### Option A: Connect GitHub Repository (Recommended)

1. Click **"Connect account"** if not already connected
2. Authorize Render to access your GitHub
3. Find and select your **Valentine-Proposal** repository
4. Click **"Connect"**

### Option B: Public Git Repository

1. Select **"Public Git repository"**
2. Enter your repository URL:
   ```
   https://github.com/your-username/Valentine-Proposal.git
   ```
3. Click **"Continue"**

---

## Step 3: Configure Your Service

Fill in the following settings:

### Basic Settings

- **Name**: `valentine-proposal` (or any name you like)
- **Region**: Choose closest to you (e.g., `Oregon (US West)` or `Frankfurt (EU)`)
- **Branch**: `main` or `master` (your default branch)
- **Root Directory**: Leave **empty** (or `/` if required)

### Build & Deploy Settings

- **Environment**: Select **"Node"**
- **Build Command**: 
  ```
  npm run build
  ```
- **Start Command**: 
  ```
  npm start
  ```

### Advanced Settings (Optional)

- **Auto-Deploy**: `Yes` (deploys automatically on git push)
- **Health Check Path**: Leave empty (or use `/`)

---

## Step 4: Set Environment Variables

This is **CRITICAL** - your app won't work without these!

1. Scroll down to **"Environment Variables"** section
2. Click **"Add Environment Variable"** for each:

   **Variable 1:**
   - **Key**: `DATABASE_URL`
   - **Value**: Your Neon database connection string
     ```
     postgresql://neondb_owner:npg_JnaN3TyReF6P@ep-muddy-sunset-afyen6j3-pooler.c-2.us-west-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require
     ```
     *(Replace with your actual Neon connection string)*

   **Variable 2:**
   - **Key**: `NODE_ENV`
   - **Value**: `production`

   **Variable 3:**
   - **Key**: `PORT`
   - **Value**: Leave this **empty** - Render automatically sets this!

3. Click **"Save Changes"** after adding each variable

---

## Step 5: Deploy!

1. Scroll to the bottom of the page
2. Click **"Create Web Service"**
3. Render will start building your app! 🚀

You'll see the build logs in real-time. This takes about 5-10 minutes the first time.

---

## Step 6: Wait for Deployment

Watch the build logs:

1. **Installing dependencies** - Installing npm packages
2. **Building client...** - Building React app with Vite
3. **Building server...** - Building Express server with esbuild
4. **Starting service** - Your app is starting!

✅ When you see **"Your service is live"**, you're done!

---

## Step 7: Access Your App

1. Render will give you a URL like:
   ```
   https://valentine-proposal.onrender.com
   ```
   or
   ```
   https://valentine-proposal-xxxx.onrender.com
   ```

2. Click the URL or copy it to share! 🎉

---

## Troubleshooting

### Build Fails

**Error: "Cannot find module"**
- Make sure all dependencies are in `package.json`
- Check that `npm run build` works locally first

**Error: "DATABASE_URL must be set"**
- Go to Environment Variables and add `DATABASE_URL`
- Make sure you saved it!

**Error: "Build directory not found"**
- Make sure build command is: `npm run build`
- Check build logs to see what failed

### App Crashes After Deploy

**Check Logs:**
1. Go to your service in Render dashboard
2. Click **"Logs"** tab
3. Look for error messages

**Common Issues:**
- Missing `DATABASE_URL` → Add it in Environment Variables
- Wrong `PORT` → Don't set PORT manually, Render handles it
- Database connection failed → Check your Neon connection string

### Images Not Loading

- Uploaded images are stored locally and will be lost on redeploy
- For production, consider using cloud storage (S3, Cloudinary)
- For now, re-upload images after each deployment

---

## Updating Your App

Render auto-deploys when you push to your connected branch!

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update message"
   git push
   ```
3. Render will automatically detect and redeploy

Or manually trigger:
1. Go to Render dashboard
2. Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## Free Tier Limitations

Render's free tier includes:
- ✅ 750 hours/month (enough for 24/7 if it's your only service)
- ✅ Automatic SSL (HTTPS)
- ✅ Custom domain support
- ⚠️ Services spin down after 15 minutes of inactivity
- ⚠️ First request after spin-down takes ~30 seconds to wake up

**Pro tip**: Use a service like UptimeRobot (free) to ping your app every 5 minutes to keep it awake!

---

## Next Steps

1. ✅ Test your deployed app
2. ✅ Share the URL with your Valentine! 💕
3. (Optional) Set up a custom domain
4. (Optional) Set up uptime monitoring to prevent spin-down

---

## Quick Reference

**Render Dashboard**: https://dashboard.render.com  
**Your Service URL**: Check your Render dashboard  
**Neon Database**: https://console.neon.tech  

**Need Help?**
- Render Docs: https://render.com/docs
- Render Support: support@render.com

Good luck! Your Valentine will love it! 💖
