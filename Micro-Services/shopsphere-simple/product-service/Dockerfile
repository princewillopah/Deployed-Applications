# user-service/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install Express
RUN npm install express

# Copy server.js
COPY server.js .

# Expose port
EXPOSE 5001

# Start service
CMD ["node", "server.js"]