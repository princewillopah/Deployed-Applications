Absolutely, Princewill! Here’s a **clean, detailed, step-by-step README** you can use for this MERN Netflix clone project, covering everything from setup to running the app, including the MongoDB part and how to create users for authentication.

---

# Netflix Clone - Full Setup & Usage Guide

![Netflix Clone Screenshot](<Screenshot from 1.png>)
![Netflix Clone Screenshot](<Screenshot from 2.png>)
![Netflix Clone Screenshot](<Screenshot from 3.png>)

---

## Project Overview

This is a full-stack Netflix clone featuring:

* **Frontend:** React with React-Redux for state management, styled with CSS and React Icons.
* **Backend:** Node.js + Express API using Mongoose to interact with MongoDB.
* **Database:** MongoDB stores users and their liked movies.
* **Authentication:** Basic email-based “login” by verifying if a user exists in the database.
* **Development tools:** Nodemon for backend auto-reloading, CORS for cross-origin requests.

> **Note:** Unlike many apps, this project does **not use password-based authentication by default** — the frontend login expects an email, and the backend checks if that email exists in the database. To “create” a user, you add a liked movie or insert the user directly in the database.

---

## Requirements

* Node.js (v14+ recommended)
* npm (comes with Node.js)
* MongoDB installed and running locally (or use a remote MongoDB instance)
* Basic terminal / command line knowledge

---

## Installation & Setup

### 0. Clone the repository

```bash
git clone <repo-url>
cd netflix-clone/Local-version
```

---
###  Prepare Environment Variables

Create `.env` files in  `netflix-ui`  direct and copy the content of `.env.example` to `.env` file

---

### 2. Backend setup

* Install backend dependencies:

```bash
npm install
```

* Confirm you have MongoDB installed and running locally:

```bash
sudo systemctl status mongod
```

If MongoDB is not running, start it:

```bash
sudo systemctl start mongod
```

---

### 3. Configure MongoDB connection (optional)

The backend connects by default to:

```
mongodb://localhost:27017/netflix
```

If you want to use a different connection string, edit it in `server.js` (or wherever the connection happens).

---

### 4. Start backend server

Start backend with nodemon (auto restarts on code changes):

```bash
npm start
```

You should see:

```
DB Connection Successfull
server Started on port 5000...
```

---

### 5. Create your first user

Since there’s **no signup page by default**, you create a user by adding a liked movie via API.

Open a new terminal and run:

```bash
curl -X POST http://localhost:5000/api/user/add \
-H "Content-Type: application/json" \
-d '{
  "email": "your_email@example.com",
  "data": {
    "id": 1,
    "name": "Sample Movie"
  }
}'
```

Replace `"your_email@example.com"` with your real email.

This call does:

* Creates a new user with the given email if none exists
* Adds the given movie to their likedMovies list

---

### 6. Verify the user was created

Check the user’s liked movies:

```bash
curl http://localhost:5000/api/user/liked/your_email@example.com
```

You should see a JSON response listing the liked movies.

---

### 7. Start frontend

Navigate to your frontend folder (likely `netflix-clone-frontend`) and:

```bash
npm install
npm start
```

This runs the React app on:

```
http://localhost:3000
```

---

### 8. Log in on frontend

* Open `http://localhost:3000/signin` in your browser.
* Enter the **same email** you used when creating the user (`your_email@example.com`).
* Submit the form.

If the email exists in the backend database, you will be logged in and can access the app pages.

---

## Additional Notes

* **No password required by default:** The backend does not check passwords yet; login is based on user existence by email.
* **To add liked movies:** Use the frontend UI or POST to `/api/user/add` with your email and movie data.
* **To remove liked movies:** Use PUT `/api/user/remove` with email and movieId.
* **MongoDB storage path:** Make sure your MongoDB data directory has correct permissions.
* You can manually add users or liked movies using the Mongo shell if preferred.

---

## Useful Commands Summary

| Task                          | Command/URL                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| Start MongoDB service         | `sudo systemctl start mongod`                                |
| Start backend server          | `npm start`                                                  |
| Create user (add liked movie) | `curl -X POST http://localhost:5000/api/user/add ...`        |
| Verify liked movies           | `curl http://localhost:5000/api/user/liked/email`            |
| Start frontend React app      | `npm start` inside frontend folder                           |
| Access frontend               | [http://localhost:3000/signin](http://localhost:3000/signin) |

---

## Future Improvements (Optional)

* Add real signup and login routes with hashed passwords
* Use JWT or session tokens for secure authentication
* Add form validations and error handling on frontend and backend

---

If you want, I can help you write these enhancements or provide Postman collections/scripts for testing!

---

# That’s it — you now have a complete README anyone can follow without getting lost.

Would you like me to generate a Markdown file version you can save directly?
