import React, { useEffect, useState } from 'react';
import { getAllDrivers, updateDriverStatus, deleteDriver } from '../../utils/api';
import { toast } from 'react-toastify';

const AdminDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchDrivers = () => {
    getAllDrivers()
      .then(({ data }) => setDrivers(data))
      .catch(() => toast.error('Failed to load drivers'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchDrivers(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateDriverStatus(id, status);
      toast.success('Driver status updated');
      fetchDrivers();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete driver ${name}?`)) return;
    try {
      await deleteDriver(id);
      toast.success('Driver removed');
      fetchDrivers();
    } catch {
      toast.error('Failed to delete driver');
    }
  };

  const filtered = drivers.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="loading">Loading drivers...</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Manage Drivers</h1>
        <span style={{ color: '#95a5a6' }}>{drivers.length} total drivers</span>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="🔍 Search drivers by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', padding: '10px 14px', border: '1px solid #dfe6e9', borderRadius: '6px', fontSize: '14px', outline: 'none' }}
        />
      </div>

      <div className="card">
        {filtered.length === 0 ? (
          <p style={{ color: '#95a5a6', textAlign: 'center', padding: '30px' }}>No drivers found</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Truck Type</th>
                  <th>Plate</th>
                  <th>License</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((driver) => (
                  <tr key={driver._id}>
                    <td><strong>{driver.name}</strong></td>
                    <td>{driver.email}</td>
                    <td>{driver.phone || '—'}</td>
                    <td>{driver.truckType || '—'}</td>
                    <td>{driver.truckPlate || '—'}</td>
                    <td>{driver.licenseNo || '—'}</td>
                    <td><span className={`badge badge-${driver.status}`}>{driver.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {driver.status !== 'active' && (
                          <button className="btn btn-success" style={{ padding: '5px 10px', fontSize: '12px' }}
                            onClick={() => handleStatusChange(driver._id, 'active')}>Activate</button>
                        )}
                        {driver.status !== 'suspended' && (
                          <button className="btn btn-danger" style={{ padding: '5px 10px', fontSize: '12px' }}
                            onClick={() => handleStatusChange(driver._id, 'suspended')}>Suspend</button>
                        )}
                        <button className="btn btn-danger" style={{ padding: '5px 10px', fontSize: '12px', background: '#c0392b' }}
                          onClick={() => handleDelete(driver._id, driver.name)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDrivers;
