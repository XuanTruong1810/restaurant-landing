# Bella Vista Restaurant Landing Page - GitHub Pages Deployment Script (PowerShell)
# This script builds and deploys the application to GitHub Pages

param(
    [switch]$AutoPush = $false
)

Write-Host "🍝 Bella Vista Restaurant - GitHub Pages Deployment" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

# Check if git is available
try {
    git --version | Out-Null
} catch {
    Write-Host "❌ Error: Git is not installed or not in PATH." -ForegroundColor Red
    exit 1
}

# Check if bun is available
try {
    bun --version | Out-Null
} catch {
    Write-Host "❌ Error: Bun is not installed. Please install Bun first." -ForegroundColor Red
    Write-Host "Visit: https://bun.sh/" -ForegroundColor Yellow
    exit 1
}

# Check if we're on the main branch
$currentBranch = git branch --show-current
if ($currentBranch -ne "main") {
    Write-Host "⚠️  Warning: You're not on the main branch (current: $currentBranch)" -ForegroundColor Yellow
    if (-not $AutoPush) {
        $continue = Read-Host "Do you want to continue? (y/N)"
        if ($continue -ne "y" -and $continue -ne "Y") {
            Write-Host "Deployment cancelled." -ForegroundColor Yellow
            exit 1
        }
    }
}

# Check for uncommitted changes
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "⚠️  Warning: You have uncommitted changes." -ForegroundColor Yellow
    if (-not $AutoPush) {
        $continue = Read-Host "Do you want to continue? (y/N)"
        if ($continue -ne "y" -and $continue -ne "Y") {
            Write-Host "Deployment cancelled. Please commit your changes first." -ForegroundColor Yellow
            exit 1
        }
    }
}

Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
bun install --frozen-lockfile

Write-Host "🧪 Running tests..." -ForegroundColor Cyan
bun run test:run

Write-Host "🔍 Running linting..." -ForegroundColor Cyan
bun run lint

Write-Host "🏗️ Building application for GitHub Pages..." -ForegroundColor Cyan
$env:NODE_ENV = "production"
bun run build

Write-Host "📊 Build statistics:" -ForegroundColor Cyan
if (Test-Path "dist") {
    $buildSize = (Get-ChildItem -Path "dist" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    $fileCount = (Get-ChildItem -Path "dist" -Recurse -File).Count
    Write-Host "Build size: $([math]::Round($buildSize, 2)) MB" -ForegroundColor White
    Write-Host "Files created: $fileCount" -ForegroundColor White
    Write-Host "Main files:" -ForegroundColor White
    Get-ChildItem -Path "dist" | Format-Table Name, Length, LastWriteTime
} else {
    Write-Host "❌ Error: Build directory not found." -ForegroundColor Red
    exit 1
}

# Create .nojekyll file to bypass Jekyll processing
New-Item -Path "dist\.nojekyll" -ItemType File -Force | Out-Null

Write-Host "✅ Build completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 To deploy to GitHub Pages:" -ForegroundColor Yellow
Write-Host "1. Commit and push your changes to the main branch:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Update: Ready for deployment'" -ForegroundColor Gray
Write-Host "   git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "2. GitHub Actions will automatically deploy to:" -ForegroundColor White
Write-Host "   https://xuantruong1810.github.io/restaurant-landing/" -ForegroundColor Blue
Write-Host ""
Write-Host "📱 Local preview: Run 'bun run preview' to test the build" -ForegroundColor White
Write-Host ""
Write-Host "✨ Deployment preparation complete!" -ForegroundColor Green

# Optional: Auto-commit and push if requested
if (-not $AutoPush) {
    $pushNow = Read-Host "Do you want to commit and push changes now? (y/N)"
    if ($pushNow -eq "y" -or $pushNow -eq "Y") {
        $AutoPush = $true
    }
}

if ($AutoPush) {
    Write-Host "📤 Committing and pushing changes..." -ForegroundColor Cyan
    git add .
    $commitMessage = "Deploy: Update restaurant landing page $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    git commit -m $commitMessage
    git push origin main
    Write-Host "✅ Changes pushed to GitHub!" -ForegroundColor Green
    Write-Host "🔄 GitHub Actions will deploy automatically in a few minutes." -ForegroundColor Yellow
    Write-Host "📱 Check deployment status at: https://github.com/XuanTruong1810/restaurant-landing/actions" -ForegroundColor Blue
}
