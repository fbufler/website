# VPS Setup

## Prerequisites

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# Create shared networks (once)
docker network create web
docker network create monitoring
```

## Deploy order

### 1. Traefik (reverse proxy + SSL)

```bash
cp -r deploy/traefik ~/traefik
cd ~/traefik
touch acme.json && chmod 600 acme.json
docker compose up -d
```

### 2. Watchtower (auto-updates)

```bash
cp -r deploy/watchtower ~/watchtower
cd ~/watchtower
docker compose up -d
```

### 3. fbufler site

```bash
cp -r deploy/fbufler ~/fbufler
cd ~/fbufler
docker compose up -d
```

### 4. Monitoring (Prometheus + Grafana)

```bash
cp -r deploy/monitoring ~/monitoring
cd ~/monitoring
docker compose up -d
```

## DNS records required

| Name | Type | Value |
|------|------|-------|
| `me` | A | `<VPS IP>` |
| `grafana` | A | `<VPS IP>` |

## Notes

- SSL certs are obtained automatically by Traefik via Let's Encrypt on first request
- Grafana is available at `https://grafana.fbufler.cloud`
- The `/metrics` endpoint on the app is only reachable internally via the `monitoring` network
- Watchtower polls every 5 minutes and auto-restarts containers when new images are pushed
