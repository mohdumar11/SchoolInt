# SchoolInt
 
#  School Management System (Spring Boot + React)

This is a **full-stack school management system** built with **Spring Boot** for the backend and **React** for the frontend. The system includes authentication, student-teacher management, and role-based access.

##  Features
- **User Authentication** (Login with Email & Password)
- **Role-Based Access Control** (STUDENT, TEACHER, PRINCIPAL)
- **Manage Students & Teachers**
- **Principal Access** (View all students & teachers)
- **RESTful API Endpoints** for easy integration

---

## 🛠 Tech Stack
- **Backend:** Java Spring Boot, Hibernate, Spring Security, JPA
- **Frontend:** React,  CSS
- **Database:** In-memory Database
- **Build Tools:** Maven

---

## 📌 API Endpoints

### **Auth APIs**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/api/students/login` | Login a user |

### **Student APIs**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/api/students/user/{userId}` | Get student details by userId |
| `GET` | `/api/students/user/{userId}/teacher-name` | Get the student's class teacher name |
| `GET` | `/api/students/teacher/user/{userId}/students` | Get students under a specific teacher |

### **Principal API**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/api/students/principal/{userId}/all-users` | Get all students & teachers (Only for PRINCIPAL role) | Building...

---

## Setup Guide

### **1️⃣ Clone the repository**
```bash
git clone https://github.com/your-username/school-management.git
cd school-management

