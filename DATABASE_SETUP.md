# Database Setup Guide

This app requires a PostgreSQL database. Here are two easy ways to get one:

## Option 1: Free Cloud Database (Recommended - Easiest)

### Using Neon (https://neon.tech)
1. Go to https://neon.tech and sign up (free)
2. Create a new project
3. Copy the connection string (it looks like: `postgresql://user:password@host.neon.tech/dbname`)
4. Paste it into your `.env` file as `DATABASE_URL`

### Using Supabase (https://supabase.com)
1. Go to https://supabase.com and sign up (free)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string (use the "Connection string" under "Connection pooling")
5. Paste it into your `.env` file as `DATABASE_URL`

### Using Railway (https://railway.app)
1. Go to https://railway.app and sign up (free $5 credit)
2. Create a new project → Add PostgreSQL
3. Click on the PostgreSQL service → Variables tab
4. Copy the `DATABASE_URL` value
5. Paste it into your `.env` file

## Option 2: Local PostgreSQL

1. **Install PostgreSQL:**
   - Download from https://www.postgresql.org/download/windows/
   - Or use Chocolatey: `choco install postgresql`
   - Or use Docker: `docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres`

2. **Create a database:**
   ```powershell
   # Connect to PostgreSQL (password is what you set during installation)
   psql -U postgres
   
   # Create database
   CREATE DATABASE valentine_db;
   
   # Exit
   \q
   ```

3. **Update `.env` file:**
   ```
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/valentine_db
   ```
   Replace `your_password` with your PostgreSQL password.

## After Setting Up Database

1. **Push the database schema:**
   ```powershell
   npm run db:push
   ```

2. **Run the app:**
   ```powershell
   npm run dev
   ```

The app will be available at http://localhost:5000
