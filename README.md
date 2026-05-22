# 📊 Project Management System

A full-stack **Project Management Web Application** built using the **MERN stack (MongoDB, Express, React, Node.js)** with **Redis** for caching and performance optimization. This application helps teams manage projects, tasks, budgets, and analytics with real-time updates and role-based access control.

**Repository:** [project-management-system](https://github.com/ravitharun/project-management-system)

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Secure login and signup
- Role-based access control:
  - Employee
  - Team Leader
  - Manager

### 📁 Project Management
- Create, update, and delete projects
- Assign tasks to users
- Track project progress
- Manage multiple projects efficiently

### ✅ Task Management
- Add and manage tasks
- Update task status (Pending / In Progress / Completed)
- Calendar-based task visualization

### 📅 Calendar Integration
- Tasks displayed based on due dates
- Easy visualization of deadlines using FullCalendar

### 💰 Budget Management
- Set project budgets
- Track and monitor expenses
- Budget filtering (planned feature)

### 📈 Analytics Dashboard
- Project performance insights
- Task completion statistics
- Budget usage analytics
- Role-based analytics (Employee / Team Leader / Manager)
- Some features coming soon

### 🔔 Real-time Notifications
- WebSocket (Socket.io) integration
- Real-time task updates
- Instant notifications for project changes

### ⚡ Performance Optimization
- Redis caching for faster responses
- Improved scalability and performance

## 🧑‍💻 Tech Stack

### Frontend
- React.js
- Redux / Context API
- FullCalendar

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Real-time & Cache
- Socket.io (WebSockets)
- Redis

## 📌 Upcoming Features
- Advanced analytics improvements
- Email notifications
- File upload system
- AI-based task suggestions
- Enhanced reporting dashboard

## 🛠️ Installation

```bash
# Clone repository
git clone https://github.com/ravitharun/project-management-system.git

# Move into backend folder
cd Server
npm install
npm start

# Move into frontend folder
cd Ui
npm install
npm start
```

## 👨‍💻 Author
**Ravi Tharun**  
Full Stack Developer (MERN)  
[tharunravi672@gmail.com](mailto:tharunravi672@gmail.com)  
7396994383

## ⭐ Support
If you like this project, give it a **star** on GitHub.