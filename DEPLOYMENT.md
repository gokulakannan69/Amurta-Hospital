# Deployment Guide - Cloudflare Pages

## Quick Setup

### Prerequisites
- Cloudflare account (https://dash.cloudflare.com)
- GitHub account with repository access

### Steps to Deploy

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com/9a8ae0d2db60398d224a5a5b417e3b38/workers-and-pages

2. **Create a New Pages Project**
   - Click "Create application" → "Pages" → "Connect to Git"
   - Select "GitHub" and authorize

3. **Select Repository**
   - Repository: `gokulakannan69/Amurta-Hospital`
   - Branch: `main`

4. **Build Configuration** (Auto-detected, verify these are correct)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (default)

5. **Environment Variables**
   - Add the following in "Environment variables":
     - **Name**: `VITE_GOOGLE_SCRIPT_URL`
     - **Value**: [Your Google Apps Script URL from `.env.local`]

6. **Deploy**
   - Click "Save and Deploy"
   - Wait for build to complete (2-3 minutes)

### After Deployment

- Your site will be available at: `https://amurta-hospital.pages.dev`
- Every push to `main` branch will trigger automatic deployment
- Check deployment status in Cloudflare dashboard

### Local Development

```bash
npm install
npm run dev    # Start dev server on http://localhost:3000
npm run build  # Build for production
npm run preview # Preview production build
```

### Troubleshooting

- **Build fails**: Check that Node.js version is 18+ in Cloudflare settings
- **Environment variables not working**: Ensure `VITE_` prefix is used for client-side variables
- **Routes not working**: The `_redirects` file handles SPA routing automatically

### Environment Variables

Create `.env.local` file with:
```
VITE_GOOGLE_SCRIPT_URL=your_google_script_url_here
```

**Important**: Never commit `.env.local` to git (it's in `.gitignore`)
