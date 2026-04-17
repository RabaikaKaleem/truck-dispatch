import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { submitQuote } from '../../utils/api';
import './GetQuote.css';

const GetQuote = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    pickupLocation: '', dropLocation: '',
    weight: '', cargoType: '', pickupDate: '', message: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await submitQuote(formData);
      setResult(data);
      toast.success('Quote submitted! We will contact you shortly.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit quote.');
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="quote-success-page">
        <div className="quote-success-card">
          <div className="success-icon">✅</div>
          <h2>Quote Submitted Successfully!</h2>
          <p>Thank you, <strong>{result.quote.name}</strong>. Our team will contact you at <strong>{result.quote.email}</strong> within 24 hours.</p>
          <div className="quote-result">
            <div className="quote-detail"><span>From:</span> <strong>{result.quote.pickupLocation}</strong></div>
            <div className="quote-detail"><span>To:</span> <strong>{result.quote.dropLocation}</strong></div>
            <div className="quote-detail"><span>Cargo:</span> <strong>{result.quote.cargoType} ({result.quote.weight} lbs)</strong></div>
            <div className="quote-estimate">
              <p>Estimated Cost</p>
              <h3>${result.estimatedCost?.toLocaleString()}</h3>
              <small>*Final price may vary based on route details</small>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => setResult(null)}>Request Another Quote</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quote-page">
      <div className="quote-header">
        <h1>Get a Free Quote</h1>
        <p>Fill in the details below and we'll provide you with a competitive shipping estimate</p>
      </div>

      <div className="quote-container">
        <div className="quote-form-card">
          <form onSubmit={handleSubmit}>
            <h3 className="form-section-title">📋 Contact Information</h3>
            <div className="grid-2">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" name="phone" placeholder="+1 555 000 0000" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Pickup Date *</label>
                <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} />
              </div>
            </div>

            <h3 className="form-section-title">🚛 Shipment Details</h3>
            <div className="grid-2">
              <div className="form-group">
                <label>Pickup Location *</label>
                <input type="text" name="pickupLocation" placeholder="City, State" value={formData.pickupLocation} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Delivery Location *</label>
                <input type="text" name="dropLocation" placeholder="City, State" value={formData.dropLocation} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Weight (lbs) *</label>
                <input type="number" name="weight" placeholder="e.g. 10000" value={formData.weight} onChange={handleChange} required min="1" />
              </div>
              <div className="form-group">
                <label>Cargo Type *</label>
                <select name="cargoType" value={formData.cargoType} onChange={handleChange} required>
                  <option value="">Select cargo type</option>
                  <option value="General Freight">General Freight</option>
                  <option value="Perishables">Perishables</option>
                  <option value="Hazardous Materials">Hazardous Materials</option>
                  <option value="Construction Materials">Construction Materials</option>
                  <option value="Machinery/Equipment">Machinery/Equipment</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Additional Notes</label>
              <textarea name="message" placeholder="Any special requirements, handling instructions..." value={formData.message} onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? 'Calculating...' : '🚚 Get My Quote'}
            </button>
          </form>
        </div>

        <div className="quote-info">
          <div className="info-card">
            <h3>Why Choose Us?</h3>
            <ul>
              <li>✅ Instant quote calculation</li>
              <li>✅ 500+ verified drivers</li>
              <li>✅ Real-time tracking</li>
              <li>✅ 99% on-time delivery</li>
              <li>✅ 24/7 customer support</li>
              <li>✅ Fully insured shipments</li>
            </ul>
          </div>
          <div className="info-card contact-info">
            <h3>📞 Need Help?</h3>
            <p>Call us directly:</p>
            <h2>+1 (800) 555-TRUCK</h2>
            <p>Mon-Fri 8AM - 6PM CST</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetQuote;
