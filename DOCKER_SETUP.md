# Docker Deployment Guide

## PreDefense API Running in Docker

Since the PreDefense backend is running in Docker, follow these steps for proper integration:

### 1. Docker Network Setup

The webapp needs to communicate with the PreDefense Docker container.

**Option A: Access via localhost (Recommended for Development)**

Ensure the PreDefense container exposes ports to the host:

```bash
# When running PreDefense container
docker run -p 8000:8000 -p 6633:6633 predefense-api
```

or in `docker-compose.yml`:

```yaml
services:
  predefense-api:
    image: predefense-api
    ports:
      - "8000:8000"  # REST API
      - "6633:6633"  # Ryu Controller
```

**Option B: Run Webapp in Docker (Same Network)**

Create a Docker network and run both containers:

```bash
# Create network
docker network create predefense-network

# Run PreDefense API
docker run --network predefense-network --name predefense-api -p 8000:8000 -p 6633:6633 predefense

# Run Webapp
docker run --network predefense-network -p 8080:8080 -e VITE_API_HOST=predefense-api webapp
```

### 2. Environment Configuration

Create a `.env` file in the webapp root:

```bash
# For localhost access (Docker ports mapped to host)
VITE_API_HOST=localhost
VITE_API_PORT=8000
VITE_DOCKER_ENV=false
```

OR for Docker network access:

```bash
# For Docker network access (both in same network)
VITE_API_HOST=predefense-api
VITE_API_PORT=8000
VITE_DOCKER_ENV=true
```

### 3. Docker Compose Setup (Recommended)

Create `docker-compose.yml` in the WebApp root:

```yaml
version: '3.8'

services:
  predefense-api:
    image: predefense-api:latest
    container_name: predefense-api
    ports:
      - "8000:8000"
      - "6633:6633"
    networks:
      - predefense-net
    restart: unless-stopped

  webapp:
    build: .
    container_name: predefense-webapp
    ports:
      - "8080:8080"
    environment:
      - VITE_API_HOST=predefense-api
      - VITE_API_PORT=8000
      - VITE_DOCKER_ENV=true
    depends_on:
      - predefense-api
    networks:
      - predefense-net
    restart: unless-stopped

networks:
  predefense-net:
    driver: bridge
```

### 4. Dockerfile for Webapp

Create `Dockerfile` in webapp directory:

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
```

### 5. Nginx Configuration

Create `nginx.conf`:

```nginx
server {
    listen 8080;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### 6. Start Everything

```bash
# Development (local)
npm run dev

# Production with Docker Compose
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop
docker-compose down
```

### 7. Verify Connection

1. Check PreDefense API health:
   ```bash
   curl http://localhost:8000/health
   ```

2. Check API docs:
   ```
   http://localhost:8000/docs
   ```

3. Access webapp:
   ```
   http://localhost:8080
   ```

4. Check API status in webapp TopBar (should show "Connected")

### 8. Troubleshooting

**API shows "Offline":**
```bash
# Check if PreDefense container is running
docker ps | grep predefense

# Check PreDefense logs
docker logs predefense-api

# Test API directly
curl http://localhost:8000/health

# Check port mapping
docker port predefense-api
```

**CORS Issues:**
Ensure PreDefense API has CORS configured to allow webapp origin:
```python
# In PreDefense backend
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:8080", "http://localhost:5173"]
    }
})
```

**Network connectivity:**
```bash
# Verify containers are on same network
docker network inspect predefense-net

# Test connectivity from webapp container
docker exec predefense-webapp ping predefense-api
```

### 9. Production Deployment

For production, update environment variables:

```bash
# .env.production
VITE_API_HOST=your-api-domain.com
VITE_API_PORT=443
VITE_DOCKER_ENV=true
```

And build:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### 10. Current Setup

Based on your configuration:
- ✅ PreDefense API running in Docker
- ✅ Ports exposed: 8000 (REST API), 6633 (Ryu Controller)
- ✅ Webapp configured to connect to `localhost:8000`

The webapp will automatically connect when you run `npm run dev`!
