const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const helmet = require('helmet'); // Import helmet

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(helmet()); // Use helmet middleware

const cors = require("cors");

// Define allowed origins
const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000']; // Add your frontend origins here

// If you deploy a frontend, set FRONTEND_URL in your env (e.g. https://your-app.vercel.app)
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

if (process.env.NODE_ENV === 'production') {
  // For backwards compatibility / quick test, include the common production placeholder.
  // If you set FRONTEND_URL in production, this is not needed.
  allowedOrigins.push('https://yourproductionfrontend.com');
}

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // If you want to allow all origins (development/testing), set this env var.
    if (process.env.ALLOW_ALL_ORIGINS === 'true') {
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const alumniRoutes = require("./routes/alumniRoutes");

app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/carousel", require("./routes/carouselRoutes"));
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/alumni", alumniRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
