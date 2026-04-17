import React, { useEffect, useState } from 'react';
import { getLoads, getMyDispatches } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const DriverDashboard = () => {
  const { user } = useAuth();
  const [loads, setLoads] = useState([]);
  const [dispatches, setDispatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getLoads(), getMyDispatches()])
      .then(([loadsRes, dispRes]) => {
        setLoads(loadsRes.data);
        setDispatches(dispRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: loads.length,
    pending: loads.filter(l => l.status === 'assigned').length,
    inTransit: loads.filter(l => l.status === 'in-transit').length,
    delivered: loads.filter(l => l.status === 'delivered').length,
  };

  if (loading) return <div className="loading">Loading your dashboard...</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Welcome, {user?.name}! 🚛</h1>
          <p style={{ color: '#95a5a6', fontSize: '14px', marginTop: '4px' }}>
            {user?.truckType} • Plate: {user?.truckPlate || 'Not set'}
          </p>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: '30px' }}>
        {[
          { label: 'Total Loads', value: stats.total, icon: '📦', color: '#3498db' },
          { label: 'Assigned', value: stats.pending, icon: '📋', color: '#f39c12' },
          { label: 'In Transit', value: stats.inTransit, icon: '🚛', color: '#9b59b6' },
          { label: 'Delivered', value: stats.delivered, icon: '✅', color: '#27ae60' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'white', borderRadius: '10px', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.07)', borderLeft: `4px solid ${s.color}` }}>
            <div>
              <p style={{ color: '#95a5a6', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '6px' }}>{s.label}</p>
              <h3 style={{ fontSize: '30px', fontWeight: '800', color: '#2c3e50' }}>{s.value}</h3>
            </div>
            <span style={{ fontSize: '32px', opacity: 0.6 }}>{s.icon}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#2c3e50', fontSize: '17px', fontWeight: '700' }}>📦 My Recent Loads</h3>
        {loads.length === 0 ? (
          <p style={{ color: '#95a5a6', textAlign: 'center', padding: '30px' }}>No loads assigned yet. Check back soon!</p>
        ) : (
          <table>
            <thead><tr><th>Title</th><th>From</th><th>To</th><th>Cargo</th><th>Pickup Date</th><th>Status</th></tr></thead>
            <tbody>
              {loads.slice(0, 5).map((load) => (
                <tr key={load._id}>
                  <td><strong>{load.title}</strong></td>
                  <td>{load.pickupLocation}</td>
                  <td>{load.dropLocation}</td>
                  <td>{load.cargoType}</td>
                  <td>{new Date(load.pickupDate).toLocaleDateString()}</td>
                  <td><span className={`badge badge-${load.status}`}>{load.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
