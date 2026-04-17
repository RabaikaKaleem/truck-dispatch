import React, { useEffect, useState } from 'react';
import { getLoads, updateLoadStatus } from '../../utils/api';
import { toast } from 'react-toastify';

const DriverLoads = () => {
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLoads = () => {
    getLoads()
      .then(({ data }) => setLoads(data))
      .catch(() => toast.error('Failed to load your loads'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchLoads(); }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateLoadStatus(id, status);
      toast.success('Status updated!');
      fetchLoads();
    } catch { toast.error('Failed to update status'); }
  };

  if (loading) return <div className="loading">Loading your loads...</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">My Loads</h1>
        <span style={{ color: '#95a5a6' }}>{loads.length} loads assigned</span>
      </div>

      {loads.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <span style={{ fontSize: '60px', display: 'block', marginBottom: '16px' }}>📭</span>
          <h3>No loads assigned yet</h3>
          <p style={{ color: '#95a5a6', marginTop: '8px' }}>The admin will assign loads to you soon.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loads.map((load) => (
            <div key={load._id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#2c3e50' }}>{load.title}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', fontSize: '14px', color: '#555' }}>
                    <p>📍 <strong>From:</strong> {load.pickupLocation}</p>
                    <p>🏁 <strong>To:</strong> {load.dropLocation}</p>
                    <p>📦 <strong>Cargo:</strong> {load.cargoType}</p>
                    <p>⚖️ <strong>Weight:</strong> {load.weight} lbs</p>
                    <p>📅 <strong>Pickup:</strong> {new Date(load.pickupDate).toLocaleDateString()}</p>
                  </div>
                  {load.specialInstructions && (
                    <p style={{ marginTop: '10px', fontSize: '13px', background: '#fff3cd', padding: '8px 12px', borderRadius: '6px', color: '#856404' }}>
                      ⚠️ <strong>Notes:</strong> {load.specialInstructions}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                  <span className={`badge badge-${load.status}`} style={{ fontSize: '14px', padding: '6px 14px' }}>{load.status}</span>
                  {load.status === 'assigned' && (
                    <button className="btn btn-primary" onClick={() => handleStatusUpdate(load._id, 'in-transit')}>
                      🚛 Start Transit
                    </button>
                  )}
                  {load.status === 'in-transit' && (
                    <button className="btn btn-success" onClick={() => handleStatusUpdate(load._id, 'delivered')}>
                      ✅ Mark Delivered
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverLoads;
