# Airport Issue Management Application

A full-stack web application for managing airport facility issues, featuring role-based dashboards, real-time updates, and an emergency SOS system.

## 🚀 Built With

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** (JWT Authentication)
- **Spring Data MongoDB**
- **Lombok**

### Frontend
- **React** (Vite)
- **TypeScript**
- **Tailwind CSS**
- **Axios** (With Interceptors)
- **React Router DOM**

---

## 🛠️ Prerequisites
- **Java JDK 17+**
- **Node.js 18+**
- **MongoDB** (Local instance running on `27017`)

---

## 📦 Installation & Setup

### 1. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Build and run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   *The server will start on `http://localhost:8080`*

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The app will be accessible at `http://localhost:5173`*

---

## 🔑 Default Login Credentials

The application seeds these users on startup:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@airport.com` | `password123` |
| **Staff** | `staff@airport.com` | `password123` |
| **Passenger** | `user@airport.com` | `password123` |

---

## ✨ Key Features

- **Role-Based Access Control (RBAC)**: Distinct dashboards for Passengers, Staff, and Admins.
- **Reporting System**: Passengers can report issues with Categories and Priority levels.
- **Kanban Workflow**: Staff can Acknowledge, Fix, and Resolve issues.
- **Emergency SOS**: Publicly accessible "Big Red Button" for critical emergencies.
- **Real-Time Updates**: Dashboards auto-refresh every 5 seconds to show the latest status.

## 📡 API Endpoints

- `POST /api/auth/login` - Authenticate user
- `POST /api/issues` - Report a new issue
- `POST /api/issues/sos` - Public emergency report
- `GET /api/issues` - Fetch issues (Filtered by role)
- `PUT /api/issues/{id}/status` - Update issue status (Staff/Admin)
