import React, { useEffect, useState } from 'react';
import { getMyDispatches, updateDispatchStatus } from '../../utils/api';
import { toast } from 'react-toastify';

const DriverDispatches = () => {
  const [dispatches, setDispatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationInput, setLocationInput] = useState({});

  const fetchDispatches = () => {
    getMyDispatches()
      .then(({ data }) => setDispatches(data))
      .catch(() => toast.error('Failed to load dispatches'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchDispatches(); }, []);

  const handleUpdate = async (id, status) => {
    try {
      await updateDispatchStatus(id, status, locationInput[id] || '');
      toast.success('Dispatch updated!');
      fetchDispatches();
    } catch { toast.error('Update failed'); }
  };

  if (loading) return <div className="loading">Loading dispatches...</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">My Dispatches</h1>
      </div>

      {dispatches.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <span style={{ fontSize: '60px', display: 'block', marginBottom: '16px' }}>🚛</span>
          <h3>No dispatches yet</h3>
          <p style={{ color: '#95a5a6', marginTop: '8px' }}>Your dispatch assignments will appear here.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {dispatches.map((d) => (
            <div key={d._id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#2c3e50' }}>{d.load?.title}</h3>
                    <span className={`badge badge-${d.status}`}>{d.status}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', fontSize: '14px', color: '#555' }}>
                    <p>📍 {d.load?.pickupLocation} → {d.load?.dropLocation}</p>
                    <p>📦 {d.load?.cargoType} ({d.load?.weight} lbs)</p>
                    <p>📅 Dispatched: {new Date(d.dispatchedAt).toLocaleDateString()}</p>
                    {d.estimatedArrival && <p>🏁 ETA: {new Date(d.estimatedArrival).toLocaleDateString()}</p>}
                    {d.currentLocation && <p>📡 Last Location: {d.currentLocation}</p>}
                  </div>
                  {d.notes && (
                    <p style={{ marginTop: '10px', background: '#f8f9fa', padding: '10px 14px', borderRadius: '6px', fontSize: '13px', color: '#555' }}>
                      📋 <strong>Notes:</strong> {d.notes}
                    </p>
                  )}
                </div>

                {(d.status === 'dispatched' || d.status === 'in-transit') && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '200px' }}>
                    <input
                      type="text"
                      placeholder="Current location..."
                      value={locationInput[d._id] || ''}
                      onChange={e => setLocationInput({ ...locationInput, [d._id]: e.target.value })}
                      style={{ padding: '8px 12px', border: '1px solid #dfe6e9', borderRadius: '6px', fontSize: '13px' }}
                    />
                    {d.status === 'dispatched' && (
                      <button className="btn btn-primary" onClick={() => handleUpdate(d._id, 'in-transit')}>🚛 Start Transit</button>
                    )}
                    {d.status === 'in-transit' && (
                      <button className="btn btn-success" onClick={() => handleUpdate(d._id, 'delivered')}>✅ Mark Delivered</button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverDispatches;
