import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AdminApprovals from "./pages/AdminApprovals";
import AdminBulkUpload from "./pages/AdminBulkUpload";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AlumniProfile from "./pages/AlumniProfile";
import AlumniDirectory from "./pages/AlumniDirectory";
import AdminCarousel from "./pages/AdminCarousel";
import Events from "./pages/Events";
import Jobs from "./pages/Jobs";
import AdminCreateEvent from "./pages/AdminCreateEvent";
import PostJob from "./pages/PostJob";

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }
  
  if (requiredRole) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== requiredRole) {
        return <Navigate to="/dashboard" />;
      }
    } catch (err) {
      return <Navigate to="/" />;
    }
  }
  
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/approvals"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminApprovals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/bulk-upload"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminBulkUpload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alumni/profile"
          element={
            <ProtectedRoute>
              <AlumniProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alumni/directory"
          element={
            <ProtectedRoute>
              <AlumniDirectory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/carousel"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminCarousel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/events/create"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminCreateEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/post"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;