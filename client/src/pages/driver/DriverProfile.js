import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateMe } from '../../utils/api';
import { toast } from 'react-toastify';

const DriverProfile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    licenseNo: user?.licenseNo || '',
    truckType: user?.truckType || '',
    truckPlate: user?.truckPlate || '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updateData = { ...formData };
      if (!updateData.password) delete updateData.password;
      await updateMe(updateData);
      toast.success('Profile updated successfully!');
      setEditing(false);
      setFormData({ ...formData, password: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">My Profile</h1>
        {!editing && (
          <button className="btn btn-primary" onClick={() => setEditing(true)}>Edit Profile</button>
        )}
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'linear-gradient(135deg, #e67e22, #d35400)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', margin: '0 auto 12px', color: 'white', fontWeight: '800' }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '700' }}>{user?.name}</h3>
            <p style={{ color: '#e67e22', fontWeight: '600', fontSize: '14px' }}>Driver</p>
            <span className={`badge badge-${user?.status}`} style={{ marginTop: '8px', display: 'inline-block' }}>{user?.status}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: '📧', label: 'Email', value: user?.email },
              { icon: '📞', label: 'Phone', value: user?.phone || 'Not set' },
              { icon: '🪪', label: 'License', value: user?.licenseNo || 'Not set' },
              { icon: '🚛', label: 'Truck Type', value: user?.truckType || 'Not set' },
              { icon: '🔖', label: 'Plate', value: user?.truckPlate || 'Not set' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <div>
                  <p style={{ color: '#95a5a6', fontSize: '12px' }}>{item.label}</p>
                  <p style={{ fontWeight: '600', color: '#2c3e50', fontSize: '14px' }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {editing && (
          <div className="card">
            <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '700', color: '#2c3e50' }}>Edit Profile</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group"><label>Full Name</label><input name="name" value={formData.name} onChange={handleChange} /></div>
              <div className="form-group"><label>Phone</label><input name="phone" value={formData.phone} onChange={handleChange} /></div>
              <div className="form-group"><label>License Number</label><input name="licenseNo" value={formData.licenseNo} onChange={handleChange} /></div>
              <div className="form-group">
                <label>Truck Type</label>
                <select name="truckType" value={formData.truckType} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Flatbed</option><option>Reefer</option><option>Dry Van</option>
                  <option>Tanker</option><option>Step Deck</option><option>Heavy Haul</option>
                </select>
              </div>
              <div className="form-group"><label>Truck Plate</label><input name="truckPlate" value={formData.truckPlate} onChange={handleChange} /></div>
              <div className="form-group"><label>New Password (leave blank to keep current)</label><input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="New password" /></div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverProfile;
