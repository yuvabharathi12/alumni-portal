import { useState, useEffect } from "react";
import "../styles/global.css";
import axios from "axios";
import Navbar from "../components/Navbar";
import PageBanner from "../components/PageBanner";
import Button from "../components/Button";

function AlumniProfile() {
  const [profile, setProfile] = useState({
    registerNumber: "",
    department: "",
    batchYear: "",
    currentCompany: "",
    designation: "",
    location: "",
    linkedinUrl: "",
    phone: "",
    skills: "",
    bio: "",
  });
  const [message, setMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/alumni/profile/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile({
        ...res.data,
        skills: res.data.skills?.join(", ") || "",
      });
      setIsEdit(true);
    } catch (err) {
      // Profile doesn't exist yet
      setIsEdit(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...profile,
        skills: profile.skills.split(",").map((s) => s.trim()),
      };

      const method = isEdit ? "put" : "post";
      const res = await axios[method](
        "http://localhost:5000/api/alumni/profile",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message);
      setIsEdit(true);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to save profile");
    }
  };

  return (
    <div>
      <Navbar />
      <PageBanner title="My Profile" subtitle="Manage your profile information" />
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>

        <label>Register Number *</label>
        <input
          type="text"
          name="registerNumber"
          value={profile.registerNumber}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          placeholder="e.g., CS2020001"
        />

        <label>Department *</label>
        <select
          name="department"
          value={profile.department}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        >
          <option value="">Select Department</option>
          <option value="Computer Science and Engineering">
            Computer Science and Engineering
          </option>
          <option value="Electronics and Communication Engineering">
            Electronics and Communication Engineering
          </option>
          <option value="Electrical and Electronics Engineering">
            Electrical and Electronics Engineering
          </option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Information Technology">Information Technology</option>
        </select>

        <label>Batch Year *</label>
        <input
          type="text"
          name="batchYear"
          value={profile.batchYear}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          placeholder="e.g., 2020"
        />

        <label>Current Company</label>
        <input
          type="text"
          name="currentCompany"
          value={profile.currentCompany}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          placeholder="e.g., Google"
        />

        <label>Designation</label>
        <input
          type="text"
          name="designation"
          value={profile.designation}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          placeholder="e.g., Software Engineer"
        />

        <label>Location</label>
        <input
          type="text"
          name="location"
          value={profile.location}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          placeholder="e.g., Bangalore"
        />

        <label>LinkedIn URL</label>
        <input
          type="text"
          name="linkedinUrl"
          value={profile.linkedinUrl}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          placeholder="https://linkedin.com/in/yourname"
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          placeholder="e.g., 9876543210"
        />

        <label>Skills (comma-separated)</label>
        <input
          type="text"
          name="skills"
          value={profile.skills}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          placeholder="e.g., JavaScript, React, Node.js"
        />

        <label>Bio</label>
        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          rows="4"
          placeholder="Tell us about yourself..."
        />

        <Button
          onClick={handleSubmit}
          fullWidth
          style={{ marginTop: "10px" }}
        >
          {isEdit ? "Update Profile" : "Create Profile"}
        </Button>

        {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}
      </div>
    </div>
  );
}

export default AlumniProfile;