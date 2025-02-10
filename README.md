# 🗨️ Chatter – A Real-Time Chat Application

**Chatter** is a real-time chat application built using **React.js** and **Tailwind CSS** for the frontend and **Node.js**, **Express.js**, and **Socket.io** for the backend. It features **secure Google authentication** via **Passport.js** and **MongoDB** for data storage.



## ✨ Features

✅ **Real-time messaging** powered by **Socket.io**  
✅ **Google authentication** with **Passport.js**  
✅ **Modern & responsive UI** with **React & Tailwind CSS**  
✅ **Secure session management** with **Express sessions**  
✅ **MongoDB for data persistence**  
✅ **User-friendly dark mode interface**  
✅ **Group and private messaging support**  
## 🔧 Technologies Used

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="50">
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind CSS" width="50">
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js" width="50">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" alt="Express.js" width="80">
  <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Socket-io.svg" alt="Socket.io" width="50">
  <img src="https://1000logos.net/wp-content/uploads/2020/08/MongoDB-Logo.png" alt="MongoDB" width="100">
  <img src="https://passportjs.org/images/logo.svg" alt="Passport.js" width="100">
</p>

| Tech Stack      | Description |
|----------------|------------|
| **React.js**   | Frontend Framework |
| **Tailwind CSS** | Styling Framework |
| **Node.js**    | Backend Runtime |
| **Express.js** | Backend Framework |
| **Socket.io**  | Real-time Communication |
| **MongoDB**    | NoSQL Database |
| **Passport.js** | Authentication |

---
## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/chatter.git
cd chatter
```

### 2️⃣ Install Dependencies
```sh
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3️⃣ Configure Environment Variables

#### 📌 Backend `.env`
```env
PORT=6005
DATABASE="mongodb+srv://<username>:<password>@cluster0.mongodb.net/ChatterDB"
CLIENT_ID="your_google_client_id"
CLIENT_SECRET="your_google_client_secret"
SESSION_SECRET="your_secure_session_secret"
```

#### 📌 Frontend `.env`
```env
REACT_APP_BACKEND_URL="http://localhost:6005"
REACT_APP_GOOGLE_CLIENT_ID="your_google_client_id"
```

### 4️⃣ Run the Application
```sh
# Start backend
cd backend
npm start

# Start frontend
cd ../frontend
npm start
```

---

## 📸 Screenshots


![Screenshot from 2025-02-10 14-38-02](https://github.com/user-attachments/assets/6c0fb5d0-88fe-45cd-bd97-0bd245396298)
![Screenshot from 2025-02-10 14-57-25](https://github.com/user-attachments/assets/fcf7a008-66c0-424d-8c68-b3dd541b0ad9)
![Screenshot from 2025-02-10 15-00-08](https://github.com/user-attachments/assets/b04359d7-a454-4ad8-aa66-5f58d1d9fcb4)

---

## 🤝 Contributing

1. **Fork** the repository 🍴  
2. **Create** your feature branch (`git checkout -b feature-name`) 🌟  
3. **Commit** your changes (`git commit -m 'Added new feature'`) ✅  
4. **Push** to the branch (`git push origin feature-name`) 🚀  
5. **Open a Pull Request** 🔥  

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

### 🎉 Happy Chatting! 🎉
