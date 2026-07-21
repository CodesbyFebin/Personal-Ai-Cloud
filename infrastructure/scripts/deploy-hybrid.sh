#!/bin/bash
set -e

echo "🚀 Starting Hybrid Deployment for personalai.cloud..."

# 1. Deploy Marketing Site (Astro) to Netlify
echo "📦 Deploying Marketing Site to Netlify..."
cd apps/marketing
npm run build
netlify deploy --prod --dir=dist --site=$NETLIFY_SITE_ID

# 2. Deploy Web App (Next.js) to Vercel
echo "📦 Deploying Next.js Dashboard to Vercel..."
cd ../web
vercel --prod --token=$VERCEL_TOKEN --scope=$VERCEL_SCOPE

# 3. Build and Push Agent Engine Docker Image to AWS ECR
echo "🐳 Building and pushing Agent Engine to AWS ECR..."
cd ../agent-engine
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com
docker build -t mcpserver-agent-engine .
docker tag mcpserver-agent-engine:latest $AWS_ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/mcpserver-agent-engine:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/mcpserver-agent-engine:latest

# 4. Deploy Worker & Agent Engine to AWS ECS (Mumbai)
echo "⚙️ Updating ECS Services in ap-south-1..."
cd ../../infrastructure/terraform
terraform init
terraform apply -auto-approve -var="db_password=$DB_PASSWORD"

# 5. Run Database Migrations on RDS
echo "🗄️ Running Prisma Migrations..."
cd ../../apps/web
npx prisma migrate deploy

echo "✅ Deployment Complete! personalai.cloud is live."
