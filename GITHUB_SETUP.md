# 🐙 GitHub Repository Setup Guide

This guide explains how to set up the GitHub repository and enable GitHub Pages for the Bella Vista Restaurant Landing Page.

## 📋 Repository Setup Checklist

### ✅ Repository Configuration

1. **Create Repository**
   - Repository name: `restaurant-landing`
   - Visibility: Public (required for GitHub Pages)
   - Initialize with README: ✅
   - Add .gitignore: Node ✅
   - Add license: MIT ✅

2. **Repository Settings**
   - Go to Settings → Pages
   - Source: GitHub Actions
   - Custom domain: (optional)

### ✅ GitHub Actions Setup

The repository includes two main workflows:

#### 1. Main CI/CD Pipeline
**File**: `.github/workflows/ci-cd.yml`
- **Purpose**: Comprehensive testing, building, and deployment
- **Triggers**: Push to `main`/`develop`, Pull requests
- **Features**:
  - ✅ Automated testing with Vitest
  - ✅ ESLint code quality checks
  - ✅ Security auditing with CodeQL
  - ✅ Docker image building
  - ✅ Multi-environment deployment

#### 2. GitHub Pages Deployment
**File**: `.github/workflows/deploy-pages.yml`
- **Purpose**: Deploy to GitHub Pages
- **Triggers**: Push to `main`, Manual dispatch
- **Features**:
  - ✅ Production build optimization
  - ✅ Automatic deployment to Pages
  - ✅ Custom base path configuration

### ✅ Required Secrets

No secrets are required for basic GitHub Pages deployment. The workflows use:
- `GITHUB_TOKEN`: Automatically provided by GitHub
- `secrets.GITHUB_TOKEN`: For container registry access

### ✅ Branch Protection Rules

Recommended branch protection for `main`:
1. Go to Settings → Branches
2. Add rule for `main` branch:
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - ✅ Include administrators

## 🌐 GitHub Pages Configuration

### Enable GitHub Pages

1. **Go to Repository Settings**
   ```
   https://github.com/XuanTruong1810/restaurant-landing/settings/pages
   ```

2. **Configure Source**
   - Source: "GitHub Actions"
   - This enables the custom workflow deployment

3. **Custom Domain (Optional)**
   - Add custom domain if desired
   - Configure DNS CNAME record

### Pages URL Structure

- **Default URL**: `https://xuantruong1810.github.io/restaurant-landing/`
- **Custom Domain**: `https://your-domain.com` (if configured)

### Build Configuration

The Vite configuration automatically handles GitHub Pages:

```typescript
// vite.config.ts
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/restaurant-landing/' : '/',
  // ... other config
});
```

## 🔄 Deployment Workflow

### Automatic Deployment

1. **Push to main branch**
   ```bash
   git push origin main
   ```

2. **GitHub Actions triggers**
   - CI/CD pipeline runs tests and builds
   - Pages deployment workflow builds and deploys
   - Site updates automatically

3. **Monitor deployment**
   - Check Actions tab for workflow status
   - Visit live site once deployment completes

### Manual Deployment

1. **Using GitHub UI**
   - Go to Actions tab
   - Select "Deploy to GitHub Pages" workflow
   - Click "Run workflow"

2. **Using deployment script**
   ```bash
   # Linux/macOS
   ./scripts/deploy-pages.sh
   
   # Windows
   bun run deploy:pages:win
   ```

## 📊 Repository Structure

```
restaurant-landing/
├── .github/
│   └── workflows/
│       ├── ci-cd.yml           # Main CI/CD pipeline
│       └── deploy-pages.yml    # GitHub Pages deployment
├── scripts/
│   ├── deploy.sh              # Docker deployment script
│   ├── deploy-pages.sh        # GitHub Pages script (Linux/macOS)
│   └── deploy-pages.ps1       # GitHub Pages script (Windows)
├── src/                       # Source code
├── public/                    # Static assets
├── dist/                      # Build output (ignored)
├── README.md                  # Project documentation
├── DEPLOYMENT.md              # Deployment guide
├── LICENSE                    # MIT license
├── package.json               # Dependencies and scripts
├── vite.config.ts            # Vite configuration
└── tsconfig.json             # TypeScript configuration
```

## 🔧 Environment Variables

### Repository Secrets

For advanced deployments, you may need to add secrets:

1. **Go to Settings → Secrets and variables → Actions**
2. **Add repository secrets**:
   - `REGISTRY_URL`: Container registry URL
   - `CUSTOM_DOMAIN`: Custom domain name
   - `API_KEY`: External API keys (if needed)

### Environment Files

Local development environment files:
- `.env.local`: Local development settings
- `.env.production`: Production settings (not committed)

## 🚀 Quick Start Commands

### Initial Setup
```bash
# Clone repository
git clone https://github.com/XuanTruong1810/restaurant-landing.git
cd restaurant-landing

# Install dependencies
bun install

# Start development server
bun dev
```

### Deployment Commands
```bash
# Build for production
bun run build

# Deploy to GitHub Pages (automated)
git push origin main

# Manual deployment script
bun run deploy:pages:win  # Windows
./scripts/deploy-pages.sh # Linux/macOS
```

### Testing Commands
```bash
# Run all tests
bun test:run

# Run linting
bun run lint

# Preview production build
bun run preview
```

## 📈 Monitoring and Analytics

### GitHub Insights

Monitor repository activity:
- **Traffic**: Visitor statistics
- **Actions**: Workflow run history
- **Issues**: Bug reports and feature requests
- **Pull Requests**: Code contributions

### Deployment Monitoring

Track deployment status:
- **Actions Tab**: Workflow execution logs
- **Pages Settings**: Deployment history
- **Live Site**: Verify functionality

### Performance Monitoring

Optional integrations:
- **Google Analytics**: User behavior tracking
- **Lighthouse CI**: Performance monitoring
- **Sentry**: Error tracking

## 🛠️ Troubleshooting

### Common Issues

#### Pages Not Updating
1. Check Actions tab for failed workflows
2. Verify `main` branch has latest changes
3. Clear browser cache
4. Check Pages settings configuration

#### Build Failures
1. Review workflow logs in Actions tab
2. Test build locally: `bun run build`
3. Check for TypeScript errors
4. Verify all dependencies are installed

#### Permission Issues
1. Ensure repository is public
2. Check Pages is enabled in settings
3. Verify workflow permissions

### Getting Help

1. **Check documentation**: README.md and DEPLOYMENT.md
2. **Review logs**: GitHub Actions workflow logs
3. **Test locally**: Ensure everything works locally
4. **Create issue**: Use GitHub Issues for support

## 📞 Support

For repository setup issues:
- **GitHub Docs**: [GitHub Pages documentation](https://docs.github.com/en/pages)
- **Actions Docs**: [GitHub Actions documentation](https://docs.github.com/en/actions)
- **Repository Issues**: Create an issue for project-specific help

---

**Repository**: [https://github.com/XuanTruong1810/restaurant-landing](https://github.com/XuanTruong1810/restaurant-landing)
**Live Site**: [https://xuantruong1810.github.io/restaurant-landing/](https://xuantruong1810.github.io/restaurant-landing/)
**Last Updated**: December 2024
