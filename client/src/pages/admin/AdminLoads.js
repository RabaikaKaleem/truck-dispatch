import React, { useEffect, useState } from 'react';
import { getLoads, getAllDrivers, assignDriver, updateLoadStatus, deleteLoad, createLoad } from '../../utils/api';
import { toast } from 'react-toastify';

const AdminLoads = () => {
  const [loads, setLoads] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [assignData, setAssignData] = useState({ driverId: '', notes: '', estimatedArrival: '' });
  const [newLoad, setNewLoad] = useState({
    title: '', pickupLocation: '', dropLocation: '', pickupDate: '',
    weight: '', cargoType: '', specialInstructions: '',
  });

  const fetchAll = async () => {
    try {
      const [loadsRes, driversRes] = await Promise.all([getLoads(), getAllDrivers()]);
      setLoads(loadsRes.data);
      setDrivers(driversRes.data.filter(d => d.status === 'active'));
    } catch { toast.error('Failed to load data'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleCreateLoad = async (e) => {
    e.preventDefault();
    try {
      await createLoad(newLoad);
      toast.success('Load created!');
      setShowModal(false);
      setNewLoad({ title: '', pickupLocation: '', dropLocation: '', pickupDate: '', weight: '', cargoType: '', specialInstructions: '' });
      fetchAll();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to create load'); }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      await assignDriver(selectedLoad._id, assignData.driverId, assignData.notes, assignData.estimatedArrival);
      toast.success('Driver assigned successfully!');
      setShowAssignModal(false);
      fetchAll();
    } catch (err) { toast.error(err.response?.data?.message || 'Assignment failed'); }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateLoadStatus(id, status);
      toast.success('Status updated');
      fetchAll();
    } catch { toast.error('Failed to update status'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this load?')) return;
    try {
      await deleteLoad(id);
      toast.success('Load deleted');
      fetchAll();
    } catch { toast.error('Failed to delete'); }
  };

  if (loading) return <div className="loading">Loading loads...</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Manage Loads</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ New Load</button>
      </div>

      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr><th>Title</th><th>From</th><th>To</th><th>Cargo</th><th>Weight</th><th>Driver</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {loads.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', color: '#95a5a6', padding: '30px' }}>No loads yet</td></tr>
              ) : loads.map((load) => (
                <tr key={load._id}>
                  <td><strong>{load.title}</strong></td>
                  <td>{load.pickupLocation}</td>
                  <td>{load.dropLocation}</td>
                  <td>{load.cargoType}</td>
                  <td>{load.weight} lbs</td>
                  <td>{load.assignedDriver?.name || <span style={{ color: '#95a5a6' }}>Unassigned</span>}</td>
                  <td><span className={`badge badge-${load.status}`}>{load.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {load.status === 'pending' && (
                        <button className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '12px' }}
                          onClick={() => { setSelectedLoad(load); setShowAssignModal(true); }}>Assign</button>
                      )}
                      {load.status === 'assigned' && (
                        <button className="btn btn-success" style={{ padding: '4px 10px', fontSize: '12px' }}
                          onClick={() => handleStatusUpdate(load._id, 'in-transit')}>→ Transit</button>
                      )}
                      {load.status === 'in-transit' && (
                        <button className="btn btn-success" style={{ padding: '4px 10px', fontSize: '12px' }}
                          onClick={() => handleStatusUpdate(load._id, 'delivered')}>✓ Delivered</button>
                      )}
                      <button className="btn btn-danger" style={{ padding: '4px 10px', fontSize: '12px' }}
                        onClick={() => handleDelete(load._id)}>Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Load Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create New Load</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateLoad}>
              <div className="form-group"><label>Title *</label><input value={newLoad.title} onChange={e => setNewLoad({ ...newLoad, title: e.target.value })} required /></div>
              <div className="grid-2">
                <div className="form-group"><label>Pickup Location *</label><input value={newLoad.pickupLocation} onChange={e => setNewLoad({ ...newLoad, pickupLocation: e.target.value })} required /></div>
                <div className="form-group"><label>Drop Location *</label><input value={newLoad.dropLocation} onChange={e => setNewLoad({ ...newLoad, dropLocation: e.target.value })} required /></div>
                <div className="form-group"><label>Pickup Date *</label><input type="date" value={newLoad.pickupDate} onChange={e => setNewLoad({ ...newLoad, pickupDate: e.target.value })} required /></div>
                <div className="form-group"><label>Weight (lbs) *</label><input type="number" value={newLoad.weight} onChange={e => setNewLoad({ ...newLoad, weight: e.target.value })} required /></div>
              </div>
              <div className="form-group">
                <label>Cargo Type *</label>
                <select value={newLoad.cargoType} onChange={e => setNewLoad({ ...newLoad, cargoType: e.target.value })} required>
                  <option value="">Select type</option>
                  <option>General Freight</option><option>Perishables</option><option>Hazardous Materials</option>
                  <option>Construction Materials</option><option>Machinery/Equipment</option><option>Automotive</option><option>Other</option>
                </select>
              </div>
              <div className="form-group"><label>Special Instructions</label><textarea value={newLoad.specialInstructions} onChange={e => setNewLoad({ ...newLoad, specialInstructions: e.target.value })} /></div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Create Load</button>
            </form>
          </div>
        </div>
      )}

      {/* Assign Driver Modal */}
      {showAssignModal && selectedLoad && (
        <div className="modal-overlay" onClick={() => setShowAssignModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Assign Driver to "{selectedLoad.title}"</h3>
              <button className="close-btn" onClick={() => setShowAssignModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAssign}>
              <div className="form-group">
                <label>Select Driver *</label>
                <select value={assignData.driverId} onChange={e => setAssignData({ ...assignData, driverId: e.target.value })} required>
                  <option value="">-- Select a driver --</option>
                  {drivers.map(d => (
                    <option key={d._id} value={d._id}>{d.name} — {d.truckType || 'No truck type'} ({d.truckPlate || 'No plate'})</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Estimated Arrival Date</label>
                <input type="date" value={assignData.estimatedArrival} onChange={e => setAssignData({ ...assignData, estimatedArrival: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Dispatch Notes</label>
                <textarea value={assignData.notes} onChange={e => setAssignData({ ...assignData, notes: e.target.value })} placeholder="Any instructions for the driver..." />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Assign Driver</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLoads;
