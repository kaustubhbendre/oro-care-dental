// src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllAppointments, updateAppointmentStatus, isSupabaseConfigured } from '../lib/supabase';
import toast from 'react-hot-toast';
import { RefreshCw, CheckCircle, XCircle, CheckSquare, Phone, Mail } from 'lucide-react';

const STATUS_COLORS = {
  pending: { bg: '#fff8e8', color: '#c9a84c', label: 'Pending' },
  confirmed: { bg: '#e8f5fe', color: '#0a4a6e', label: 'Confirmed' },
  completed: { bg: '#f0fdf4', color: '#38a169', label: 'Completed' },
  cancelled: { bg: '#fff0f0', color: '#e53e3e', label: 'Cancelled' },
};

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const fetchData = async () => {
    if (!isSupabaseConfigured) {
      toast.error('Database not configured. Please set up Supabase in .env file.');
      return;
    }

    setLoading(true);
    try {
      const data = await getAllAppointments();
      setAppointments(data || []);
    } catch (err) {
      toast.error('Failed to load appointments. Check Supabase config.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (!isSupabaseConfigured) {
    return (
      <div className="admin-page">
        <div className="admin-header">
          <div className="container admin-header-inner">
            <div>
              <h1 className="admin-title">🦷 Oro-Care Admin</h1>
              <p className="admin-sub">Appointment Management Dashboard</p>
            </div>
          </div>
        </div>
        <div className="container admin-body">
          <div className="empty-state">
            <span>⚙️</span>
            <p>Database Not Configured</p>
            <small>Please set up Supabase in your <code>.env</code> file to use the admin dashboard.</small>
            <ul className="admin-help-list">
              <li>Copy <code>.env.example</code> to <code>.env</code></li>
              <li>Add <code>REACT_APP_SUPABASE_URL</code> and <code>REACT_APP_SUPABASE_ANON_KEY</code></li>
              <li>Deploy again on Vercel with the same variables</li>
            </ul>
            <a href="https://supabase.com" target="_blank" rel="noreferrer" className="btn-primary" style={{ marginTop: '16px' }}>Go to Supabase</a>
          </div>
        </div>
      </div>
    );
  }

  const handleStatusChange = async (id, newStatus) => {
    if (!isSupabaseConfigured) {
      toast.error('Database not configured. Please set up Supabase in .env file.');
      return;
    }

    try {
      await updateAppointmentStatus(id, newStatus);
      setAppointments(prev =>
        prev.map(a => a.id === id ? { ...a, status: newStatus } : a)
      );
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const filtered = appointments.filter(a => {
    const statusMatch = filter === 'all' || a.status === filter;
    const dateMatch = !dateFilter || a.date === dateFilter;
    return statusMatch && dateMatch;
  });

  const counts = appointments.length > 0 ? {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
  } : { total: 0, pending: 0, confirmed: 0, completed: 0 };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <div className="container admin-header-inner">
          <div>
            <h1 className="admin-title">🦷 Oro-Care Admin</h1>
            <p className="admin-sub">Appointment Management Dashboard</p>
          </div>
          <button className="btn-outline refresh-btn" onClick={fetchData} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      <div className="container admin-body">
        {/* Stats */}
        <div className="admin-stats">
          {[
            { label: 'Total', val: counts.total, icon: '📋', color: 'var(--ocean)' },
            { label: 'Pending', val: counts.pending, icon: '⏳', color: '#c9a84c' },
            { label: 'Confirmed', val: counts.confirmed, icon: '✅', color: 'var(--teal)' },
            { label: 'Completed', val: counts.completed, icon: '🎉', color: '#38a169' },
          ].map((s) => (
            <div className="admin-stat" key={s.label}>
              <span className="admin-stat-icon">{s.icon}</span>
              <div>
                <p className="admin-stat-num" style={{ color: s.color }}>{s.val}</p>
                <p className="admin-stat-label">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="admin-filters">
          <div className="filter-tabs">
            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(f => (
              <button
                key={f}
                className={`filter-tab ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <input
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="date-filter-input"
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="loading-state">
            <div className="big-spinner" />
            <p>Loading appointments...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <span>📅</span>
            <p>No appointments found</p>
            <small>Appointments will appear here once patients book online.</small>
          </div>
        ) : (
          <div className="appt-table-wrap">
            <table className="appt-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Contact</th>
                  <th>Service</th>
                  <th>Date & Time</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((appt, i) => (
                  <motion.tr
                    key={appt.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="appt-row"
                  >
                    <td>
                      <div className="patient-cell">
                        <div className="patient-avatar">
                          {appt.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <span>{appt.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="contact-cell">
                        <a href={`tel:${appt.phone}`} className="cell-link">
                          <Phone size={14} /> {appt.phone}
                        </a>
                        {appt.email && (
                          <a href={`mailto:${appt.email}`} className="cell-link">
                            <Mail size={14} /> {appt.email}
                          </a>
                        )}
                      </div>
                    </td>
                    <td><span className="service-tag">{appt.service}</span></td>
                    <td>
                      <div className="date-cell">
                        <span>{new Date(appt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span className="time-slot">{appt.time_slot}</span>
                      </div>
                    </td>
                    <td>
                      <p className="message-cell">{appt.message || '—'}</p>
                    </td>
                    <td>
                      <span
                        className="status-badge"
                        style={{
                          background: STATUS_COLORS[appt.status]?.bg,
                          color: STATUS_COLORS[appt.status]?.color
                        }}
                      >
                        {STATUS_COLORS[appt.status]?.label}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        {appt.status === 'pending' && (
                          <button
                            className="action-btn confirm"
                            onClick={() => handleStatusChange(appt.id, 'confirmed')}
                            title="Confirm"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        {appt.status === 'confirmed' && (
                          <button
                            className="action-btn complete"
                            onClick={() => handleStatusChange(appt.id, 'completed')}
                            title="Mark Complete"
                          >
                            <CheckSquare size={16} />
                          </button>
                        )}
                        {(appt.status === 'pending' || appt.status === 'confirmed') && (
                          <button
                            className="action-btn cancel"
                            onClick={() => handleStatusChange(appt.id, 'cancelled')}
                            title="Cancel"
                          >
                            <XCircle size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        .admin-page {
          min-height: 100vh;
          background: #f0f4f8;
          font-family: var(--font-body);
        }
        .admin-header {
          background: linear-gradient(135deg, var(--ocean-dark), var(--ocean));
          padding: 24px 0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: var(--shadow-md);
        }
        .admin-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .admin-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: var(--white);
          font-weight: 700;
        }
        .admin-sub {
          color: rgba(255,255,255,0.65);
          font-size: 0.85rem;
          margin-top: 2px;
        }
        .refresh-btn {
          color: var(--white) !important;
          border-color: rgba(255,255,255,0.3) !important;
          padding: 8px 20px !important;
          font-size: 0.85rem !important;
        }
        .refresh-btn:hover {
          background: rgba(255,255,255,0.1) !important;
          color: var(--white) !important;
        }
        .spin { animation: spin 1s linear infinite; }
        .admin-body {
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .admin-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .admin-stat {
          background: var(--white);
          border-radius: var(--radius-md);
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: var(--shadow-sm);
        }
        .admin-stat-icon { font-size: 1.8rem; }
        .admin-stat-num {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 700;
          line-height: 1;
        }
        .admin-stat-label {
          font-size: 0.8rem;
          color: var(--text-light);
          font-weight: 500;
          margin-top: 2px;
        }
        .admin-filters {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .filter-tabs {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .filter-tab {
          padding: 8px 18px;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-mid);
          background: var(--white);
          border: 1px solid rgba(10,74,110,0.1);
          cursor: pointer;
          transition: var(--transition);
        }
        .filter-tab.active {
          background: var(--ocean);
          color: var(--white);
          border-color: var(--ocean);
        }
        .date-filter-input {
          padding: 8px 14px;
          border: 1px solid rgba(10,74,110,0.15);
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
          font-size: 0.85rem;
          background: var(--white);
          color: var(--text-dark);
          outline: none;
        }
        .admin-help-list {
          margin: 16px 0 0;
          padding-left: 18px;
          color: var(--text-mid);
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .admin-help-list li {
          margin-bottom: 8px;
        }
        .admin-help-list code {
          background: rgba(10,74,110,0.06);
          padding: 2px 6px;
          border-radius: 6px;
          font-size: 0.85rem;
        }
        .appt-table-wrap {
          background: var(--white);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          overflow-x: auto;
        }
        .appt-table {
          width: 100%;
          border-collapse: collapse;
        }
        .appt-table th {
          background: rgba(10,74,110,0.05);
          padding: 14px 16px;
          text-align: left;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-mid);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(10,74,110,0.07);
          white-space: nowrap;
        }
        .appt-table td {
          padding: 14px 16px;
          border-bottom: 1px solid rgba(10,74,110,0.05);
          vertical-align: middle;
          font-size: 0.88rem;
        }
        .appt-row:hover td { background: rgba(10,74,110,0.025); }
        .patient-cell {
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
        }
        .patient-avatar {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: var(--ocean);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
          flex-shrink: 0;
        }
        .contact-cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cell-link {
          display: flex;
          align-items: center;
          gap: 5px;
          color: var(--ocean);
          font-size: 0.83rem;
          transition: var(--transition);
        }
        .cell-link:hover { color: var(--teal); }
        .service-tag {
          background: rgba(0,180,216,0.1);
          color: var(--ocean);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 600;
          white-space: nowrap;
        }
        .date-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .time-slot {
          font-size: 0.78rem;
          color: var(--teal);
          font-weight: 600;
        }
        .message-cell {
          max-width: 160px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--text-mid);
          font-size: 0.82rem;
        }
        .status-badge {
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 700;
          white-space: nowrap;
        }
        .action-btns {
          display: flex;
          gap: 6px;
        }
        .action-btn {
          width: 30px; height: 30px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
          cursor: pointer;
        }
        .action-btn.confirm { color: var(--teal); background: rgba(0,180,216,0.1); }
        .action-btn.confirm:hover { background: rgba(0,180,216,0.2); }
        .action-btn.complete { color: #38a169; background: rgba(56,161,105,0.1); }
        .action-btn.complete:hover { background: rgba(56,161,105,0.2); }
        .action-btn.cancel { color: var(--error); background: rgba(229,62,62,0.1); }
        .action-btn.cancel:hover { background: rgba(229,62,62,0.2); }
        .loading-state, .empty-state {
          text-align: center;
          padding: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          background: var(--white);
          border-radius: var(--radius-lg);
        }
        .empty-state span { font-size: 3rem; }
        .empty-state p { font-size: 1.1rem; font-weight: 600; color: var(--text-dark); }
        .empty-state small { color: var(--text-light); }
        .big-spinner {
          width: 40px; height: 40px;
          border: 3px solid rgba(10,74,110,0.15);
          border-top-color: var(--ocean);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @media (max-width: 768px) {
          .admin-stats { grid-template-columns: repeat(2, 1fr); }
          .admin-body { padding: 20px 16px; }
        }
      `}</style>
    </div>
  );
}
