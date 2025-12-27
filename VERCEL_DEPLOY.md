# Vercel Deployment Guide for Finland Guide

## Quick Deployment Steps

### 1. Import Project to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import `cenk2025/koto` repository
4. Click "Import"

### 2. Configure Environment Variables

Add these environment variables in Vercel:

| Variable Name | Value | Where to Get It |
|--------------|-------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xuegknheotnkskxhkakw.supabase.co` | Already configured |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Already configured |
| `NEXT_PUBLIC_APP_URL` | `https://mamu.voon.fi` | Your domain |
| `OPENAI_API_KEY` | `sk-...` | Get from [OpenAI Platform](https://platform.openai.com/api-keys) |

**IMPORTANT:** The `OPENAI_API_KEY` should ONLY be added in Vercel, never commit it to Git!

### 3. Deploy

1. Click "Deploy"
2. Wait for deployment to complete (2-5 minutes)
3. Your app will be live at the Vercel URL

### 4. Configure Custom Domain

1. In Vercel project settings, go to "Domains"
2. Add `mamu.voon.fi`
3. Configure DNS at your domain provider:
   - Type: CNAME
   - Name: mamu
   - Value: cname.vercel-dns.com
4. Wait for DNS propagation (can take up to 48 hours)

## Getting OpenAI API Key

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Name it "Finland Guide - Production"
5. Copy the key (starts with `sk-`)
6. Add it to Vercel environment variables as `OPENAI_API_KEY`

**Note:** OpenAI API usage is pay-as-you-go. GPT-4o-mini is very affordable (~$0.15 per 1M input tokens).

## Supabase Configuration

✅ Database tables are already created
✅ Row Level Security (RLS) is enabled
✅ All policies are configured

The following tables are set up:
- `profiles` - User profiles
- `cvs` - User CVs
- `saved_services` - Saved services
- `chat_conversations` - Chat history
- `chat_messages` - Chat messages

## Testing After Deployment

1. Visit your deployed URL
2. Test the chatbot by clicking the chat button
3. Try asking: "How do I apply for a residence permit?"
4. Create a CV and download as PDF
5. Browse services and guides
6. Switch between Finnish and English

## Features Deployed

✅ Homepage with hero section
✅ CV Builder with PDF export
✅ Services directory (10+ cities)
✅ Comprehensive guides
✅ User dashboard
✅ AI Chatbot (GPT-4o-mini)
✅ Bilingual support (FI/EN)
✅ Responsive design

## Monitoring

- Check deployment logs in Vercel dashboard
- Monitor API usage in OpenAI dashboard
- Check database usage in Supabase dashboard

## Troubleshooting

### Chatbot Not Working

**Issue:** Chatbot shows error message
**Solution:** 
1. Verify `OPENAI_API_KEY` is set in Vercel
2. Check OpenAI account has credits
3. Redeploy after adding the key

### Build Fails

**Issue:** Deployment fails during build
**Solution:**
1. Check build logs in Vercel
2. Ensure all dependencies are in `package.json`
3. Try redeploying

### Domain Not Working

**Issue:** Custom domain shows error
**Solution:**
1. Verify DNS records are correct
2. Wait for DNS propagation (up to 48 hours)
3. Check domain configuration in Vercel

## Next Steps

1. **Enable Authentication**: Implement Supabase Auth for user login
2. **Add Analytics**: Track usage with Vercel Analytics
3. **SEO Optimization**: Add meta tags and sitemap
4. **Performance**: Optimize images and enable caching
5. **Monitoring**: Set up error tracking with Sentry

## Support

- Vercel Docs: [https://vercel.com/docs](https://vercel.com/docs)
- OpenAI Docs: [https://platform.openai.com/docs](https://platform.openai.com/docs)
- Supabase Docs: [https://supabase.com/docs](https://supabase.com/docs)

---

**Your Finland Guide app is ready to deploy!** 🚀
