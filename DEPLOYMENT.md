# Deployment Guide

This guide will help you deploy the Quantum Traffic Flow Optimization app to your own domain.

## Build Output

The production build is located in the `dist/` folder. This folder contains all the static files needed to deploy your application.

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   
   Follow the prompts to:
   - Link your project
   - Set up your domain
   - Add environment variables

3. **Set Environment Variable**:
   - Go to your Vercel dashboard
   - Navigate to your project → Settings → Environment Variables
   - Add `GEMINI_API_KEY` with your API key value
   - Redeploy your application

4. **Custom Domain**:
   - In Vercel dashboard → Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Option 2: Netlify

1. **Install Netlify CLI** (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   netlify deploy --prod
   ```
   
   Or connect your GitHub repository to Netlify for automatic deployments.

3. **Set Environment Variable**:
   - Go to Site settings → Environment variables
   - Add `GEMINI_API_KEY` with your API key value
   - Trigger a new deploy

4. **Custom Domain**:
   - Go to Domain settings
   - Add your custom domain
   - Configure DNS as instructed

### Option 3: Traditional Web Hosting (cPanel, FTP, etc.)

1. **Upload Files**:
   - Upload all files from the `dist/` folder to your web server's public directory (usually `public_html/` or `www/`)

2. **Configure Environment Variables**:
   - Since traditional hosting doesn't support environment variables directly, you'll need to:
     - Option A: Create a server-side proxy for API calls (recommended for security)
     - Option B: Update `vite.config.ts` to use a different approach for production

3. **HTTPS Setup**:
   - Ensure your domain has SSL certificate (Let's Encrypt is free)
   - Configure your web server to serve the site over HTTPS

### Option 4: GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

   **Note**: GitHub Pages doesn't support environment variables. You'll need to use a different approach for the API key.

## Environment Variables

**IMPORTANT**: The `GEMINI_API_KEY` is currently bundled into the client-side code. For production, consider:

1. **Using a server-side proxy** (most secure):
   - Create a backend API endpoint that proxies requests to Gemini
   - Keep the API key on the server
   - Client calls your backend, which calls Gemini

2. **Using hosting platform environment variables**:
   - Set `GEMINI_API_KEY` in your hosting platform's environment variables
   - The build process will inject it during build time

## Build Commands

- **Development**: `npm run dev`
- **Production Build**: `npm run build`
- **Preview Build**: `npm run preview`

## Troubleshooting

### SPA Routing Issues
If you see 404 errors when navigating directly to routes, ensure your hosting provider is configured to redirect all routes to `index.html` (SPA mode).

### Environment Variables Not Working
- Make sure the variable is set in your hosting platform's dashboard
- Redeploy after setting environment variables
- Check that the variable name matches exactly: `GEMINI_API_KEY`

### Build Errors
- Ensure all dependencies are installed: `npm install`
- Check Node.js version (recommended: Node 18+)

