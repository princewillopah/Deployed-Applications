E-commerce Platform
Overview
This is a full-stack e-commerce platform built with React, Node.js, Express, and MongoDB. It includes user authentication, product browsing, cart management, order history, product reviews, and an admin dashboard.
Setup Instructions

Prerequisites:

Node.js (v14 or higher)
MongoDB (running locally or provide a MongoDB URI)
npm


Directory Structure:
ecommerce-app/
├── client/           # React frontend
├── server/           # Node.js/Express backend
└── README.md


Installation:
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install


Environment Variables:

In server/.env:MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret


In client/.env:REACT_APP_API_URL=http://localhost:5000




Seed the Database:
cd server
npm run seed

This creates:

Admin user: username: admin, password: admin
Regular user: username: user, password: password
Sample products in Electronics and Clothing categories


Running the Application:
# Start MongoDB (if running locally)
mongod

# Start the server
cd server
npm start

# Start the client (in a new terminal)
cd client
npm start


Access the App:

Frontend: http://localhost:3000
Backend API: http://localhost:5000



Testing the Admin User

Navigate to http://localhost:3000/login
Log in with:
Username: admin
Password: admin


Access the admin dashboard at http://localhost:3000/admin to manage products and view users.

Features

User Authentication: Sign up and log in with JWT-based authentication.
Product Browsing: Search products by name or filter by category.
Cart & Orders: Add products to cart, checkout, and view order history.
Reviews & Ratings: Users can leave reviews and rate products.
Admin Dashboard: Manage products (CRUD) and view all users.
Responsive Design: Styled with Tailwind CSS for a modern, appealing look.

Notes

Images: The app uses a placeholder image (/images/product.jpg). Replace it in client/public/images with actual product images.
Security: JWT ensures secure authentication; admin routes are protected.
Database: MongoDB schemas are indexed for performance.
Scalability: The app is structured for production with error handling and modular code.
