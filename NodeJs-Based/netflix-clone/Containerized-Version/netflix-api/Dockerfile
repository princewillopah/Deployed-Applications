# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV MONGO_URL=mongodb://mongo:27017/netflix
ENV PORT=5000

EXPOSE 5000

CMD ["npm", "start"]
