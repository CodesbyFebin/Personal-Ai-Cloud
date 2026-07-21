#!/bin/bash
set -e

echo "🚀 Deploying PersonalAI to AWS Mumbai (ap-south-1)"

# Check prerequisites
command -v terraform >/dev/null 2>&1 || { echo "❌ Terraform is required but not installed."; exit 1; }
command -v aws >/dev/null 2>&1 || { echo "❌ AWS CLI is required but not installed."; exit 1; }

# Check AWS credentials
aws sts get-caller-identity >/dev/null 2>&1 || { echo "❌ AWS credentials not configured."; exit 1; }

cd "$(dirname "$0")"

# Initialize Terraform
echo "📦 Initializing Terraform..."
terraform init

# Validate configuration
echo "✅ Validating Terraform configuration..."
terraform validate

# Plan deployment
echo "📋 Planning deployment..."
terraform plan -out=tfplan

# Apply deployment
echo "🚀 Applying deployment..."
terraform apply tfplan

echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Update terraform.tfvars with your AWS account ID and certificate ARN"
echo "2. Build and push Docker images to ECR"
echo "3. Configure environment variables in AWS Systems Manager Parameter Store"
echo "4. Update your domain's nameservers to point to the Route53 nameservers"
