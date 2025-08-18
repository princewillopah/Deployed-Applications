# product-service/Dockerfile
FROM node:18-alpine

WORKDIR /app

RUN npm install express

COPY server.js .

EXPOSE 5002

CMD ["node", "server.js"]