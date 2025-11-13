# Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Netlify (Recommended - Easiest)

#### Deploy in 3 Steps:

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Connect to Netlify**
- Go to https://netlify.com
- Click "Add new site" → "Import an existing project"
- Choose "Deploy with GitHub"
- Select your repository
- Click "Deploy site"

3. **Done!** 🎉
- Your site is live with FREE SSL
- URL: `https://random-name-123.netlify.app`
- Custom domain: Settings → Domain management → Add custom domain

**MIT Landing**: `https://your-site.netlify.app/mit-landing/index.html`
**DU Landing**: `https://your-site.netlify.app/delhi-university-landing/index.html`

---

### Option 2: Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd university-landing-pages
vercel
```

3. Follow prompts, done!

---

### Option 3: GitHub Pages (Free, Static Only)

1. Go to repository Settings → Pages
2. Source: Deploy from branch
3. Branch: main
4. Folder: / (root)
5. Save

**Live at**: `https://YOUR-USERNAME.github.io/university-landing-pages/`

---

## 🔧 Deploy API Backend

### Option A: Render.com (Recommended)

1. **Create Web Service**
- Go to https://render.com
- New → Web Service
- Connect GitHub repository

2. **Configure**
- Name: `university-api`
- Environment: `Node`
- Build Command: `cd api-backend && npm install`
- Start Command: `cd api-backend && npm start`
- Instance Type: Free

3. **Deploy**
- Click "Create Web Service"
- Wait 2-3 minutes
- Your API is live! 🎉

**API URL**: `https://university-api.onrender.com`

---

### Option B: Railway.app

1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub"
3. Select repository
4. Add service → Select `/api-backend`
5. Deploy automatically starts
6. Get your URL from settings

---

### Option C: Cyclic.sh (Super Easy)

1. Go to https://cyclic.sh
2. "Connect your GitHub"
3. Select repository
4. Auto-detects Node.js app
5. Deploy!

---

## 🔗 After Deployment

### Update API URLs

If you deployed API backend separately, update the URLs in landing pages:

**Both script.js files** - Add this at the top:
```javascript
const API_BASE_URL = 'https://your-api.onrender.com';
```

---

## ✅ Pre-Deployment Checklist

- [ ] Updated Pipedream webhook URL in both script.js files
- [ ] Tested forms locally
- [ ] Tested all navigation links
- [ ] Tested on mobile (Chrome DevTools)
- [ ] Verified all API endpoints work
- [ ] Committed all changes to Git
- [ ] Pushed to GitHub

---

## 🧪 Test Your Deployed Site

### 1. Test Landing Pages
- [ ] MIT landing page loads
- [ ] Delhi University landing page loads
- [ ] All images/styles load correctly
- [ ] Navigation works
- [ ] University switcher works

### 2. Test Forms
- [ ] "Apply Now" button opens modal
- [ ] Form validation works
- [ ] Form submission works
- [ ] Success message appears
- [ ] Data appears in Pipedream

### 3. Test APIs (if deployed)
```bash
# Replace with your actual URL
curl https://your-api.onrender.com/api/health
curl https://your-api.onrender.com/api/universities
curl https://your-api.onrender.com/api/universities/mit
```

### 4. Test Mobile
- Open on phone browser
- Test hamburger menu
- Test form submission
- Check responsiveness

---

## 🌐 Custom Domain Setup

### Netlify
1. Settings → Domain management
2. Add custom domain
3. Follow DNS instructions
4. SSL automatically configured

### Vercel
1. Project Settings → Domains
2. Add domain
3. Configure DNS
4. Auto SSL

---

## 📊 Post-Deployment Monitoring

### Netlify
- Dashboard → Analytics (see visits)
- Functions → See form submissions
- Deploys → See deployment history

### Render
- Dashboard → Metrics (CPU, memory)
- Logs → Real-time logs
- Events → Deployment events

---

## 🔒 SSL Certificate

All recommended hosting platforms provide:
- ✅ **Free SSL certificates**
- ✅ **Auto-renewal**
- ✅ **HTTPS enforced**
- ✅ **HTTP → HTTPS redirect**

**No configuration needed!** 🎉

---

## 💡 Tips

1. **Use environment variables** for sensitive data
2. **Monitor Pipedream** for incoming leads
3. **Check logs** if something breaks
4. **Test thoroughly** before sharing URL
5. **Set up analytics** (Google Analytics, Plausible)

---

## 🆘 Troubleshooting

### Issue: Site not loading after deployment
- Check build logs in hosting platform
- Ensure all files are committed to Git
- Verify folder structure is correct

### Issue: Form not working after deployment
- Check Pipedream webhook URL is correct
- Open browser console for errors
- Verify CORS is enabled (Pipedream does this by default)

### Issue: API not accessible
- Check API is deployed and running
- Verify URL is correct
- Check CORS settings in server.js

### Issue: Styles not loading
- Clear browser cache
- Check Tailwind CDN link is correct
- Verify all CSS paths are relative

---

## 📱 Test URLs After Deployment

### Landing Pages
- MIT: `https://your-domain.com/mit-landing/`
- DU: `https://your-domain.com/delhi-university-landing/`

### API Endpoints
- Health: `https://your-api.com/api/health`
- Universities: `https://your-api.com/api/universities`
- Programs: `https://your-api.com/api/programs`

---

## ✨ You're Done!

Your project is now:
- ✅ Live on the internet
- ✅ Secured with SSL
- ✅ Mobile responsive
- ✅ Collecting leads via Pipedream
- ✅ Serving APIs

**Share your URLs!** 🎉

---

**Estimated Deployment Time**: 10-15 minutes

**Cost**: $0 (All free tiers)

**SSL**: Included free

**Uptime**: 99.9%+
