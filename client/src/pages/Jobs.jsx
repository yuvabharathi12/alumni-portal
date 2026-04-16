import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageBanner from "../components/PageBanner";
import api from "../services/api";
import Button from "../components/Button";
import styles from "./Page.module.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const role = token ? jwtDecode(token).role : null;
  const [modalJob, setModalJob] = useState(null);

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true); setError(null);
      const res = await api.get("/jobs");
      setJobs(res.data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load jobs");
      setJobs([]);
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;
    try {
      await api.delete(`/jobs/${id}`);
      alert("Job deleted successfully");
      fetchJobs();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete job");
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <PageBanner title="Job Opportunities" subtitle="Browse open positions and career paths" />

      <div className={styles.content}>
        {(role === "alumni" || role === "admin") && (
          <div className={styles.actionBar}>
            <Link to="/jobs/post" className={styles.actionBarLink}>
              <Button variant="primary">+ Post Job</Button>
            </Link>
          </div>
        )}

        {loading && <p className={styles.loadingText}>Loading jobs...</p>}
        {error && <p className={styles.errorText}>{error}</p>}

        <div className={styles.gridWide}>
          {jobs.map(job => (
            <div key={job._id} className={styles.card} onClick={() => setModalJob(job)}>
              <div>
                <h3 className={styles.cardTitle}>{job.title}</h3>
                <p className={styles.cardCompany}>🏢 {job.company}</p>
                <p className={styles.cardText}>{job.description}</p>
              </div>
              <div className={styles.cardDate}>
                Posted on {new Date(job.createdAt).toDateString()}
              </div>
            </div>
          ))}
          {!loading && jobs.length === 0 && <p className={styles.emptyText}>No job postings yet.</p>}
        </div>

        {modalJob && (
          <div className="modal-overlay" onClick={() => setModalJob(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setModalJob(null)}>✕</button>
              <h2 style={{ marginTop: 0 }}>{modalJob.title}</h2>
              <p>{modalJob.description}</p>
              <div className={styles.modalMeta}>
                <div>🏢 {modalJob.company}</div>
                <div>📅 Posted on {new Date(modalJob.createdAt).toLocaleString()}</div>
              </div>
              <div className={styles.modalActions}>
                {role === 'admin' && (
                  <Button variant="danger" onClick={async () => { await handleDelete(modalJob._id); setModalJob(null); }}>
                    Delete Job
                  </Button>
                )}
                <Button onClick={() => setModalJob(null)}>Close</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;