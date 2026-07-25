# The Ultimate Deployment Guide (For a 15-year-old Beginner!) 🚀

Hey there! I know deployment sounds scary, but it's really just putting your code on someone else's computer so the whole world can see it. 

We have two parts to deploy:
1. **Frontend (React/Vite)** -> We will deploy this on **Vercel** (it's free, super fast, and easy).
2. **Backend (Node.js/Express)** -> We will deploy this on **Render** (also free, great for backends).
3. **Database (Supabase)** -> Where your contact form submissions live.

Follow these steps exactly, take your time, and you'll do great!

---

## 🟢 Phase 1: Save Your Code to GitHub
Before you can deploy, your code needs to be on GitHub. Both Vercel and Render will pull your code directly from there.

1. Go to [GitHub.com](https://github.com/) and create a free account if you don't have one.
2. Click the green **"New"** button to create a new repository.
   - Name it something like `moonworks-website`.
   - Set it to **Private** or **Public** (either is fine).
   - DO NOT check "Add a README file" (leave it empty).
   - Click **Create repository**.
3. Now, open your terminal (VS Code terminal is perfect) and make sure you are inside your project folder (`MoonWorks Talent`).
4. Run these exact commands one by one in your terminal:
   ```bash
   git init
   git add .
   git commit -m "My first commit 🚀"
   git branch -M main
   # IMPORTANT: Copy the next two lines from the GitHub page you just created!
   # It will look something like this:
   git remote add origin https://github.com/your-username/moonworks-website.git
   git push -u origin main
   ```
Awesome! Your code is now safely on the internet. 🥳

---

## 🟠 Phase 2: Setup Supabase (Your Database)
This is where the contact form submissions will be saved!

1. Go to [Supabase.com](https://supabase.com/) and sign in with GitHub.
2. Click **New Project** and select an Organization.
   - Name it `moonworks-db`. //Password for db : Moon@Talent600
   - Create a strong Database Password (save it somewhere safe).
   - Select the region closest to India (like Mumbai or Singapore).
   - Click **Create new project** (it takes a few minutes to setup).
3. Once it's ready, go to the **SQL Editor** (the little `</>` icon on the left).
4. Click **New query**, paste the following code, and click **Run** (bottom right):
   ```sql
   create table contact_submissions (
     id uuid primary key default gen_random_uuid(),
     name text not null,
     email text not null,
     track_interest text,
     message text,
     source_page text,
     status text default 'new',
     created_at timestamptz default now()
   );
   ```
5. Get your secret keys! Go to **Project Settings** (gear icon) -> **API** (on the left menu).
   - Copy the **Project URL** (This is your `SUPABASE_URL`).
   - Copy the **service_role secret** key (scroll down, click Reveal. This is your `SUPABASE_SERVICE_KEY`).
   - Keep these two secret strings safe! We need them in Phase 3.

---

## 🔵 Phase 3: Deploy Backend on Render
Now we put your Node.js backend on Render.

1. Go to [Render.com](https://render.com/) and sign in with GitHub.
2. Click **New** -> **Web Service**.
3. Under "Build and deploy from a Git repository", select your `moonworks-website` GitHub repo.
4. Fill in these details:
   - **Name**: `moonworks-api`
   - **Region**: Singapore (or nearest)
   - **Branch**: `main`
   - **Root Directory**: `server` (SUPER IMPORTANT! Because your backend is in the `server` folder).
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free
5. Scroll down to **Environment Variables** and add these three:
   - Key: `SUPABASE_URL` | Value: *(Paste your Supabase URL from Phase 2)*
   - Key: `SUPABASE_SERVICE_KEY` | Value: *(Paste your Supabase service_role key from Phase 2)*
   - Key: `FRONTEND_URL` | Value: *Leave this blank for now, we'll update it later.*
6. Click **Create Web Service**.
7. Wait a few minutes while Render builds it. Once it says "Live", copy the **Render URL** at the top left (it looks like `https://moonworks-api-xxxx.onrender.com`). Save this!

---

## ⚫ Phase 4: Deploy Frontend on Vercel
Now for the exciting part—putting your actual website on the internet!

1. Go to [Vercel.com](https://vercel.com/) and sign in with GitHub.
2. Click **Add New...** -> **Project**.
3. Import your `moonworks-website` GitHub repo.
4. Fill in these details:
   - **Project Name**: `moonworks-talent`
   - **Framework Preset**: Vite (Vercel should auto-detect this).
   - **Root Directory**: Leave it as `./` (This is correct for the frontend).
5. Open **Environment Variables** and add one:
   - Key: `VITE_API_URL`
   - Value: *(Paste your Render URL from Phase 3! No slash at the end. Example: `https://moonworks-api-xxxx.onrender.com`)*
6. Click **Deploy**.
7. Wait 1 minute... Boom! 🎉 Vercel will give you a live website URL (like `https://moonworks-talent.vercel.app`). Copy this link!

---

## 🔗 Phase 5: The Final Connection (Connecting Frontend back to Backend)
Remember in Phase 3, we left `FRONTEND_URL` blank? We need to tell the backend to only accept form submissions from your Vercel website (this is called CORS).

1. Go back to Render -> Your Web Service (`moonworks-api`) -> **Environment**.
2. Find `FRONTEND_URL` and click Edit.
3. Paste your Vercel Website URL (e.g., `https://moonworks-talent.vercel.app`).
4. Click **Save Changes**. Render will automatically restart your backend.

---

## 🏆 You're Done!
Go to your live Vercel URL. Your Moonworks Talent website is live, fast, and the contact form will save submissions straight into your Supabase database!

If anything goes wrong, don't panic. Read the error messages (in Render's "Logs" or Vercel's "Deployments"), google them, or ask for help. You've got this! 💪
