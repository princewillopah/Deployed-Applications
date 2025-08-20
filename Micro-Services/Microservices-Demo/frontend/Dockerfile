# Stage 1: Build React App
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Verify lockfile exists
RUN if [ ! -f package-lock.json ]; then \
      echo "❌ ERROR: package-lock.json is required for npm ci"; \
      exit 1; \
    fi

# Install only production dependencies (reproducible)
RUN npm ci --only=production

# Install all deps (including dev for build tools like react-scripts)
RUN npm install

# Copy source
COPY . .

# Build for production
ENV NODE_ENV=production
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# # Copy built assets
# COPY --from=builder /app/build /usr/share/nginx/html

# Remove default config
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/build /usr/share/nginx/html

# DO NOT COPY nginx.conf HERE
# It will be mounted via docker-compose

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=10s --timeout=3s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1

# Run
CMD ["nginx", "-g", "daemon off;"]