# services/user-service/Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build --if-present

FROM node:18-alpine AS runner
WORKDIR /home/node

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src

USER node

EXPOSE 5001

CMD ["node", "src/server.js"]