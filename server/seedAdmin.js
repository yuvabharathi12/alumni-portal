const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const existing = await User.findOne({ email: "admin@college.com" });
    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashed = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "Super Admin",
      email: "admin@college.com",
      password: hashed,
      role: "admin",
      status: "approved",
    });

    console.log("Admin created");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
