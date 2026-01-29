const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");
const AlumniProfile = require("./models/AlumniProfile");

dotenv.config();

const alumniData = [
  {
    user: {
      name: "Rajesh Kumar",
      email: "rajesh@alumni.com",
      password: "Alumni@123",
      role: "alumni",
      status: "approved"
    },
    profile: {
      registerNumber: "CS2018001",
      department: "Computer Science",
      batchYear: "2018",
      currentCompany: "Amazon",
      designation: "Senior Software Engineer",
      location: "Bangalore",
      linkedinUrl: "https://linkedin.com/in/rajeshkumar",
      bio: "Cloud computing enthusiast. Love solving complex problems.",
      phone: "9876543211",
      skills: ["Java", "AWS", "Python", "Kubernetes"]
    }
  },
  {
    user: {
      name: "Priya Sharma",
      email: "priya@alumni.com",
      password: "Alumni@123",
      role: "alumni",
      status: "approved"
    },
    profile: {
      registerNumber: "EC2019045",
      department: "Electronics & Communication",
      batchYear: "2019",
      currentCompany: "Intel",
      designation: "Hardware Engineer",
      location: "Hyderabad",
      linkedinUrl: "https://linkedin.com/in/priyasharma",
      bio: "Passionate about embedded systems and IoT.",
      phone: "9876543212",
      skills: ["Embedded C", "VLSI", "IoT", "Circuit Design"]
    }
  },
  {
    user: {
      name: "Arjun Reddy",
      email: "arjun@alumni.com",
      password: "Alumni@123",
      role: "alumni",
      status: "approved"
    },
    profile: {
      registerNumber: "ME2020112",
      department: "Mechanical Engineering",
      batchYear: "2020",
      currentCompany: "Tata Motors",
      designation: "Design Engineer",
      location: "Pune",
      linkedinUrl: "https://linkedin.com/in/arjunreddy",
      bio: "Automobile design and manufacturing expert.",
      phone: "9876543213",
      skills: ["CAD", "AutoCAD", "SolidWorks", "Manufacturing"]
    }
  },
  {
    user: {
      name: "Sneha Patel",
      email: "sneha@alumni.com",
      password: "Alumni@123",
      role: "alumni",
      status: "approved"
    },
    profile: {
      registerNumber: "CS2021089",
      department: "Computer Science",
      batchYear: "2021",
      currentCompany: "Flipkart",
      designation: "Frontend Developer",
      location: "Bangalore",
      linkedinUrl: "https://linkedin.com/in/snehapatel",
      bio: "UI/UX and frontend development specialist.",
      phone: "9876543214",
      skills: ["React", "JavaScript", "CSS", "Figma"]
    }
  },
  {
    user: {
      name: "Vikram Singh",
      email: "vikram@alumni.com",
      password: "Alumni@123",
      role: "alumni",
      status: "approved"
    },
    profile: {
      registerNumber: "CV2019067",
      department: "Civil Engineering",
      batchYear: "2019",
      currentCompany: "L&T Construction",
      designation: "Project Manager",
      location: "Mumbai",
      linkedinUrl: "https://linkedin.com/in/vikramsingh",
      bio: "Infrastructure and construction project management.",
      phone: "9876543215",
      skills: ["Project Management", "AutoCAD", "Structural Design", "Construction"]
    }
  }
];

const seedAlumni = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Clear existing data (optional - remove if you want to keep existing)
    // await User.deleteMany({ role: "alumni" });
    // await AlumniProfile.deleteMany({});

    for (const data of alumniData) {
      // Create user
      const hashedPassword = await bcrypt.hash(data.user.password, 10);
      const user = await User.create({
        ...data.user,
        password: hashedPassword
      });

      // Create profile
      await AlumniProfile.create({
        ...data.profile,
        userId: user._id
      });

      console.log(`✓ Created: ${user.name}`);
    }

    console.log("\n✅ All alumni created successfully!");
    process.exit();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
};

seedAlumni();