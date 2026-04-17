import React, { useEffect, useState } from 'react';
import { getAllDispatches, updateDispatchStatus } from '../../utils/api';
import { toast } from 'react-toastify';

const AdminDispatches = () => {
  const [dispatches, setDispatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDispatches = () => {
    getAllDispatches()
      .then(({ data }) => setDispatches(data))
      .catch(() => toast.error('Failed to load dispatches'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchDispatches(); }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateDispatchStatus(id, status);
      toast.success('Dispatch status updated');
      fetchDispatches();
    } catch { toast.error('Failed to update status'); }
  };

  if (loading) return <div className="loading">Loading dispatches...</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dispatch Management</h1>
        <span style={{ color: '#95a5a6' }}>{dispatches.length} total dispatches</span>
      </div>

      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr><th>Load</th><th>Driver</th><th>Phone</th><th>Truck Plate</th><th>Dispatched</th><th>Est. Arrival</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {dispatches.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', color: '#95a5a6', padding: '30px' }}>No dispatches yet</td></tr>
              ) : dispatches.map((d) => (
                <tr key={d._id}>
                  <td>
                    <strong>{d.load?.title}</strong>
                    <br />
                    <span style={{ fontSize: '12px', color: '#95a5a6' }}>{d.load?.pickupLocation} → {d.load?.dropLocation}</span>
                  </td>
                  <td>{d.driver?.name}</td>
                  <td>{d.driver?.phone || '—'}</td>
                  <td>{d.driver?.truckPlate || '—'}</td>
                  <td style={{ fontSize: '13px' }}>{new Date(d.dispatchedAt).toLocaleDateString()}</td>
                  <td style={{ fontSize: '13px' }}>{d.estimatedArrival ? new Date(d.estimatedArrival).toLocaleDateString() : '—'}</td>
                  <td><span className={`badge badge-${d.status}`}>{d.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {d.status === 'dispatched' && (
                        <button className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '12px' }}
                          onClick={() => handleStatusUpdate(d._id, 'in-transit')}>→ Transit</button>
                      )}
                      {d.status === 'in-transit' && (
                        <button className="btn btn-success" style={{ padding: '4px 10px', fontSize: '12px' }}
                          onClick={() => handleStatusUpdate(d._id, 'delivered')}>✓ Delivered</button>
                      )}
                      {(d.status === 'dispatched' || d.status === 'in-transit') && (
                        <button className="btn btn-danger" style={{ padding: '4px 10px', fontSize: '12px' }}
                          onClick={() => handleStatusUpdate(d._id, 'cancelled')}>Cancel</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDispatches;
