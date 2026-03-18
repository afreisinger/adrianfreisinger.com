---
title: Complete Redmine Docker Stack with Plugins and Themes
description: 'Deploy a fully customized Redmine project management tool with 15+ plugins and 5 professional themes using Docker Compose. A production-ready guide with health checks, persistent storage, and automated backups.'
featured: true
date: 2026-03-18
slug: /blog/redmine-docker-complete/
tags:
  - docker
  - redmine
  - project-management
  - devops
  - postgresql
repo: 'https://github.com/afreisinger/redmine'
---

## Introduction

Redmine is a powerful project management tool, but installation and maintenance can be complex. This guide shows you how to deploy a **fully customized Redmine 6.1.2** using Docker, including 15+ plugins and 5 professional themes.

## Why Docker?

✅ **Isolation**: Each service in its own container  
✅ **Portability**: Works the same in dev, test, and production  
✅ **Scalability**: Easy to replicate and update  
✅ **Maintainability**: No dependency conflicts

## Architecture

Our stack consists of:

```
        ┌────────────────────────────────────────────────────┐
        │              Docker Compose Network                │
        ├────────────────────────────────────────────────────┤
        │                                                    │
        │  ┌──────────────────────────────────────────────┐  │
        │  │          Redmine 6.1.2                       │  │
        │  │  ├─ Web UI (3000)                            │  │
        │  │  ├─ 15+ Plugins                              │  │
        │  │  └─ 5 Themes                                 │  │
        │  └──────────────────────────────────────────────┘  │
        │                      ↓                             │
        │  ┌──────────────────────────────────────────────┐  │
        │  │      PostgreSQL 16                           │  │
        │  │  ├─ redmine_storage (volume)                 │  │
        │  │  └─ Health checks                            │  │
        │  └──────────────────────────────────────────────┘  │
        │                                                    │
        └────────────────────────────────────────────────────┘
```

## Prerequisites

```bash
# Check Docker
docker --version
# Docker version 20.10.0 or higher

# Check Docker Compose
docker compose version
# Docker Compose version v2.0.0 or higher

# Check available space
df -h /
# Minimum 10GB free
```

## Step 1: Environment Preparation

### Create proxy network

```bash
docker network create proxy
```

This network is used by multiple services in your infrastructure.

### Clone repository

```bash
cd /path/to/projects
git clone <your-repo>
cd ru
```

## Step 2: Configure Environment Variables

```bash
cp env\ copy.example .env
```

Edit `.env` with secure values:

```env
# Database
DB_NAME=redmine
DB_USER=redmine
DB_PASSWORD=something_very_secure_123!@#

# Security
# Generate: openssl rand -hex 64
REDMINE_SECRET_KEY_BASE=abc123def456...xyz789

# Versions
THEMES_VERSION=1.0.0
PLUGINS_VERSION=1.0.0
```

⚠️ **NEVER** commit `.env` with real values. It's in `.gitignore`.

## Step 3: Start the Stack

```bash
# Build images (first time)
docker compose build

# Start services in background
docker compose up -d

# Monitor logs
docker compose logs -f redmine

# Check status
docker compose ps
```

Wait until all show `healthy` ✓

## Step 4: Initial Access

### URL

```
http://localhost:3000
```

### Default Credentials

```
Username: admin
Password: admin
```

### Change Password (IMPORTANT)

1. Go to **Administration** > **Users**
2. Click "admin"
3. Change password
4. Save

## Custom Image Architecture

### redmine-plugins

The Dockerfile uses **multi-stage build** to minimize size:

```dockerfile
FROM alpine:3.20 AS builder
# Stage 1: Decompress ZIPs

FROM alpine:3.20
# Stage 2: Copy final files
```

**Advantages:**

- Very small final image (~50MB)
- Fast to download and deploy
- Only necessary files

**Included Plugins:**

- Agile (agile management)
- CRM (contacts and customers)
- Finance (budgets)
- ...and 12 more

### redmine-themes

Same concept as plugins:

**Available Themes:**

- A1 Theme (modern)
- Circle Theme (circular)
- Coffee Theme (dark)
- Highrise Theme (responsive)
- Opale Theme (minimalist)

## Health Checks: Automatic Monitoring

Our stack includes health checks for each service:

### PostgreSQL

```yaml
healthcheck:
  test: ['CMD', 'pg_isready', '-U', 'redmine']
  interval: 30s
  timeout: 10s
  retries: 5
  start_period: 30s
```

### Redmine

```yaml
healthcheck:
  test: ['CMD', 'curl', '-f', 'http://localhost:3000/']
  interval: 60s
  timeout: 15s
  retries: 3
  start_period: 60s
```

Docker automatically restarts if any service fails.

## Managing Persistent Volumes

Volumes ensure data persists between restarts:

```bash
# List volumes
docker volume ls | grep redmine

# Inspect a volume
docker volume inspect ru_redmine_storage

# Backup volume
docker run --rm -v ru_redmine_storage:/data -v $(pwd):/backup \
  alpine tar czf /backup/redmine_storage.tar.gz -C /data .
```

## Adding New Plugins

### Get plugin

Download from [plugins.redmine.org](https://www.redmine.org/plugins)

### Installation

1. **Copy ZIP**

   ```bash
   cp redmine_new_plugin.zip ./redmine-plugins/plugins/
   ```

2. **Rebuild image**

   ```bash
   docker build -t redmine-plugins:1.0.1 ./redmine-plugins
   ```

3. **Update compose**

   ```yaml
   redmine-plugins:
     image: redmine-plugins:1.0.1
   ```

4. **Restart**

   ```bash
   docker compose down && docker compose up -d
   ```

5. **Enable in UI**
   - Administration > Plugins
   - Click "Enable"

## Backup and Recovery

### Automatic backup

```bash
./backup.sh
```

Creates dump in `db-backup/redmine_TIMESTAMP.sql`

### Manual backup

```bash
docker compose exec db \
  pg_dump -U redmine redmine > redmine_backup.sql
```

### Restoration

```bash
docker compose exec -T db psql -U redmine redmine < redmine_backup.sql
```

## Common Troubleshooting

### ❌ "redmine-db is unhealthy"

```bash
docker compose logs db
```

**Common solution:**

- Wait 60 seconds for PostgreSQL to start
- Remove old volume: `docker volume rm ru_redmine_storage`

### ❌ "connection refused to proxy"

```bash
# Check network
docker network ls | grep proxy

# Create if missing
docker network create proxy
```

### ❌ Plugins don't appear

```bash
# Check volume
docker compose exec redmine ls -la /usr/src/redmine/plugins

# Restart
docker compose restart redmine
```

### ❌ Port 3000 already in use

```bash
# Option 1: Change port in docker-compose.yml
ports:
  - "3001:3000"

# Option 2: See what uses port 3000
lsof -i :3000
```

## Next Steps

✅ Configure users and projects  
✅ Activate needed plugins  
✅ Customize theme  
✅ Integrate with external systems (API)  
✅ Setup automated backups

## Resources

- [Redmine Documentation](https://www.redmine.org/projects/redmine/wiki)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redmine Plugins](https://www.redmine.org/plugins)

---

**Questions?** Open an issue in the repository.
