import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    phone: '', licenseNo: '', truckType: '', truckPlate: '',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match!');
    }
    setLoading(true);
    try {
      const { confirmPassword, ...data } = formData;
      await register(data);
      toast.success('Registration successful! Welcome aboard 🚛');
      navigate('/driver');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card-wide">
        <div className="auth-header">
          <h1>🚛 TruckDispatch</h1>
          <h2>Join as a Driver</h2>
          <p>Create your driver account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" name="email" placeholder="john@email.com" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password *</label>
              <input type="password" name="password" placeholder="Min 6 characters" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Confirm Password *</label>
              <input type="password" name="confirmPassword" placeholder="Repeat password" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" placeholder="+1 555 000 0000" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>CDL License Number</label>
              <input type="text" name="licenseNo" placeholder="License #" value={formData.licenseNo} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Truck Type</label>
              <select name="truckType" value={formData.truckType} onChange={handleChange}>
                <option value="">Select truck type</option>
                <option value="Flatbed">Flatbed</option>
                <option value="Reefer">Reefer (Refrigerated)</option>
                <option value="Dry Van">Dry Van</option>
                <option value="Tanker">Tanker</option>
                <option value="Step Deck">Step Deck</option>
                <option value="Heavy Haul">Heavy Haul</option>
              </select>
            </div>
            <div className="form-group">
              <label>Truck Plate Number</label>
              <input type="text" name="truckPlate" placeholder="Plate #" value={formData.truckPlate} onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Driver Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
          <Link to="/" className="back-home">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
