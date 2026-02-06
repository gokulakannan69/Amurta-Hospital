# Cloudflare Workers Deployment Guide

## Step-by-Step Setup & Deployment

### Prerequisites
- Node.js 18+
- npm installed
- Cloudflare account (https://dash.cloudflare.com)
- Git repository pushed to GitHub

---

## Step 1: Install Wrangler CLI

```bash
npm install -g wrangler
```

Verify installation:
```bash
wrangler --version
```

---

## Step 2: Authenticate with Cloudflare

```bash
wrangler login
```

This will:
- Open your browser to Cloudflare login
- Ask for permission to manage your account
- Save authentication credentials locally

---

## Step 3: Project Configuration

Your `wrangler.toml` is already configured. Verify it contains:

```toml
name = "amurta-hospital"
type = "javascript"
account_id = "" # Will be auto-filled after first deploy
workers_dev = true
route = ""
zone_id = ""

[build]
command = "npm install && npm run build"
cwd = "./"

[env.production]
name = "amurta-hospital-prod"
```

---

## Step 4: Set Environment Variables

### Local Development
Create `.env.local`:
```bash
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### Cloudflare Secrets
Set environment variable in Cloudflare:

```bash
wrangler secret put VITE_GOOGLE_SCRIPT_URL
```

When prompted, paste your Google Script URL.

---

## Step 5: Build the Application

```bash
npm run build
```

This creates the `dist/` folder with production files.

---

## Step 6: Deploy to Cloudflare Workers

### Deploy to Default Environment
```bash
npx wrangler deploy
```

### Deploy to Production Environment
```bash
npx wrangler deploy --env production
```

### Expected Output
```
✓ Uploaded amurta-hospital (1.23 MB)
✓ Published amurta-hospital
  https://amurta-hospital.YOUR_ACCOUNT.workers.dev
```

---

## Step 7: Verify Deployment

1. **Check deployment status:**
   ```bash
   wrangler deployments list
   ```

2. **View live URL:**
   - Your app will be at: `https://amurta-hospital.YOUR_ACCOUNT.workers.dev`
   - Check Cloudflare Dashboard → Workers → amurta-hospital

3. **Test the application:**
   - Open your deployment URL in browser
   - Test booking functionality
   - Check that Google Script URL is working

---

## Step 8: Custom Domain (Optional)

To use a custom domain:

1. Go to Cloudflare Dashboard
2. Select your domain
3. Navigate to **Workers** → **Routes**
4. Click **Add route**
5. Enter pattern: `example.com/*`
6. Select Worker: `amurta-hospital`
7. Save

---

## Environment Variables Configuration

### Option A: Via CLI
```bash
wrangler secret put VITE_GOOGLE_SCRIPT_URL
wrangler secret put VITE_GOOGLE_SCRIPT_URL --env production
```

### Option B: Via Dashboard
1. Go to Cloudflare Dashboard
2. Workers & Pages → amurta-hospital
3. Settings → Environment Variables
4. Add:
   - **Name**: `VITE_GOOGLE_SCRIPT_URL`
   - **Value**: Your Google Script URL

---

## Deployment Commands Reference

| Command | Purpose |
|---------|---------|
| `wrangler deploy` | Deploy to default environment |
| `wrangler deploy --env production` | Deploy to production |
| `npx wrangler versions upload` | Upload to versions (non-production) |
| `wrangler secret put KEY` | Add/update secret |
| `wrangler secret list` | List all secrets |
| `wrangler deployments list` | View deployment history |
| `wrangler tail` | View live logs |

---

## Continuous Deployment (GitHub Actions)

Create `.github/workflows/deploy-workers.yml`:

```yaml
name: Deploy to Cloudflare Workers

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
        env:
          VITE_GOOGLE_SCRIPT_URL: ${{ secrets.VITE_GOOGLE_SCRIPT_URL }}
      
      - name: Deploy to Cloudflare
        run: npx wrangler deploy --env production
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Not authenticated" | Run `wrangler login` |
| "Account ID not found" | First deploy completes account setup automatically |
| Build fails | Check `npm run build` works locally first |
| Environment variables not available | Use `wrangler secret put` not `wrangler env` |
| 404 errors on routes | Ensure `_redirects` or routing is configured |

---

## Monitoring & Logs

### View Live Logs
```bash
wrangler tail
```

### View Deployment History
```bash
wrangler deployments list
```

### Rollback to Previous Version
```bash
wrangler rollback
```

---

## Final URLs

After deployment, your app will be available at:

- **Workers URL**: `https://amurta-hospital.YOUR_ACCOUNT.workers.dev`
- **Custom Domain**: `https://yourdomain.com` (if configured)
- **Cloudflare Dashboard**: https://dash.cloudflare.com/workers-and-pages

---

## Quick Start Summary

```bash
# 1. Install Wrangler
npm install -g wrangler

# 2. Login to Cloudflare
wrangler login

# 3. Set secrets
wrangler secret put VITE_GOOGLE_SCRIPT_URL

# 4. Build
npm run build

# 5. Deploy
npx wrangler deploy

# 6. View logs
wrangler tail
```

Done! Your app is now live on Cloudflare Workers! 🎉
