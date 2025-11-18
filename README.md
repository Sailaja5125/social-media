# 📱 Social Media App

A full-stack social media application built with **React Native** for the frontend and **Express.js**, **MongoDB**, **Clerk**, and **Cloudinary** for the backend. This app allows users to sign up, post images, follow others, and interact in a modern mobile-first experience.

---

## 🚀 Features

- 🔐 User authentication and management via Clerk
- 🖼️ Image upload and hosting with Cloudinary
- 📱 Mobile-first UI built with React Native
- 🧠 Backend API powered by Express.js
- 🗃️ Data persistence with MongoDB
- 👥 Follow/unfollow users
- ❤️ Like and comment on posts
- 🔎 Search and discover content

---

## 🛠️ Tech Stack

| Layer       | Technology           |
|------------|----------------------|
| Frontend   | React Native         |
| Backend    | Express.js           |
| Database   | MongoDB              |
| Auth       | Clerk                |
| Media      | Cloudinary           |

---

## 📦 Installation

### Prerequisites

- Node.js & npm
- MongoDB instance (local or cloud)
- Cloudinary account
- Clerk project setup
- React Native CLI or Expo

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the server:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Configure Clerk and API endpoints in your environment or config files.

Run the app:

```bash
npx react-native run-android
# or
npx react-native run-ios
```

---

## 📁 Project Structure

```
root/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── screens/
│   ├── services/
│   └── App.js
```

---

## 🔐 Authentication

- Clerk handles sign-up, sign-in, and session management.
- Backend validates Clerk tokens for protected routes.

---

## ☁️ Image Uploads

- Images are uploaded from the frontend to Cloudinary.
- Backend handles secure upload endpoints and stores image URLs in MongoDB.

---

## 🧪 API Endpoints

| Method | Endpoint         | Description             |
|--------|------------------|-------------------------|
| POST   | /api/posts       | Create a new post       |
| GET    | /api/posts       | Fetch all posts         |
| GET    | /api/users/:id   | Get user profile        |
| POST   | /api/follow/:id  | Follow a user           |
| POST   | /api/unfollow/:id| Unfollow a user         |

---

## 📌 Notes

- Ensure your Clerk and Cloudinary credentials are correctly set.
- Use secure HTTPS in production.
- Consider rate limiting and input validation for scalability and security.

---

## 📄 License

This project is licensed under the MIT License.

---

Would you like help writing documentation for the API endpoints or setting up deployment instructions?
