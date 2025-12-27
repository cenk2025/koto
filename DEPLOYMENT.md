# Deployment Guide - Finland Guide

This guide will help you deploy the Finland Guide application to Vercel with Supabase integration.

## Prerequisites

- GitHub account
- Vercel account (free tier is sufficient)
- Supabase account (free tier is sufficient)
- Git installed locally

## Step 1: Set Up Supabase

### 1.1 Create a New Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in:
   - Project name: `finland-guide`
   - Database password: (create a strong password and save it)
   - Region: Choose closest to your users (e.g., Europe West)
5. Click "Create new project"
6. Wait for the project to be created (2-3 minutes)

### 1.2 Set Up Database Schema

1. In your Supabase project dashboard, click on "SQL Editor" in the left sidebar
2. Click "New query"
3. Copy and paste the following SQL:

\`\`\`sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create CVs table
CREATE TABLE cvs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  personal_info JSONB DEFAULT '{}',
  summary TEXT,
  experience JSONB DEFAULT '[]',
  education JSONB DEFAULT '[]',
  skills JSONB DEFAULT '[]',
  languages JSONB DEFAULT '[]',
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create saved_services table
CREATE TABLE saved_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  service_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_services ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- CVs policies
CREATE POLICY "Users can view their own CVs" ON cvs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own CVs" ON cvs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own CVs" ON cvs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own CVs" ON cvs
  FOR DELETE USING (auth.uid() = user_id);

-- Saved services policies
CREATE POLICY "Users can view their saved services" ON saved_services
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert saved services" ON saved_services
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete saved services" ON saved_services
  FOR DELETE USING (auth.uid() = user_id);
\`\`\`

4. Click "Run" to execute the SQL
5. Verify that all tables were created successfully

### 1.3 Get Your Supabase Credentials

1. In your Supabase project dashboard, click on "Settings" (gear icon) in the left sidebar
2. Click on "API" in the settings menu
3. Copy the following values:
   - **Project URL**: This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public**: This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Save these values - you'll need them for Vercel

## Step 2: Prepare Your Code for Deployment

### 2.1 Create .gitignore (if not exists)

Make sure your `.gitignore` includes:

\`\`\`
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
\`\`\`

### 2.2 Update package.json Scripts

Ensure your `package.json` has these scripts:

\`\`\`json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
\`\`\`

## Step 3: Push to GitHub

### 3.1 Initialize Git Repository (if not already done)

\`\`\`bash
git init
git add .
git commit -m "Initial commit: Finland Guide application"
\`\`\`

### 3.2 Create GitHub Repository

1. Go to [https://github.com](https://github.com)
2. Click the "+" icon in the top right
3. Click "New repository"
4. Fill in:
   - Repository name: `finland-guide`
   - Description: "Comprehensive guide for immigrants in Finland"
   - Visibility: Public or Private (your choice)
5. Click "Create repository"

### 3.3 Push Your Code

\`\`\`bash
git remote add origin https://github.com/YOUR_USERNAME/finland-guide.git
git branch -M main
git push -u origin main
\`\`\`

## Step 4: Deploy to Vercel

### 4.1 Import Project to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New..." → "Project"
4. Find your `finland-guide` repository and click "Import"

### 4.2 Configure Project

1. **Framework Preset**: Next.js (should be auto-detected)
2. **Root Directory**: `./` (leave as default)
3. **Build Command**: `npm run build` (should be auto-filled)
4. **Output Directory**: `.next` (should be auto-filled)

### 4.3 Add Environment Variables

Click on "Environment Variables" and add the following:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon public key |
| `NEXT_PUBLIC_APP_URL` | Will be provided by Vercel after deployment |

**Note**: Leave `NEXT_PUBLIC_APP_URL` empty for now. You'll update it after the first deployment.

### 4.4 Deploy

1. Click "Deploy"
2. Wait for the deployment to complete (2-5 minutes)
3. Once deployed, you'll see a success message with your deployment URL

### 4.5 Update APP_URL

1. Copy your Vercel deployment URL (e.g., `https://finland-guide.vercel.app`)
2. Go to your project settings in Vercel
3. Click on "Environment Variables"
4. Update `NEXT_PUBLIC_APP_URL` with your deployment URL
5. Click "Save"
6. Redeploy the project (Vercel will do this automatically)

## Step 5: Configure Custom Domain (Optional)

### 5.1 Add Your Domain to Vercel

1. In your Vercel project dashboard, click on "Settings"
2. Click on "Domains"
3. Enter your domain name (e.g., `finlandguide.fi`)
4. Click "Add"

### 5.2 Configure DNS

Vercel will provide you with DNS records to add to your domain registrar:

**For Apex Domain (finlandguide.fi):**
- Type: A
- Name: @
- Value: 76.76.21.21

**For www Subdomain:**
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com

### 5.3 Wait for DNS Propagation

- DNS changes can take 24-48 hours to propagate
- Vercel will automatically provision an SSL certificate once DNS is configured

## Step 6: Enable Supabase Authentication (Optional)

### 6.1 Configure Supabase Auth

1. In your Supabase project, go to "Authentication" → "Providers"
2. Enable "Email" provider
3. Configure email templates if desired
4. Add your Vercel domain to "Site URL" and "Redirect URLs"

### 6.2 Update Authentication Code

The current implementation has placeholder authentication. To enable real authentication:

1. Update `src/app/auth/login/page.tsx` to use Supabase auth
2. Update `src/app/auth/register/page.tsx` to use Supabase auth
3. Add authentication context and protected routes

## Step 7: Verify Deployment

### 7.1 Test Your Application

Visit your Vercel URL and test:

- ✅ Homepage loads correctly
- ✅ Navigation works
- ✅ Language switcher works (Finnish/English)
- ✅ CV Builder loads and forms work
- ✅ Services page displays and filters work
- ✅ Guides page displays content
- ✅ Dashboard loads

### 7.2 Test on Mobile

- Open your site on a mobile device
- Verify responsive design works
- Test mobile menu

## Troubleshooting

### Build Fails

**Issue**: Build fails with module not found errors
**Solution**: 
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
git add .
git commit -m "Fix dependencies"
git push
\`\`\`

### Environment Variables Not Working

**Issue**: Supabase connection fails
**Solution**:
1. Verify environment variables in Vercel dashboard
2. Make sure variable names start with `NEXT_PUBLIC_`
3. Redeploy after adding/changing variables

### Images Not Loading

**Issue**: Images return 404
**Solution**:
1. Ensure images are in the `public` folder
2. Reference images with `/image-name.ext` (starting with `/`)

## Continuous Deployment

Once set up, Vercel will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Run builds and tests before deployment

## Monitoring and Analytics

### Enable Vercel Analytics

1. In your Vercel project dashboard, click on "Analytics"
2. Click "Enable Analytics"
3. Add the analytics component to your app (optional)

### Monitor Performance

- Check deployment logs in Vercel dashboard
- Monitor function execution times
- Review error logs

## Next Steps

1. **Add Real Authentication**: Implement Supabase authentication
2. **Add Storage**: Configure Supabase Storage for CV photos
3. **Add Email**: Set up email notifications
4. **SEO Optimization**: Add meta tags and sitemap
5. **Performance**: Optimize images and add caching
6. **Analytics**: Add Google Analytics or Plausible

## Support

For issues or questions:
- Check Vercel documentation: [https://vercel.com/docs](https://vercel.com/docs)
- Check Supabase documentation: [https://supabase.com/docs](https://supabase.com/docs)
- Check Next.js documentation: [https://nextjs.org/docs](https://nextjs.org/docs)

---

**Congratulations!** 🎉 Your Finland Guide application is now live!
