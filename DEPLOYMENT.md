# GitHub Pages Deployment Instructions

## Automatic Deployment Setup ✅

Your royal blog is now configured for automatic deployment! Here's what has been set up:

### 1. GitHub Actions Workflow
- Located in `.github/workflows/deploy.yml`
- Triggers on every push to the `main` branch
- Automatically builds and deploys to GitHub Pages

### 2. Vite Configuration
- Base path configured for GitHub Pages (`/3Blog/`)
- Router updated to handle the base path correctly

## Next Steps for Your Majesty:

### 1. Enable GitHub Pages
1. Go to your repository settings: `https://github.com/3Dayg/3Blog/settings`
2. Scroll down to "Pages" section
3. Under "Source", select "GitHub Actions"
4. Save the settings

### 2. Push Your Changes
```bash
git add .
git commit -m "feat: add GitHub Pages deployment configuration"
git push origin main
```

### 3. Your Blog Will Be Available At:
- **Default GitHub Pages URL**: `https://3dayg.github.io/3Blog/`

## Custom Domain Setup (Optional)

### For a Custom Domain Like `3dayg.com`:

#### Option 1: Purchase a Domain
1. Buy a domain from a registrar (GoDaddy, Namecheap, etc.)
2. Configure DNS settings in your domain registrar:
   ```
   Type: CNAME
   Name: www (or @)
   Value: 3dayg.github.io
   ```

#### Option 2: GitHub Subdomain
- You can use: `https://3dayg.github.io` (your main GitHub Pages site)
- This would require setting up a separate repository named `3dayg.github.io`

### After Domain Purchase:
1. Create a `CNAME` file in the `public` folder with your domain name
2. Update repository settings to use your custom domain
3. Enable HTTPS in repository settings

## Troubleshooting
- If routing doesn't work, check that the base path is correctly configured
- Ensure all links use the Link component from TanStack Router
- Custom domain may take 24-48 hours to propagate

Your magnificent blog deployment is ready for action, Your Majesty! 🚀👑
