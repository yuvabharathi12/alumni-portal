const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "alumni", "student"],
      default: "alumni",
    },
    status: {  // ✅ MUST BE "status"
      type: String,
      enum: ["pending", "approved", "blocked"],
      default: "pending",
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);