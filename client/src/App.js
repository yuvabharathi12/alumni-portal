import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import PublicDashboard from "./pages/PublicDashboard";
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
import ManageUsers from "./pages/ManageUsers";

import Footer from "./components/Footer";


// =============================
// Protected Route Component
// =============================
function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");

  // Not logged in → go to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Role-based protection
  if (requiredRole) {
    try {
      const decoded = jwtDecode(token);

      if (decoded.role !== requiredRole) {
        return <Navigate to="/dashboard" />;
      }
    } catch (err) {
      return <Navigate to="/login" />;
    }
  }

  return children;
}


// =============================
// Layout Wrapper
// Hides footer on login/register
// =============================
function Layout({ children }) {
  const location = useLocation();

  const hideFooterRoutes = ["/login", "/register"];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      {children}
      {!shouldHideFooter && <Footer />}
    </>
  );
}


// =============================
// Main App Component
// =============================
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          {/* Public landing page */}
          <Route path="/" element={<PublicDashboard />} />

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
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
            path="/admin/carousel"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminCarousel />
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
            path="/admin/users"
            element={
              <ProtectedRoute requiredRole="admin">
                <ManageUsers />
              </ProtectedRoute>
            }
          />

          {/* Alumni Routes */}
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

          {/* Common Routes */}
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
            path="/jobs/post"
            element={
              <ProtectedRoute>
                <PostJob />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
