#!/bin/bash
set -e
echo "🚀 Deploying personalai.cloud to production..."
cd infrastructure/terraform
terraform init
terraform apply -var="db_password=$DB_PASSWORD" -auto-approve
echo "✅ Infrastructure ready"
