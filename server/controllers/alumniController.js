const AlumniProfile = require("../models/AlumniProfile");
const User = require("../models/User");

// Create or Update Profile
exports.createOrUpdateProfile = async (req, res) => {
  try {
    const {
      registerNumber,
      department,
      batchYear,
      currentCompany,
      designation,
      location,
      linkedinUrl,
      phone,
      skills,
      bio,
    } = req.body;

    // Check if profile exists
    let profile = await AlumniProfile.findOne({ userId: req.user.id });

    if (profile) {
      // Update existing profile
      profile = await AlumniProfile.findOneAndUpdate(
        { userId: req.user.id },
        {
          registerNumber,
          department,
          batchYear,
          currentCompany,
          designation,
          location,
          linkedinUrl,
          phone,
          skills,
          bio,
        },
        { new: true }
      );
      return res.json({ message: "Profile updated", profile });
    }

    // Create new profile
    profile = new AlumniProfile({
      userId: req.user.id,
      registerNumber,
      department,
      batchYear,
      currentCompany,
      designation,
      location,
      linkedinUrl,
      phone,
      skills,
      bio,
    });

    await profile.save();
    res.status(201).json({ message: "Profile created", profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Own Profile
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await AlumniProfile.findOne({
      userId: req.user.id,
    }).populate("userId", "name email");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Alumni Profiles (Directory)
exports.getAllProfiles = async (req, res) => {
  try {
    const { department, batchYear, company, search } = req.query;

    // Get all approved alumni users
    const users = await User.find({ 
      status: "approved", 
      role: "alumni" 
    }).select("_id name email");

    // Get all profiles with optional filters
    let profileQuery = {};
    if (department) profileQuery.department = department;
    if (batchYear) profileQuery.batchYear = batchYear;
    if (company) profileQuery.currentCompany = { $regex: company, $options: "i" };

    const profiles = await AlumniProfile.find(profileQuery)
      .populate("userId", "name email")
      .select("-__v")
      .limit(50);

    // Create a map of userId to profile for quick lookup
    const profileMap = {};
    profiles.forEach(profile => {
      profileMap[profile.userId._id] = profile;
    });

    // Combine users and profiles - show all users with their profile if it exists
    const result = users.map(user => {
      const profile = profileMap[user._id];
      if (profile) {
        return profile; // Return full profile with populated user data
      } else {
        // Return user data in profile format for consistency
        return {
          _id: user._id,
          userId: {
            _id: user._id,
            name: user.name,
            email: user.email
          },
          registerNumber: "",
          department: "",
          batchYear: "",
          currentCompany: "",
          designation: "",
          location: "",
          linkedinUrl: "",
          phone: "",
          skills: [],
          bio: ""
        };
      }
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Single Profile by ID
exports.getProfileById = async (req, res) => {
  try {
    const profile = await AlumniProfile.findById(req.params.id).populate(
      "userId",
      "name email"
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};