

* Project overview
* Directory structure
* Dockerfiles for backend & frontend
* Docker Compose config
* .env setup
* Troubleshooting (including the exact issues you hit with ports)

---

## 📄 📑 Clean README.md for your Dockerized Netflix Clone

```markdown
# 📺 Netflix Clone — Full MERN Stack (Dockerized)

This project is a **full-stack Netflix Clone** built with:
- **React** (frontend)
- **Node.js / Express / Mongoose** (backend)
- **MongoDB**
- **Firebase Authentication**
- **TMDB API** for movie data

And is fully containerized using **Docker** and **Docker Compose**.

---

## 📂 Project Structure

```

netflix-clone/
├── backend/                  # Node.js backend (Express API)
│   └── Dockerfile
├── frontend/                 # React frontend
│   └── Dockerfile
├── docker-compose.yml        # Multi-container orchestration
└── .env                      # Environment variables (frontend only)

````

---

## 📦 Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Open ports: `3000`, `5000`, `27017` (or modify if already in use)

---

## 🚀 Quick Setup & Run

### 1️⃣ Clone the repository

```bash
git clone <repo-url>
cd netflix-clone
````

---

### 2️⃣ Configure Environment Variables

Create a `.env` file in the `frontend/` directory:

```
REACT_APP_TMDB_API_KEY=<your_tmdb_api_key>
REACT_APP_FIREBASE_API_KEY=<your_firebase_api_key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<your_firebase_project>
REACT_APP_FIREBASE_PROJECT_ID=<your_project_id>
REACT_APP_FIREBASE_STORAGE_BUCKET=<your_storage_bucket>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your_messaging_id>
REACT_APP_FIREBASE_APP_ID=<your_app_id>
REACT_APP_FIREBASE_MEASUREMENT_ID=<your_measurement_id>
```

**Note:** Don’t commit this `.env` file. Add `.env` to `.gitignore`.

---

### 3️⃣ Build and Run the Containers

From the project root:

```bash
docker-compose up --build
```

---

## 🐳 Dockerfiles

### 📦 `backend/Dockerfile`

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV MONGO_URL=mongodb://mongo:27017/netflix
ENV PORT=5000

EXPOSE 5000

CMD ["npm", "start"]
```

---

### 📦 `frontend/Dockerfile`

```dockerfile
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

## 📝 docker-compose.yml (Root)

```yaml
services:
  mongo:
    image: mongo:6.0
    restart: always
    volumes:
      - mongo_data:/data/db
    ports:
      - "27017:27017"

  backend:
    build:
      context: ./backend
    depends_on:
      - mongo
    ports:
      - "5000:5000"
    environment:
      - MONGO_URL=mongodb://mongo:27017/netflix
    volumes:
      - ./backend:/app
    command: npm start

  frontend:
    build:
      context: ./frontend
    ports:
      - "3000:80"
    environment:
      - REACT_APP_TMDB_API_KEY=yourapikeyhere
    volumes:
      - ./frontend:/app

volumes:
  mongo_data:
  
```

### To Run: 

``` Yaml 
    docker-compose up -d --build
```

### To Take Down: 

```yaml 
    docker-compose down
```

---

## 🔍 Troubleshooting

### 🚨 Common Issues & Fixes

**1️⃣ Port 27017 (MongoDB) already in use**

* Stop the local MongoDB service:

  ```bash
  sudo systemctl stop mongod
  ```
* Or remap the port in `docker-compose.yml`:

  ```yaml
  ports:
    - "27018:27017"
  ```

---

**2️⃣ Port 5000 (Backend) already in use**

* Check which process uses it:

  ```bash
  sudo lsof -i :5000
  ```
* Kill the process:

  ```bash
  sudo kill -9 <pid>
  ```
* Or remap it in `docker-compose.yml`:

  ```yaml
  ports:
    - "5001:5000"
  ```

---

**3️⃣ React .env Variables Not Loading**

* Ensure variable names start with `REACT_APP_`
* Restart frontend container after changes:

  ```bash
  docker-compose restart frontend
  ```

---

## 📱 Access URLs

* **Frontend (React)**: [http://localhost:3000](http://localhost:3000)
* **Backend API (Node/Express)**: [http://localhost:5000](http://localhost:5000)
* **MongoDB**: accessible internally at `mongo:27017`

---

## ✅ Recap

| Service  | Host Port | Container Port |
| :------- | :-------- | :------------- |
| Frontend | 3000      | 80             |
| Backend  | 5000      | 5000           |
| MongoDB  | 27017     | 27017          |

---

## 🎉 Done!

Your **Netflix Clone MERN App** is now fully Dockerized and running in isolated, portable containers!

---

## 📌 Author

Princewill Opah 🚀
Cloud / DevOps Engineer | MERN Enthusiast

---
