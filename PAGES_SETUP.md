# Cloudflare Pages Configuration

This project is configured for Cloudflare Pages (recommended for static sites).

## Build Settings
- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`
- **Node.js Version**: 22

## Why Cloudflare Pages?

For static React SPAs, **Cloudflare Pages is better than Workers** because:
- ✅ Automatic static file serving
- ✅ No loader configuration needed
- ✅ Built-in SPA routing support via `_redirects`
- ✅ Simpler deployment
- ✅ Same global CDN performance

## Deployment Steps

### Option 1: Direct from Cloudflare Dashboard
1. Go to https://dash.cloudflare.com/
2. Select **Pages** → **Create a project** → **Connect to Git**
3. Select `gokulakannan69/Amurta-Hospital`
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add env var: `VITE_GOOGLE_SCRIPT_URL`
7. Deploy!

### Option 2: Using Wrangler CLI
```bash
# Authenticate
wrangler login

# Deploy
wrangler pages deploy dist
```

## Environment Variables

Set in Cloudflare Pages dashboard:
- **Name**: `VITE_GOOGLE_SCRIPT_URL`
- **Value**: Your Google Apps Script URL

## Your Live URL
After deployment: `https://amurta-hospital.pages.dev`

## What NOT to Do
❌ Don't use Wrangler/Workers for static sites
❌ Don't set `main = "dist/index.html"` in wrangler.toml
❌ Don't try to configure HTML loaders

Use **Cloudflare Pages** for this project!
