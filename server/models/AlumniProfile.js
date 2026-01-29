const mongoose = require("mongoose");

const alumniProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    registerNumber: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
      enum: [
        "Computer Science and Engineering",
        "Electronics and Communication Engineering",
        "Electrical and Electronics Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Information Technology",
      ],
    },
    batchYear: {
      type: String,
      required: true,
    },
    currentCompany: String,
    designation: String,
    location: String,
    linkedinUrl: String,
    phone: String,
    skills: [String],
    bio: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AlumniProfile", alumniProfileSchema);