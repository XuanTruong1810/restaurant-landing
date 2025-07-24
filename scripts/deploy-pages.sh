#!/bin/bash

# Bella Vista Restaurant Landing Page - GitHub Pages Deployment Script
# This script builds and deploys the application to GitHub Pages

set -e

echo "🍝 Bella Vista Restaurant - GitHub Pages Deployment"
echo "=================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if git is available
if ! command -v git &> /dev/null; then
    echo "❌ Error: Git is not installed or not in PATH."
    exit 1
fi

# Check if bun is available
if ! command -v bun &> /dev/null; then
    echo "❌ Error: Bun is not installed. Please install Bun first."
    echo "Visit: https://bun.sh/"
    exit 1
fi

# Check if we're on the main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Warning: You're not on the main branch (current: $CURRENT_BRANCH)"
    read -p "Do you want to continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Deployment cancelled."
        exit 1
    fi
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Warning: You have uncommitted changes."
    read -p "Do you want to continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Deployment cancelled. Please commit your changes first."
        exit 1
    fi
fi

echo "📦 Installing dependencies..."
bun install --frozen-lockfile

echo "🧪 Running tests..."
bun run test:run

echo "🔍 Running linting..."
bun run lint

echo "🏗️ Building application for GitHub Pages..."
NODE_ENV=production bun run build

echo "📊 Build statistics:"
if [ -d "dist" ]; then
    echo "Build size: $(du -sh dist | cut -f1)"
    echo "Files created: $(find dist -type f | wc -l)"
    echo "Main files:"
    ls -la dist/
else
    echo "❌ Error: Build directory not found."
    exit 1
fi

# Create .nojekyll file to bypass Jekyll processing
touch dist/.nojekyll

echo "✅ Build completed successfully!"
echo ""
echo "🚀 To deploy to GitHub Pages:"
echo "1. Commit and push your changes to the main branch:"
echo "   git add ."
echo "   git commit -m 'Update: Ready for deployment'"
echo "   git push origin main"
echo ""
echo "2. GitHub Actions will automatically deploy to:"
echo "   https://xuantruong1810.github.io/restaurant-landing/"
echo ""
echo "📱 Local preview: Run 'bun run preview' to test the build"
echo ""
echo "✨ Deployment preparation complete!"

# Optional: Auto-commit and push if requested
read -p "Do you want to commit and push changes now? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📤 Committing and pushing changes..."
    git add .
    git commit -m "Deploy: Update restaurant landing page $(date '+%Y-%m-%d %H:%M:%S')"
    git push origin main
    echo "✅ Changes pushed to GitHub!"
    echo "🔄 GitHub Actions will deploy automatically in a few minutes."
    echo "📱 Check deployment status at: https://github.com/XuanTruong1810/restaurant-landing/actions"
fi
