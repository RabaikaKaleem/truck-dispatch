import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';

const AdminManagement = () => {
  const { user } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [creating, setCreating] = useState(false);

  const fetchAdmins = () => {
    API.get('/auth/admins')
      .then(({ data }) => setAdmins(data))
      .catch(() => toast.error('Failed to load admins'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAdmins(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await API.post('/auth/create-admin', formData);
      toast.success(`Admin account created for ${formData.name}!`);
      setShowModal(false);
      setFormData({ name: '', email: '', password: '', phone: '' });
      fetchAdmins();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create admin');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove admin account for ${name}?`)) return;
    try {
      await API.delete(`/auth/admins/${id}`);
      toast.success('Admin removed');
      fetchAdmins();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove admin');
    }
  };

  if (loading) return <div className="loading">Loading admins...</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Admin Management</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add New Admin</button>
      </div>

      <div className="card" style={{ marginBottom: '24px', background: '#fff3cd', border: '1px solid #ffc107' }}>
        <p style={{ color: '#856404', fontSize: '14px' }}>
          ⚠️ <strong>Note:</strong> Admin accounts have full access to the system including managing drivers, loads, quotes, and other admins. Only create admin accounts for trusted team members.
        </p>
      </div>

      <div className="card">
        {admins.length === 0 ? (
          <p style={{ color: '#95a5a6', textAlign: 'center', padding: '30px' }}>No admins found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Created</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #e67e22, #d35400)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '14px' }}>
                        {admin.name.charAt(0).toUpperCase()}
                      </div>
                      <strong>{admin.name}</strong>
                    </div>
                  </td>
                  <td>{admin.email}</td>
                  <td>{admin.phone || '—'}</td>
                  <td style={{ fontSize: '13px' }}>{new Date(admin.createdAt).toLocaleDateString()}</td>
                  <td><span className="badge badge-active">Active</span></td>
                  <td>
                    {admin._id === user?._id ? (
                      <span style={{ color: '#95a5a6', fontSize: '13px' }}>← You</span>
                    ) : (
                      <button
                        className="btn btn-danger"
                        style={{ padding: '5px 12px', fontSize: '12px' }}
                        onClick={() => handleDelete(admin._id, admin.name)}
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Admin Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create New Admin Account</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="Admin's full name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="admin@company.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  placeholder="Set a strong password"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 555 000 0000"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                disabled={creating}
              >
                {creating ? 'Creating...' : '✅ Create Admin Account'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
