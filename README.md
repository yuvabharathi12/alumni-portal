# Alumni Portal

A full-stack web application connecting college alumni with current students, enabling networking, job opportunities, and event management.

**Institution:** C Abdul Hakeem College of Engineering & Technology (CAHCET)

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)

## ✨ Features

### For Users
- ✅ User registration and login
- ✅ Alumni profile management
- ✅ Browse alumni directory with search/filter
- ✅ Job posting and browsing
- ✅ Event management and registration
- ✅ JWT-based authentication
- ✅ Role-based access control

### For Admins
- ✅ Approve/block pending users
- ✅ **Bulk upload users via CSV** (NEW)
- ✅ Manage carousel banner images
- ✅ Create and manage events
- ✅ View analytics and user data

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router v7** - Client-side routing
- **Axios** - HTTP client
- **JWT-decode** - Token parsing

### Backend
- **Node.js + Express 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **JWT** - Authentication tokens
- **Multer** - File uploads
- **CORS** - Cross-origin requests

## 📁 Project Structure

```
alumni-portal/
├── client/                 # React frontend
│   ├── public/
│   │   ├── index.html     # HTML entry point
│   │   └── ...
│   └── src/
│       ├── pages/         # Page components
│       │   ├── Login.js
│       │   ├── Dashboard.js
│       │   ├── AdminBulkUpload.js (NEW)
│       │   ├── AlumniDirectory.js
│       │   ├── AdminApprovals.js
│       │   └── ...
│       ├── components/    # Reusable components
│       ├── services/      # API service
│       ├── styles/        # Theme and styling
│       ├── App.js         # Main routing
│       └── index.js       # React entry point
│
├── server/                # Express backend
│   ├── models/            # MongoDB schemas
│   │   ├── User.js
│   │   ├── AlumniProfile.js
│   │   ├── Event.js
│   │   ├── Job.js
│   │   └── CarouselImage.js
│   ├── controllers/       # Business logic
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth & permissions
│   ├── config/            # Database config
│   ├── server.js          # Entry point
│   ├── .env               # Environment variables
│   └── .gitignore         # Git ignore rules
│
└── PROJECT_DOCUMENTATION.html  # Full documentation
```

## 🚀 Installation

### Prerequisites
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (Local or Atlas) - [Setup Guide](https://www.mongodb.com/docs/manual/installation/)
- **Git** - [Download](https://git-scm.com/)

### Clone Repository
```bash
git clone <your-repo-url>
cd alumni-portal
```

## ⚙️ Setup

### 1. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file
# Add these variables:
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/alumni-portal
JWT_SECRET=your_super_secret_key_here_change_this
PORT=5000
NODE_ENV=development
```

**Important:** Never commit the `.env` file to git. It's added to `.gitignore`.

### 2. Frontend Setup

```bash
cd ../client

# Install dependencies
npm install
```

## ▶️ Running the Application

### Start Backend Server
```bash
cd server
npm start
# Or for development with auto-reload:
npm run dev
```
Backend runs on: `http://localhost:5000`

### Start Frontend App (in new terminal)
```bash
cd client
npm start
```
Frontend runs on: `http://localhost:3000`

## 🔐 User Roles & Access

| Role | Features |
|------|----------|
| **Admin** | Approve users, Bulk upload, Manage carousel, Create events |
| **Alumni** | Edit profile, Browse directory, Post jobs, Register events |
| **Student** | Browse alumni, Apply jobs, Register events |

## 📊 API Documentation

### Authentication
```
POST /api/auth/register          - Register new user
POST /api/auth/login             - User login
```

### Admin Routes
```
GET  /api/admin/pending-users    - Get pending approvals
PUT  /api/admin/approve/:id      - Approve user
PUT  /api/admin/block/:id        - Block user
POST /api/admin/bulk-upload      - Upload users via CSV (NEW)
```

### Alumni Routes
```
GET  /api/alumni/profiles        - Get all alumni directory
GET  /api/alumni/profile/me      - Get own profile
POST /api/alumni/profile         - Create/update profile
GET  /api/alumni/profile/:id     - Get specific profile
```

### Jobs Routes
```
GET  /api/jobs/list              - Get all jobs
POST /api/jobs/post              - Post new job
DELETE /api/jobs/:id             - Delete job
```

### Events Routes
```
GET  /api/events/list            - Get all events
POST /api/events/create          - Create event
DELETE /api/events/:id           - Delete event
```

### Carousel Routes
```
GET  /api/carousel/images        - Get banner images
POST /api/carousel/upload        - Upload image
DELETE /api/carousel/:id         - Delete image
```

## 📦 Bulk Upload Feature (NEW)

### How to Use
1. Login as Admin
2. Go to Dashboard → "Bulk Upload Users"
3. Download CSV template
4. Fill in user details (name, email, password, role)
5. Upload CSV file
6. Review preview
7. Click "Upload Users"

### CSV Format
```csv
name,email,password,role
John Doe,john@example.com,password123,alumni
Jane Smith,jane@example.com,password456,alumni
Ahmed Khan,ahmed@example.com,pass789,student
```

## 🗄️ Database Schema

### User
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  role: String (enum: ["admin", "alumni", "student"], default: "alumni"),
  status: String (enum: ["pending", "approved", "blocked"], default: "pending"),
  createdAt: Date,
  updatedAt: Date
}
```

### AlumniProfile
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  registerNumber: String (unique, required),
  department: String,
  batchYear: String,
  currentCompany: String,
  designation: String,
  location: String,
  linkedinUrl: String,
  phone: String,
  skills: [String],
  bio: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Development

### Test Data
```bash
cd server

# Seed admin user
node seedAdmin.js

# Seed alumni profiles
node seedAlumni.js
```

### Default Admin Credentials
```
Email: admin@cahcet.com
Password: admin123
```

## 📝 Environment Variables

Create `.env` file in server folder:

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/alumni-portal

# JWT Secret (use a strong random string)
JWT_SECRET=change_this_to_a_strong_secret_key_12345

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ Role-based access control (RBAC)
- ✅ User status verification (pending/approved/blocked)
- ✅ Environment variables for secrets
- ✅ Middleware authentication checks
- ✅ CORS configuration

## 📚 Documentation

See `PROJECT_DOCUMENTATION.html` for complete architecture and file explanations.

To view:
1. Open `PROJECT_DOCUMENTATION.html` in browser
2. Press Ctrl+P to print as PDF
3. Select "Save as PDF"

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check `MONGO_URI` in `.env` file
- Ensure MongoDB is running
- Verify database credentials

### Port Already in Use
```bash
# Change PORT in .env to 5001 or another available port
# Or kill process using port 5000:
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

### CORS Errors
- Ensure backend and frontend are running on correct ports
- Check CORS configuration in `server.js`

### JWT Token Errors
- Clear localStorage in browser (Dev Tools → Application → Clear)
- Login again to get new token

## 📞 Support

For issues or questions:
1. Check the documentation
2. Review API endpoints
3. Verify environment setup
4. Check browser console for errors

## 📄 License

This project is created for CAHCET Alumni Portal.

## 👥 Contributors

- Development Team
- CAHCET Administration

---

**Last Updated:** January 29, 2026
