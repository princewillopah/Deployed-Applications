# Stage 1: Build React App
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm install

# Copy source
COPY . .

# Build for production
ENV NODE_ENV=production
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/build /usr/share/nginx/html

# Copy Nginx config (from context)
COPY nginx.conf /etc/nginx/nginx.conf

# Optional: proxy_params if used
COPY proxy_params /etc/nginx/proxy_params

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=10s --timeout=3s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1

# Run
CMD ["nginx", "-g", "daemon off;"]