# Dockerfile - user-service
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY server.js ./server.js

EXPOSE 4001

CMD ["npm", "start"]