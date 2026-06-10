# Student Management Module (Full-Stack)

A professional Administration Panel for managing student records, built with a Python Django REST Framework backend and a React.js frontend.

# Demo Access (Live)

- **URL:** [https://student-management-system-three-eta.vercel.app](https://student-management-system-three-eta.vercel.app)
- **Username:** admin
- **Password:** admin123

# Tech Stack

- **Backend:** Python, Django REST Framework, PostgreSQL
- **Frontend:** React.js (Hooks, Axios, React Router)
- **Design:** Custom Monochromatic Blue Theme (Glassmorphism UI)
- **Deployment:** Render (Backend), Vercel (Frontend)

# Local Setup Instructions

## Backend Setup

1. Navigate to the backend directory:
   `cd backend/school_management_system`
2. Create and activate a virtual environment:
   `python -m venv venv`
   `venv\Scripts\activate` (Windows)
3. Install dependencies:
   `pip install -r requirements.txt`
4. Run migrations to setup PostgreSQL/SQLite:
   `python manage.py migrate`
5. Start the server:
   `python manage.py runserver`

## Frontend Setup

1. Navigate to the frontend directory:
   `cd frontend/student_management_module`
2. Install dependencies:
   `npm install`
3. Configure API URL:
   Ensure `src/api/axiosInstance.js` points to `http://127.0.0.1:8000/api/` for local use.
4. Start the application:
   `npm start`

# Features

- **Responsive Dashboard:** Real-time statistics and student overview.
- **Advanced CRUD:** Full student management with image upload and PATCH-based updates.
- **Admin Settings:** Ability to update Admin profile details, photos, and secure password hashing.
- **Data Integrity:** Backend validation for unique emails and strict data formatting.
