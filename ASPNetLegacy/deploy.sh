#!/bin/bash

# Azure ZIP Deploy Script for ASP.NET Legacy App
# This builds and deploys the app directly to Azure

echo "🚀 Building ASP.NET Legacy App..."

# Build the app
cd "$(dirname "$0")/LegacySim"
dotnet publish -c Release -o ./publish

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Create ZIP
cd publish
echo "📦 Creating deployment package..."
zip -r ../../deploy.zip . > /dev/null

if [ $? -ne 0 ]; then
    echo "❌ ZIP creation failed!"
    exit 1
fi

echo "✅ ZIP created: ../../deploy.zip"

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "⚠️  Azure CLI not found. Install it with: brew install azure-cli"
    echo ""
    echo "📝 Manual deployment steps:"
    echo "1. Go to Azure Portal → Your App Service → Advanced Tools (Kudu) → Go"
    echo "2. Click 'Zip Push Deploy'"
    echo "3. Upload: $(cd ../.. && pwd)/deploy.zip"
    exit 0
fi

# Deploy to Azure
echo "☁️  Deploying to Azure..."
az webapp deployment source config-zip \
  --resource-group chemtrac-legacy-app_group \
  --name chemtrac-legacy-app \
  --src ../../deploy.zip

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Your app: https://chemtrac-legacy-app-h0f7awhad9fsbqg9.canadacentral-01.azurewebsites.net"
else
    echo "❌ Deployment failed!"
    echo "Try manual upload via Kudu (see instructions above)"
fi

