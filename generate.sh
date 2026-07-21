#!/bin/bash
set -e

echo "🌟 Generating PersonalAI.cloud monorepo..."

# Root files
mkdir -p apps packages astro-site personalai_app infrastructure/terraform .github/workflows

cat > package.json <<'EOF'
{
  "name": "personalai-cloud",
  "private": true,
  "workspaces": ["apps/*", "packages/*", "personalai_app"],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "db:generate": "cd packages/db && prisma generate",
    "db:push": "cd packages/db && prisma db push",
    "db:studio": "cd packages/db && prisma studio"
  },
  "devDependencies": { "turbo": "^1.13.2" }
}
EOF

cat > turbo.json <<'EOF'
{"pipeline":{"build":{"dependsOn":["^build"],"outputs":["dist/**",".next/**","out/**"]},"dev":{"cache":false,"persistent":true},"lint":{},"test":{}}}
EOF

cat > docker-compose.yml <<'EOF'
version: '3.8'
services:
  postgres: { image: pgvector/pgvector:pg16, environment: { POSTGRES_USER: personalai, POSTGRES_PASSWORD: personalai_dev, POSTGRES_DB: personalai_cloud }, ports: ["5432:5432"], volumes: [postgres_data:/var/lib/postgresql/data] }
  redis: { image: redis:7-alpine, ports: ["6379:6379"], volumes: [redis_data:/data] }
  web: { build: { context: ., dockerfile: apps/web/Dockerfile }, ports: ["3000:3000"], environment: { DATABASE_URL: postgresql://personalai:personalai_dev@postgres:5432/personalai_cloud, REDIS_URL: redis://redis:6379, NEXTAUTH_SECRET: dev-secret, NEXTAUTH_URL: http://localhost:3000 }, depends_on: [postgres, redis] }
  worker: { build: { context: ., dockerfile: apps/worker/Dockerfile }, environment: { DATABASE_URL: postgresql://personalai:personalai_dev@postgres:5432/personalai_cloud, REDIS_URL: redis://redis:6379 }, depends_on: [postgres, redis] }
volumes: { postgres_data: {}, redis_data: {} }
EOF

cat > .env.example <<'EOF'
DATABASE_URL=postgresql://personalai:password@localhost:5432/personalai_cloud
REDIS_URL=redis://localhost:6379
NEXTAUTH_SECRET=your-32-char-secret-key
NEXTAUTH_URL=https://personalai.cloud
OPENAI_API_KEY=
WHATSAPP_VERIFY_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_ACCESS_TOKEN=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
ENCRYPTION_KEY=your-32-byte-encryption-key
EOF

cat > .gitignore <<'EOF'
node_modules/
.env
.turbo
dist/
.next/
*.aab
*.apk
terraform.tfstate*
EOF

cat > README.md <<'EOF'
# PersonalAI.cloud

India's first managed Personal AI Assistant with persistent memory.

## Quick Start
npm install && docker-compose up -d && npm run db:push && npm run dev
EOF

# Packages
mkdir -p packages/db/prisma packages/db/src packages/config/src packages/whatsapp/src packages/ui/src/components

cat > packages/db/package.json <<'EOF'
{"name":"@personalai/db","version":"0.1.0","private":true,"main":"src/index.ts","scripts":{"generate":"prisma generate","push":"prisma db push"},"dependencies":{"@prisma/client":"^5.18.0"},"devDependencies":{"prisma":"^5.18.0"}}
EOF

cat > packages/db/prisma/schema.prisma <<'EOF'
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }
model User { id String @id @default(cuid()); email String @unique; name String?; role UserRole @default(USER); }
enum UserRole { USER ADMIN }
model AIAgent { id String @id @default(cuid()); userId String; name String; slug String @unique; systemPrompt String; language String @default("en"); }
model Channel { id String @id @default(cuid()); agentId String; type ChannelType; isActive Boolean @default(true); }
enum ChannelType { WHATSAPP ANDROID WEB }
model Memory { id String @id @default(cuid()); agentId String; userId String; content String; category MemoryCategory; }
enum MemoryCategory { FACT PREFERENCE EPISODIC DOCUMENT }
model ChatSession { id String @id @default(cuid()); agentId String; userId String; channel ChannelType; messages Json; }
model Billing { id String @id @default(cuid()); userId String @unique; plan Plan @default(FREE); }
enum Plan { FREE STARTER PRO ENTERPRISE }
model AuditLog { id String @id @default(cuid()); userId String?; action String; resource String; }
EOF

cat > packages/db/src/index.ts <<'EOF'
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();
EOF

cat > packages/config/package.json <<'EOF'
{"name":"@personalai/config","version":"0.1.0","private":true,"main":"src/index.ts","dependencies":{"zod":"^3.23.8"}}
EOF

cat > packages/config/src/index.ts <<'EOF'
import { z } from 'zod';
export const env = z.object({ DATABASE_URL: z.string().url(), REDIS_URL: z.string().url(), NEXTAUTH_SECRET: z.string().min(32) }).parse(process.env);
EOF

cat > packages/whatsapp/package.json <<'EOF'
{"name":"@personalai/whatsapp","version":"0.1.0","private":true,"main":"src/index.ts","dependencies":["@personalai/config"]}
EOF

cat > packages/whatsapp/src/index.ts <<'EOF'
import crypto from 'crypto';
export function verifySignature(body: string, sig: string) { return true; }
export async function sendText(to: string, text: string) {}
EOF

cat > packages/ui/package.json <<'EOF'
{"name":"@personalai/ui","version":"0.1.0","private":true,"main":"src/index.tsx","peerDependencies":{"react":"^18.3.1"}}
EOF

cat > packages/ui/src/index.tsx <<'EOF'
export const Button = ({children}:any) => <button className="px-4 py-2 bg-indigo-600 text-white rounded">{children}</button>;
EOF

# Apps
mkdir -p apps/web/src/app apps/web/src/app/api/auth/\[...nextauth\] apps/web/src/app/api/agents/provision apps/web/src/lib apps/web/src/styles
mkdir -p apps/worker/src
mkdir -p apps/agent-engine/src

cat > apps/web/package.json <<'EOF'
{"name":"@personalai/web","version":"0.1.0","private":true,"scripts":{"dev":"next dev","build":"next build"},"dependencies":{"next":"14.2.0","react":"^18.3.1","@prisma/client":"^5.18.0","next-auth":"^4.24.7","bullmq":"^5.0.0"}}
EOF

cat > apps/web/next.config.js <<'EOF'
module.exports = { transpilePackages: ['@personalai/db', '@personalai/config'] };
EOF

cat > apps/web/src/app/page.tsx <<'EOF'
export default () => <div><h1>PersonalAI.cloud</h1><p>Your Personal AI Assistant</p></div>;
EOF

cat > apps/web/src/app/layout.tsx <<'EOF'
export default function RootLayout({children}:any) { return <html><body>{children}</body></html>; }
EOF

cat > apps/web/src/app/api/auth/\[...nextauth\]/route.ts <<'EOF'
import NextAuth from 'next-auth';
const handler = NextAuth({providers:[]});
export { handler as GET, handler as POST };
EOF

cat > apps/web/src/app/api/agents/provision/route.ts <<'EOF'
import { NextResponse } from 'next/server';
export async function POST() { return NextResponse.json({status:'ok'}); }
EOF

cat > apps/web/Dockerfile <<'EOF'
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm","run","dev"]
EOF

cat > apps/worker/package.json <<'EOF'
{"name":"@personalai/worker","version":"0.1.0","private":true,"scripts":{"dev":"tsx src/index.ts"}}
EOF

cat > apps/worker/src/index.ts <<'EOF'
import { Worker } from 'bullmq';
const w = new Worker('provision', async j => console.log(j.data), {connection:{host:'localhost'}});
EOF

cat > apps/agent-engine/package.json <<'EOF'
{"name":"@personalai/agent-engine","version":"0.1.0","private":true}
EOF

cat > apps/agent-engine/src/index.ts <<'EOF'
export class MemoryManager {}
EOF

# Astro site
mkdir -p astro-site/src/{pages,components,layouts,data,styles} astro-site/src/components/templates astro-site/public

cat > astro-site/package.json <<'EOF'
{"name":"personalai-marketing","type":"module","version":"1.0.0","scripts":{"dev":"astro dev","build":"astro build"}}
EOF

cat > astro-site/astro.config.mjs <<'EOF'
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({site:'https://personalai.cloud',integrations:[sitemap()]});
EOF

cat > astro-site/tailwind.config.mjs <<'EOF'
export default {content:['./src/**/*.{astro,html,js,ts}'],theme:{extend:{colors:{ink:'#0B0E11',paper:'#ECE7DD',thread:'#E8A33D'}}}};
EOF

cat > astro-site/src/data/sitemap.json <<'EOF'
[{"no":1,"url":"/","slug":"index","hub":"core","title":"Personal AI Assistant","meta":"Create your personal AI assistant"},{"no":2,"url":"/whatsapp/","slug":"whatsapp","hub":"whatsapp","title":"WhatsApp AI","meta":"AI in WhatsApp"}]
EOF

cat > astro-site/src/pages/index.astro <<'EOF'
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Personal AI"><h1>PersonalAI.cloud</h1></BaseLayout>
EOF

cat > astro-site/src/layouts/BaseLayout.astro <<'EOF'
---
export interface Props { title: string; }
const { title } = Astro.props;
---
<!DOCTYPE html><html><head><title>{title}</title></head><body><slot/></body></html>
EOF

cat > astro-site/src/pages/[...slug].astro <<'EOF'
---
import BaseLayout from '../layouts/BaseLayout.astro';
import sitemap from '../data/sitemap.json';
export async function getStaticPaths() {
  return sitemap.filter(p=>p.slug!=='index').map(p=>({params:{slug:p.slug}}))
}
const { slug } = Astro.params;
const page = sitemap.find(p=>p.slug===slug);
---
<BaseLayout title={page?.title||slug}><h1>{page?.title||slug}</h1></BaseLayout>
EOF

cat > astro-site/src/pages/robots.txt <<'EOF'
User-agent: *
Allow: /
Sitemap: https://personalai.cloud/sitemap.xml
EOF

# Flutter
mkdir -p personalai_app/lib
cat > personalai_app/pubspec.yaml <<'EOF'
name: personalai_app
version: 1.0.0+1
sdk: '>=3.0.0 <4.0.0'
dependencies:
  flutter: { sdk: flutter }
  webview_flutter: ^4.4.2
  firebase_core: ^2.24.2
EOF

cat > personalai_app/lib/main.dart <<'EOF'
import 'package:flutter/material.dart';
void main() => runApp(const MaterialApp(home:Scaffold(body:Center(child:Text('PersonalAI')))));
EOF

# Terraform
cat > infrastructure/terraform/main.tf <<'EOF'
terraform { required_providers { aws = { source="hashicorp/aws", version="~>5.0" } } }
provider "aws" { region = "ap-south-1" }
resource "aws_vpc" "main" { cidr_block = "10.0.0.0/16" }
EOF

# GitHub Actions
cat > .github/workflows/flutter-deploy.yml <<'EOF'
name: Deploy Android
on: {push:{branches:[main],paths:['personalai_app/**']}}
jobs:{deploy:{runs-on:ubuntu-latest,steps:[{uses:actions/checkout@v4}]}}
EOF

echo "✅ Generated!"