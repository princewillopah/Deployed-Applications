# Stage 1: Build the React application
FROM node:18

# Set working directory to /app
WORKDIR /myApp

# Copy package*.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to /app
COPY . .



# Expose port 80 for the Nginx server
EXPOSE 3000

# Run the Nginx server when the container starts
CMD ["npm", "start"]








# # Stage 1: Build the React application
# FROM node:16 as build

# # Set working directory to /app
# WORKDIR /app

# # Copy package*.json to /app
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code to /app
# COPY . .

# # Build the React application
# RUN npm run build

# # Stage 2: Serve the React application with Nginx
# FROM nginx:latest

# # Copy the built React application from Stage 1 to /usr/share/nginx/html
# COPY --from=build /app/build/ /usr/share/nginx/html/

# # Expose port 80 for the Nginx server
# EXPOSE 80

# # Run the Nginx server when the container starts
# CMD ["nginx", "-g", "daemon off;"]
