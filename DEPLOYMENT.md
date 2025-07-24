# 🚀 Deployment Guide - Bella Vista Restaurant Landing Page

This guide covers all deployment options for the Bella Vista Restaurant Landing Page.

## 📋 Table of Contents

- [GitHub Pages Deployment](#github-pages-deployment)
- [Docker Deployment](#docker-deployment)
- [Manual Deployment](#manual-deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Environment Configuration](#environment-configuration)
- [Troubleshooting](#troubleshooting)

## 🌐 GitHub Pages Deployment

### Automatic Deployment

The project is configured for automatic deployment to GitHub Pages when changes are pushed to the `main` branch.

**Live URL**: [https://xuantruong1810.github.io/restaurant-landing/](https://xuantruong1810.github.io/restaurant-landing/)

### Manual Deployment

#### Option 1: Using Deployment Script (Recommended)

**Linux/macOS:**
```bash
# Make script executable (first time only)
chmod +x scripts/deploy-pages.sh

# Run deployment script
./scripts/deploy-pages.sh
```

**Windows:**
```powershell
# Run PowerShell script
powershell -ExecutionPolicy Bypass -File scripts/deploy-pages.ps1

# Or use npm script
bun run deploy:pages:win
```

#### Option 2: Manual Steps

1. **Build the application**
   ```bash
   bun run build:pages
   ```

2. **Commit and push changes**
   ```bash
   git add .
   git commit -m "Deploy: Update restaurant landing page"
   git push origin main
   ```

3. **Monitor deployment**
   - Visit: [GitHub Actions](https://github.com/XuanTruong1810/restaurant-landing/actions)
   - Wait for the "Deploy to GitHub Pages" workflow to complete

### GitHub Pages Configuration

The project includes:
- **Base path**: `/restaurant-landing/` for GitHub Pages
- **Custom workflow**: `.github/workflows/deploy-pages.yml`
- **Build optimization**: Vite configuration for production
- **Jekyll bypass**: `.nojekyll` file included

## 🐳 Docker Deployment

### Production Deployment

```bash
# Build Docker image
docker build -t restaurant-landing .

# Run container
docker run -p 80:80 restaurant-landing

# Access at http://localhost
```

### Docker Compose (Staging)

```bash
# Start staging environment
docker-compose -f docker-compose.staging.yml up -d

# Access at http://localhost:3001
```

### Docker Compose (Production)

```bash
# Start production environment
docker-compose -f docker-compose.prod.yml up -d

# Access at http://localhost:3000
```

## 📁 Manual Deployment

### Static File Hosting

1. **Build the application**
   ```bash
   bun run build
   ```

2. **Upload `dist` folder contents** to your web server
   - Apache: Upload to `public_html` or `www` directory
   - Nginx: Upload to configured document root
   - CDN: Upload to your CDN provider

### Netlify Deployment

1. **Connect repository** to Netlify
2. **Configure build settings**:
   - Build command: `bun run build`
   - Publish directory: `dist`
   - Node version: `20`

### Vercel Deployment

1. **Connect repository** to Vercel
2. **Configure build settings**:
   - Framework: Vite
   - Build command: `bun run build`
   - Output directory: `dist`

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

#### 1. Main CI/CD Pipeline (`.github/workflows/ci-cd.yml`)
- **Triggers**: Push to `main` or `develop`, Pull requests
- **Jobs**: Test, Build, Security, Docker, Deploy
- **Features**: 
  - Automated testing with Vitest
  - ESLint code quality checks
  - Security auditing
  - Docker image building
  - Multi-environment deployment

#### 2. GitHub Pages Deployment (`.github/workflows/deploy-pages.yml`)
- **Triggers**: Push to `main`, Manual dispatch
- **Jobs**: Build and deploy to GitHub Pages
- **Features**:
  - Optimized production build
  - Automatic deployment
  - Pages-specific configuration

### Deployment Environments

| Environment | Branch | URL | Purpose |
|-------------|--------|-----|---------|
| **Development** | `develop` | Local | Development and testing |
| **Staging** | `develop` | Docker staging | Pre-production testing |
| **Production** | `main` | GitHub Pages | Live website |

## ⚙️ Environment Configuration

### Build Configuration

The project uses different configurations for different environments:

```typescript
// vite.config.ts
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/restaurant-landing/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});
```

### Environment Variables

Create `.env` files for different environments:

```env
# .env.local (development)
VITE_API_URL=http://localhost:3000
VITE_CONTACT_EMAIL=info@bellavista.com

# .env.production (production)
VITE_API_URL=https://api.bellavista.com
VITE_CONTACT_EMAIL=info@bellavista.com
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Build Failures

**Problem**: TypeScript compilation errors
```bash
# Solution: Check and fix TypeScript errors
bun run lint
bun run test:run
```

**Problem**: Missing dependencies
```bash
# Solution: Reinstall dependencies
rm -rf node_modules bun.lockb
bun install
```

#### 2. GitHub Pages Issues

**Problem**: 404 errors on GitHub Pages
- **Solution**: Ensure base path is correctly set in `vite.config.ts`
- **Check**: `.nojekyll` file exists in build output

**Problem**: Deployment workflow fails
- **Solution**: Check GitHub Actions logs
- **Verify**: Repository has Pages enabled in settings

#### 3. Docker Issues

**Problem**: Container fails to start
```bash
# Solution: Check Docker logs
docker logs <container-id>

# Rebuild image
docker build --no-cache -t restaurant-landing .
```

### Performance Optimization

#### Build Optimization
- **Code splitting**: Vendor chunks separated
- **Asset optimization**: Images and CSS minified
- **Tree shaking**: Unused code removed
- **Compression**: Gzip compression enabled

#### Runtime Optimization
- **Lazy loading**: Components loaded on demand
- **Caching**: Static assets cached
- **CDN**: Assets served from CDN (if configured)

### Monitoring and Analytics

#### Deployment Monitoring
- **GitHub Actions**: Monitor workflow status
- **Build logs**: Check for warnings and errors
- **Performance**: Monitor build times and bundle sizes

#### Production Monitoring
- **Uptime**: Monitor website availability
- **Performance**: Track loading times
- **Errors**: Monitor JavaScript errors

## 📞 Support

For deployment issues:
1. **Check logs**: GitHub Actions, Docker logs, or server logs
2. **Review documentation**: This guide and README.md
3. **Test locally**: Ensure build works locally first
4. **Contact**: Create an issue in the GitHub repository

---

**Last Updated**: December 2024
**Version**: 1.0.0
