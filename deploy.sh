#!/bin/bash

# 🚀 CANDLEWYCK DINER - AUTOMATED DEPLOYMENT TO RENDER
# Run this script to deploy your website

echo "🕯️ CANDLEWYCK DINER - DEPLOYMENT SCRIPT"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Initialize git
echo "📦 Initializing Git repository..."
git init

# Check if .gitignore exists
if [ ! -f .gitignore ]; then
    echo "node_modules/" > .gitignore
    echo ".env" >> .gitignore
    echo ".DS_Store" >> .gitignore
    echo "dist/" >> .gitignore
fi

# Add all files
echo "📝 Adding files to Git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "🚀 Candlewyck Diner Website - Initial Deployment"

# Rename branch to main
echo "🔀 Setting up main branch..."
git branch -M main

# Ask for GitHub username
echo ""
echo "📱 GitHub Setup"
echo "==============="
read -p "Enter your GitHub username: " github_username

if [ -z "$github_username" ]; then
    echo "❌ GitHub username is required!"
    exit 1
fi

# Set remote
echo "🔗 Connecting to GitHub..."
git remote add origin https://github.com/$github_username/candlewyck-diner.git

# Push to GitHub
echo "⬆️ Pushing code to GitHub..."
git push -u origin main

if [ $? -ne 0 ]; then
    echo "❌ Failed to push to GitHub. Make sure your repository exists and credentials are correct."
    exit 1
fi

echo ""
echo "✅ CODE PUSHED TO GITHUB!"
echo ""
echo "🚀 NEXT STEPS:"
echo "=============="
echo ""
echo "1. Go to https://render.com"
echo "2. Sign up with GitHub (free account)"
echo "3. Click '+ New' → 'Web Service'"
echo "4. Select your repository: candlewyck-diner"
echo "5. Fill in these settings:"
echo "   - Name: candlewyck-diner"
echo "   - Environment: Node"
echo "   - Build Command: npm install && npm run build"
echo "   - Start Command: npm start"
echo ""
echo "6. Click 'Deploy'"
echo ""
echo "⏱️ Your website will be live in 2-3 minutes!"
echo ""
echo "Your site URL will be: https://candlewyck-diner.onrender.com"
echo ""
echo "=========================================="
echo "Deployment instructions sent! 🎉"
