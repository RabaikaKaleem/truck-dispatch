import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../../utils/api';
import './AdminDashboard.css';

const StatCard = ({ label, value, icon, color }) => (
  <div className="stat-card-admin" style={{ borderLeft: `4px solid ${color}` }}>
    <div className="stat-info">
      <p className="stat-label">{label}</p>
      <h3 className="stat-value">{value}</h3>
    </div>
    <span className="stat-icon">{icon}</span>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(({ data }) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <span style={{ color: '#95a5a6', fontSize: '14px' }}>Overview of all operations</span>
      </div>

      <div className="grid-4" style={{ marginBottom: '30px' }}>
        <StatCard label="Total Drivers" value={stats?.drivers.total || 0} icon="👤" color="#3498db" />
        <StatCard label="Total Loads" value={stats?.loads.total || 0} icon="📦" color="#e67e22" />
        <StatCard label="In Transit" value={stats?.loads.inTransit || 0} icon="🚛" color="#9b59b6" />
        <StatCard label="Delivered" value={stats?.loads.delivered || 0} icon="✅" color="#27ae60" />
      </div>

      <div className="grid-4" style={{ marginBottom: '30px' }}>
        <StatCard label="Pending Loads" value={stats?.loads.pending || 0} icon="⏳" color="#f39c12" />
        <StatCard label="Assigned Loads" value={stats?.loads.assigned || 0} icon="📋" color="#1abc9c" />
        <StatCard label="Pending Quotes" value={stats?.quotes.pending || 0} icon="💬" color="#e74c3c" />
        <StatCard label="Active Drivers" value={stats?.drivers.active || 0} icon="🟢" color="#2ecc71" />
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: '20px', color: '#2c3e50', fontSize: '17px', fontWeight: '700' }}>📦 Recent Loads</h3>
          {stats?.recentLoads?.length === 0 ? (
            <p style={{ color: '#95a5a6' }}>No loads yet</p>
          ) : (
            <table>
              <thead><tr><th>Title</th><th>From</th><th>To</th><th>Status</th></tr></thead>
              <tbody>
                {stats?.recentLoads?.map((load) => (
                  <tr key={load._id}>
                    <td>{load.title}</td>
                    <td>{load.pickupLocation}</td>
                    <td>{load.dropLocation}</td>
                    <td><span className={`badge badge-${load.status}`}>{load.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '20px', color: '#2c3e50', fontSize: '17px', fontWeight: '700' }}>💬 Recent Quote Requests</h3>
          {stats?.recentQuotes?.length === 0 ? (
            <p style={{ color: '#95a5a6' }}>No quotes yet</p>
          ) : (
            <table>
              <thead><tr><th>Name</th><th>Route</th><th>Status</th></tr></thead>
              <tbody>
                {stats?.recentQuotes?.map((q) => (
                  <tr key={q._id}>
                    <td>{q.name}</td>
                    <td style={{ fontSize: '12px' }}>{q.pickupLocation} → {q.dropLocation}</td>
                    <td><span className={`badge badge-${q.status}`}>{q.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
