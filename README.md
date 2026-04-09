

# 🏥 Amruta Ayurveda Hospital - Booking Platform

> **Professional Vedic Healing & Ayurveda Services Booking System**

A modern, responsive web application for booking Ayurveda treatments and healing services at Amruta Ayurveda Hospital. Built with React, TypeScript, and Vite for optimal performance.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🌍 **Multi-language Support** - Internationalization (i18n) ready with translation system
- 💼 **Service Management** - Browse and book various Ayurveda treatments
- 👨‍⚕️ **Professional Interface** - Clean and intuitive UI for easy navigation
- ⚡ **Fast Performance** - Built with Vite for rapid development and optimized production builds
- 🔐 **Modern Architecture** - React with TypeScript for type-safe development
- 🎨 **Customizable Styling** - CSS-based styling with component organization

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18+
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** CSS
- **Runtime:** Node.js 18+
- **Package Manager:** npm or yarn
- **Deployment:** Cloudflare Workers & Pages

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0.0+ or **yarn** 3.6.0+ (npm comes with Node.js)
- **Git** 2.20 or higher ([Download](https://git-scm.com/))
- **Cloudflare Account** (for production deployment - [Sign up](https://dash.cloudflare.com/))

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/gokulakannan69/Amurta-Hospital.git
cd Amurta-Hospital
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create or update `.env.local` file:
```bash
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec
```

Replace `YOUR_GOOGLE_SCRIPT_ID` with your actual Google Apps Script ID.

### 4. Run Locally
```bash
npm run dev
```
Access the app at `http://localhost:3000`

---

## Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production (creates `dist` folder)
- **`npm run preview`** - Preview production build locally
- **`npm start`** - Alias for `npm run dev`

---

## Deployment Process

### ⭐ **RECOMMENDED: Deploy to Cloudflare Pages** (for static sites)

**Why Cloudflare Pages?** Perfect for React SPAs - automatic static serving, built-in SPA routing, no configuration needed!

#### Step 1: Push to GitHub
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

#### Step 2: Connect to Cloudflare Pages
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Pages** → **Create a project** → **Connect to Git**
3. Authorize GitHub and select your repository
4. Select repository: `gokulakannan69/Amurta-Hospital`
5. Choose branch: `main`

#### Step 3: Configure Build Settings
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (default)

#### Step 4: Add Environment Variables
Click **Settings** → **Environment variables** and add:
- **Name**: `VITE_GOOGLE_SCRIPT_URL`
- **Value**: Your Google Apps Script URL from `.env.local`

#### Step 5: Deploy
Click **Save and Deploy** - Done! 🎉

Your site will be live at: `https://amurta-hospital.pages.dev`

---

### Alternative: Deploy to Cloudflare Workers
See [CLOUDFLARE_WORKERS_SETUP.md](CLOUDFLARE_WORKERS_SETUP.md) for Worker deployment (advanced).

**Note**: For static sites like this, Cloudflare Pages is recommended.

---

## Project Structure

```
├── src/
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   ├── components/          # Reusable components
│   ├── constants/           # Configuration & translations
│   ├── styles/              # CSS styles
│   └── types/               # TypeScript types
├── public/                  # Static assets
├── .env.local              # Environment variables (local)
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
└── _redirects              # SPA routing rules
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails on Cloudflare | Check Node.js version is 18+ in Cloudflare settings |
| Environment variable not working | Ensure `VITE_` prefix is used for client-side variables |
| Routes not working | The `_redirects` file handles SPA routing automatically |
| API calls blocked | Google Script URL needs to be in `VITE_GOOGLE_SCRIPT_URL` |

---

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons
- **Google Apps Script** - Backend automation

---

## Support

For issues or questions:
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment guide
- Review environment variables configuration
- Ensure Google Apps Script URL is correctly set

