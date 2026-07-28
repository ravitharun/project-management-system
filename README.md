# Project Management System

A modern full-stack **Project Management System** inspired by enterprise collaboration tools like Jira, built using the MERN stack — MongoDB, Express.js, React.js, and Node.js — with Redis caching, rate limiting, Socket.io-based real-time communication, and Google Calendar integration.

This platform helps teams manage projects, workflows, tasks, collaboration, analytics, and productivity in real time. It is actively evolving with enterprise-level features, workflow improvements, and scalability enhancements.

## Repository

[GitHub Repository](https://github.com/ravitharun/project-management-system)

---

# Features

## Authentication & Authorization

- JWT-based secure authentication
- Secure user signup and login
- Protected API routes
- Middleware-based authentication and authorization handling
- Google OAuth 2.0 authentication for Calendar integration

---

## Workspace & Project Management

- Create and manage workspaces
- Create, update, and delete spaces
- Workspace sharing functionality
- Support for multiple projects
- Team-based collaboration system
- Task progress tracking
- Multiple workspace types:
  - Scrum Workspace
  - Kanban Workspace
  - Event Calendar Workspace

---

## Task Management System

- Create and assign tasks to team members
- Manage task priorities
- Dynamic task workflow with statuses:
  - Pending
  - In Progress
  - Completed
  - Custom Status
- Task comments and replies
- Real-time task updates
- Calendar and timeline-based task visualization
- Drag-and-drop task management
- Custom workspace background upload
- Custom workspace icon upload
- Due date and reminder management
- Estimated task hours
- Task tags support

---

## Google Calendar Integration

- Google OAuth 2.0 authentication
- Secure Google account connection
- One-click Google Calendar integration
- Automatically creates Google Calendar events when tasks are assigned
- Synchronizes:
  - Task title
  - Description
  - Due date
  - Due time
- Stores Google Calendar Event ID for future synchronization
- Calendar events are created only for users who have connected their Google account
- Success notifications for Google Calendar synchronization

> **Current Status**
>
> - ✅ Event creation is implemented.
> - 🚧 Task update synchronization is under development.
> - 🚧 Task deletion synchronization is under development.

---

## Real-Time Collaboration

- WebSocket integration using Socket.io
- Real-time notifications
- Live task and project updates
- Instant collaboration support
- Real-time comments system *(currently under development)*

---

## Analytics Dashboard

> Analytics dashboard features are currently under development.

Planned analytics features include:

- Project progress analytics
- Task completion tracking
- Budget insights
- Team productivity monitoring
- Role-based dashboard analytics
- Dynamic data visualization

---

## Resource Management

- Upload and manage workspace resources
- Centralized resource handling inside workspaces

---

## Performance & Scalability

- Redis caching for performance optimization
- Rate limiting for API and server protection
- Global error handling middleware
- Optimized API response handling
- Scalable backend architecture

---

## UI/UX Features

- Responsive modern dashboard UI
- Dark and light mode support
- Dynamic filtering systems
- Reusable component architecture
- Advanced AG Grid table management
- Timeline and calendar visualization
- Interactive user experience design
- Toast notifications
- Loading animations and skeleton loaders

---

# Tech Stack

## Frontend

- React.js
- TypeScript
- Context API
- Tailwind CSS
- FullCalendar
- AG Grid
- React Icons
- React Toastify

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Google Calendar API
- Google OAuth 2.0

---

## Real-Time & Performance

- Socket.io
- Redis
- Express Rate Limiter

---

## DevOps & Architecture

- Docker *(planned)*
- NGINX *(planned deployment architecture)*
- REST API architecture
- Middleware-based backend structure
- CI/CD workflow integration
- GitHub Actions *(configuration added)*

---

# Upcoming Features

The application is actively evolving with enterprise-level features currently under development:

- Google Calendar event update synchronization
- Google Calendar event deletion synchronization
- Two-way Google Calendar synchronization
- Jira-style sprint management
- Advanced Kanban workflow improvements
- AI-powered task suggestions
- Advanced reporting dashboard
- File upload and attachment system
- Team chat system
- Notification center improvements
- Advanced workspace permission system
- Project timeline and Gantt chart improvements
- Email notification services
- Docker deployment support
- Microservices migration architecture

---

# Partially Implemented Features

- ✅ Kanban drag-and-drop board UI completed
- ✅ Activity logs system completed with schema, controller, and routing implementation
- ✅ Google Calendar task creation integration completed
- ✅ Google OAuth authentication completed
- ✅ Google Calendar Event ID storage implemented
- ✅ CI/CD YAML configuration added for server and UI deployment setup
- ✅ Email service configuration completed, business logic integration pending
- 🚧 Google Calendar event update synchronization
- 🚧 Google Calendar event deletion synchronization
- 🚧 Real-time comments system

---

# Installation

## 1. Clone the repository

```bash
git clone https://github.com/ravitharun/project-management-system.git
cd project-management-system
```

## 2. Backend setup

```bash
cd Server
npm install
npm start
```

## 3. Frontend setup

Open a new terminal:

```bash
cd Ui
npm install
npm start
```

---

# Roadmap

### Completed

- JWT Authentication
- Workspace Management
- Task Management
- Redis Caching
- Rate Limiting
- Socket.io Notifications
- Activity Logs
- Google OAuth Integration
- Google Calendar Task Creation
- CI/CD Configuration

### In Progress

- Google Calendar Update Sync
- Google Calendar Delete Sync
- Email Notifications
- Real-time Comments
- Analytics Dashboard

### Planned

- Sprint Management
- AI Task Suggestions
- Gantt Charts
- Team Chat
- Docker Deployment
- Microservices Architecture
- Advanced Reporting
- Two-way Google Calendar Synchronization

---

# Author

**Ravi Tharun**  
Full Stack MERN Developer

- Email: [tharunravi672@gmail.com](mailto:tharunravi672@gmail.com)
- Phone: +91 7396994383

---

# Support

If you like this project, consider giving it a ⭐ on GitHub.

New enterprise-level features, Google Calendar enhancements, AI-powered capabilities, and workflow improvements are actively being developed to make this project a production-ready Jira-inspired collaboration platform.
