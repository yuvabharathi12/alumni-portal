# 🚀 Alumni Portal

## Connecting Alumni, Fostering Opportunities

The Alumni Portal is a full-stack web application designed to bridge the gap between college alumni and current students at C Abdul Hakeem College of Engineering & Technology (CAHCET). It facilitates networking, streamlines job opportunities, and simplifies event management within the academic community.

---

## ✨ Key Features

### For All Users
- **User Authentication:** Secure registration, login, and robust JWT-based authentication.
- **Profile Management:** Comprehensive alumni profiles with editable details.
- **Directory & Search:** Browse and search the alumni directory with advanced filters.
- **Job Board:** Post and apply for jobs relevant to the CAHCET community.
- **Event Management:** Discover, register for, and manage college events.
- **Role-Based Access Control:** Tailored experiences and permissions for Admins, Alumni, and Students.

### Exclusive Admin Capabilities
- **User Approval System:** Efficiently approve or block pending user registrations.
- **Bulk User Upload:** Seamlessly onboard multiple users via CSV file uploads.
- **Carousel Management:** Dynamically update and manage homepage banner images.
- **Event Creation:** Organize and publish new events for the community.
- **User Management & Analytics:** Oversee user data and gain insights into platform activity.

---

## 🛠️ Tech Stack

This project leverages a modern MERN stack with additional powerful libraries:

### Frontend
- **React 19:** Building dynamic and responsive user interfaces.
- **React Router v7:** Declarative routing for seamless navigation.
- **Axios:** Promise-based HTTP client for API interactions.
- **JWT-decode:** Client-side decoding of JWT tokens.
- **Styling:** Custom CSS, including dedicated modules for components (e.g., `Public.module.css`).

### Backend
- **Node.js + Express 5:** Fast, unopinionated, minimalist web framework.
- **MongoDB:** Flexible NoSQL database for scalable data storage.
- **Mongoose:** Elegant MongoDB object modeling for Node.js.
- **bcryptjs:** Secure password hashing for user authentication.
- **JSON Web Token (JWT):** Compact, URL-safe means of representing claims between two parties.
- **Multer:** Middleware for handling `multipart/form-data`, primarily for file uploads.
- **CORS:** Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

---

## 📁 Project Structure

```
alumni-portal/
├── client/                 # React Frontend Application
│   ├── public/             # Public assets (index.html, manifest, favicons)
│   └── src/                # React source code
│       ├── pages/          # Individual page components (Login, Dashboard, Admin, etc.)
│       ├── components/     # Reusable UI components (Buttons, Cards, Navbar, etc.)
│       ├── services/       # API interaction logic
│       ├── styles/         # Global styles and theme definitions
│       ├── assets/         # Static images and icons
│       ├── App.js          # Main application component and routing setup
│       └── index.js        # React app entry point
│
├── server/                 # Express.js Backend API
│   ├── models/             # Mongoose schemas for MongoDB collections
│   ├── controllers/        # Business logic for API endpoints
│   ├── routes/             # API endpoint definitions and routing
│   ├── middleware/         # Authentication, authorization, and error handling middleware
│   ├── config/             # Database connection configuration
│   ├── utils/              # Helper functions (email service, OTP generation)
│   ├── server.js           # Main server entry point
│   ├── .env.example        # Example environment variables (DO NOT COMMIT .env)
│   └── seedAdmin.js        # Script to seed initial admin user
│
└── README.md               # Project overview and documentation
```

---

## 🚀 Getting Started

Follow these steps to set up and run the Alumni Portal locally.

### Prerequisites
- **Node.js:** v16 or higher ([Download Node.js](https://nodejs.org/en/download/))
- **MongoDB:** Local installation or a cloud service like MongoDB Atlas ([MongoDB Installation Guide](https://www.mongodb.com/docs/manual/installation/))
- **Git:** Version control system ([Download Git](https://git-scm.com/downloads))

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd alumni-portal
```

### 2. Backend Setup (`server/`)

```bash
cd server

# Install backend dependencies
npm install

# Create a .env file based on .env.example
cp .env.example .env

# Edit the .env file and add your configuration:
# MONGO_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/alumni-portal?retryWrites=true&w=majority"
# JWT_SECRET="your_strong_jwt_secret_key_here"
# PORT=5000
# NODE_ENV=development
# EMAIL_USER="your_email@example.com" # For OTP and password reset emails
# EMAIL_PASS="your_email_password"    # Or app-specific password
```
**Important:** Do not commit your `.env` file to version control. It's already included in `.gitignore`.

### 3. Frontend Setup (`client/`)

```bash
cd ../client

# Install frontend dependencies
npm install
```

---

## ▶️ Running the Application

Ensure both the backend and frontend are running simultaneously.

### Start Backend
Open a new terminal, navigate to the `server/` directory, and run:
```bash
cd server
npm start
# For development with live-reloading:
# npm run dev
```
The backend API will be accessible at: `http://localhost:5000`

### Start Frontend
Open another new terminal, navigate to the `client/` directory, and run:
```bash
cd client
npm start
```
The React application will open in your browser, typically at: `http://localhost:3000`

---

## 🔐 Admin Access & Development Seeding

### Default Admin Credentials
For quick testing and development, an admin user can be seeded:
- **Email:** `admin@cahcet.com`
- **Password:** `admin123`

### Seed Development Data
To populate your local database with an initial admin user and some alumni profiles:
```bash
# From the project root:
cd server
node seedAdmin.js
node seedAlumni.js
```

---

## 📈 API Documentation (Key Endpoints)

A brief overview of key API endpoints. For comprehensive documentation, refer to the source code and Postman collection (if available).

### Authentication & User Management
- `POST /api/auth/register`: Create a new user account.
- `POST /api/auth/login`: Authenticate user and receive JWT.
- `POST /api/auth/send-otp`: Send OTP for email verification.
- `POST /api/auth/verify-otp`: Verify OTP for registration.
- `POST /api/auth/forgot-password`: Initiate password reset.
- `POST /api/auth/reset-password/:token`: Complete password reset.

### Admin Operations (Requires Admin Role)
- `GET /api/admin/pending-users`: Retrieve users awaiting approval.
- `PUT /api/admin/approve/:id`: Approve a user by ID.
- `PUT /api/admin/block/:id`: Block a user by ID.
- `POST /api/admin/bulk-upload`: Upload multiple users via CSV.

### Alumni Profiles
- `GET /api/alumni/profiles`: Get all alumni profiles (searchable/filterable).
- `GET /api/alumni/profile/me`: Get the authenticated user's profile.
- `POST /api/alumni/profile`: Create or update the authenticated user's profile.
- `GET /api/alumni/profile/:id`: Get a specific alumni profile by ID.

### Job Listings
- `GET /api/jobs/list`: Retrieve all job postings.
- `POST /api/jobs/post`: Create a new job posting.
- `DELETE /api/jobs/:id`: Delete a job posting by ID.

### Events
- `GET /api/events/list`: Retrieve all events.
- `POST /api/events/create`: Create a new event.
- `DELETE /api/events/:id`: Delete an event by ID.

### Carousel Images
- `GET /api/carousel/images`: Get all carousel images.
- `POST /api/carousel/upload`: Upload a new carousel image.
- `DELETE /api/carousel/:id`: Delete a carousel image by ID.

---

## 🗄️ Database Schema Overview

### User Model
```javascript
// Represents a user, their authentication details, and role.
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

### AlumniProfile Model
```javascript
// Stores detailed alumni information, linked to a User.
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required, unique), // Link to User model
  registerNumber: String (unique, required),
  department: String,
  batchYear: String,
  currentCompany: String,
  designation: String,
  location: String,
  linkedinUrl: String,
  phone: String,
  skills: [String], // Array of skills
  bio: String,
  profilePicture: String, // URL to profile picture (NEW)
  createdAt: Date,
  updatedAt: Date
}
```

### Job Model
```javascript
// Details of job postings.
{
  _id: ObjectId,
  postedBy: ObjectId (ref: 'User'), // User who posted the job
  title: String (required),
  company: String (required),
  location: String,
  description: String (required),
  requirements: [String],
  salary: String,
  applicationLink: String,
  jobType: String, // e.g., "Full-time", "Part-time"
  createdAt: Date,
  updatedAt: Date
}
```

### Event Model
```javascript
// Details of college events.
{
  _id: ObjectId,
  createdBy: ObjectId (ref: 'User'), // User who created the event
  title: String (required),
  description: String (required),
  date: Date (required),
  location: String (required),
  organizer: String,
  imageUrl: String,
  registrationLink: String,
  attendees: [ObjectId], // Array of User IDs attending (NEW)
  createdAt: Date,
  updatedAt: Date
}
```

### CarouselImage Model
```javascript
// Stores information about homepage carousel images.
{
  _id: ObjectId,
  imageUrl: String (required),
  caption: String,
  link: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🐛 Troubleshooting & Support

### Common Issues
- **MongoDB Connection Errors:** Verify `MONGO_URI` in `.env`, ensure MongoDB service is running.
- **Port Conflicts:** If `PORT` 5000 (backend) or 3000 (frontend) is in use, change it in `.env` (backend) or `client/package.json` (frontend, start script).
- **CORS Issues:** Double-check CORS configuration in `server/server.js` if frontend requests are blocked.
- **JWT Errors:** Clear browser local storage and re-login if token issues persist.

### Need Help?
1. Review this `README.md` and the existing codebase.
2. Check your browser's developer console and server terminal for error messages.
3. Consult the `PROJECT_DOCUMENTATION.html` for detailed architecture.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any features, bug fixes, or improvements.

## 📄 License

This project is developed for the C Abdul Hakeem College of Engineering & Technology (CAHCET) Alumni Portal.

## 👥 Contributors

- The CAHCET Alumni Portal Development Team
- CAHCET Administration & Faculty

---

**Last Updated:** February 11, 2026
