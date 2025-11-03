#!/bin/bash

# Quick deployment script
echo "🚀 CHEMTRAC Deployment Helper"
echo "=============================="
echo ""

# Check if we can push to GitHub
echo "📤 Attempting to push to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "Next steps:"
    echo "1. Deploy backend on Render: https://render.com"
    echo "2. Deploy frontend on Vercel: https://vercel.com"
    echo ""
    echo "See DEPLOY_NOW.md for detailed instructions"
else
    echo "⚠️  Need authentication. Choose one:"
    echo ""
    echo "Option 1: Use GitHub Desktop"
    echo "  - Open GitHub Desktop"
    echo "  - File → Add Local Repository"
    echo "  - Select this folder"
    echo "  - Click 'Publish repository'"
    echo ""
    echo "Option 2: Authenticate and push"
    echo "  - Run: git push -u origin main"
    echo "  - Enter GitHub credentials when prompted"
    echo ""
    echo "Option 3: Use Personal Access Token"
    echo "  - Generate token: https://github.com/settings/tokens"
    echo "  - Use token as password when pushing"
fi

