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
  const [step, setStep] = useState(1);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await submitQuote(formData);
      setResult(data);
      toast.success('Quote submitted successfully!');
    } catch (err) {
      const msg = err.response?.data?.message || 'Server is not running. Please start the backend server.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="quote-success-page">
        <div className="quote-success-card">
          <div className="success-badge">✓</div>
          <h2>Quote Submitted!</h2>
          <p>Thank you <strong>{result.quote.name}</strong>! We'll reach out to <strong>{result.quote.email}</strong> within 2 business hours.</p>

          <div className="quote-result-grid">
            <div className="qr-item"><span>📍 From</span><strong>{result.quote.pickupLocation}</strong></div>
            <div className="qr-item"><span>🏁 To</span><strong>{result.quote.dropLocation}</strong></div>
            <div className="qr-item"><span>📦 Cargo</span><strong>{result.quote.cargoType}</strong></div>
            <div className="qr-item"><span>⚖️ Weight</span><strong>{Number(result.quote.weight).toLocaleString()} lbs</strong></div>
          </div>

          <div className="quote-cost-box">
            <p>Estimated Shipping Cost</p>
            <h1>${result.estimatedCost?.toLocaleString()}</h1>
            <small>*Final price confirmed after route assessment</small>
          </div>

          <div style={{display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap'}}>
            <button className="btn btn-primary" onClick={() => { setResult(null); setStep(1); }}>
              Request Another Quote
            </button>
            <a href="tel:+18005558782" className="btn btn-outline">📞 Call Us Now</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quote-page">
      <div className="quote-hero">
        <div className="quote-hero-inner">
          <div className="quote-hero-text">
            <span className="section-label">Free Instant Quote</span>
            <h1>How Much Will Your Shipment Cost?</h1>
            <p>Get an accurate freight estimate in under 60 seconds. No hidden fees, no commitments.</p>
            <div className="quote-benefits">
              {['Instant cost estimate','500+ verified drivers','All cargo types accepted','48-state coverage'].map((b,i) => (
                <div key={i} className="quote-benefit">✓ {b}</div>
              ))}
            </div>
          </div>
          <div className="quote-form-wrap">
            <div className="quote-steps">
              {['Contact Info','Shipment Details'].map((label, i) => (
                <div key={i} className={`quote-step ${step === i+1 ? 'active' : step > i+1 ? 'done' : ''}`}>
                  <div className="qs-num">{step > i+1 ? '✓' : i+1}</div>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="form-step">
                  <h3>Tell us about yourself</h3>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="name" placeholder="John Smith" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" placeholder="john@company.com" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" name="phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <button type="button" className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:'13px'}}
                    onClick={() => {
                      if (!formData.name || !formData.email || !formData.phone) {
                        toast.error('Please fill all contact fields');
                        return;
                      }
                      setStep(2);
                    }}>
                    Continue to Shipment Details →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="form-step">
                  <h3>Shipment details</h3>
                  <div className="form-group">
                    <label>Pickup Location *</label>
                    <input type="text" name="pickupLocation" placeholder="e.g. Dallas, TX" value={formData.pickupLocation} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Delivery Location *</label>
                    <input type="text" name="dropLocation" placeholder="e.g. Chicago, IL" value={formData.dropLocation} onChange={handleChange} required />
                  </div>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px'}}>
                    <div className="form-group">
                      <label>Weight (lbs) *</label>
                      <input type="number" name="weight" placeholder="10,000" value={formData.weight} onChange={handleChange} required min="1" />
                    </div>
                    <div className="form-group">
                      <label>Pickup Date *</label>
                      <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Cargo Type *</label>
                    <select name="cargoType" value={formData.cargoType} onChange={handleChange} required>
                      <option value="">Select cargo type</option>
                      <option>General Freight</option>
                      <option>Perishables</option>
                      <option>Hazardous Materials</option>
                      <option>Construction Materials</option>
                      <option>Machinery/Equipment</option>
                      <option>Automotive</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Special Instructions</label>
                    <textarea name="message" placeholder="Any special handling requirements..." value={formData.message} onChange={handleChange} style={{minHeight:'80px'}} />
                  </div>
                  <div style={{display:'flex', gap:'10px'}}>
                    <button type="button" className="btn btn-outline" onClick={() => setStep(1)} style={{flex:'0 0 auto'}}>← Back</button>
                    <button type="submit" className="btn btn-primary" style={{flex:1, justifyContent:'center', padding:'13px'}} disabled={loading}>
                      {loading ? '⏳ Calculating...' : '🚛 Get My Instant Quote'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Why us */}
      <div className="quote-why">
        <div className="quote-why-inner">
          {[
            { icon:'⚡', title:'Instant Estimate', desc:'Get an accurate cost estimate the moment you submit.' },
            { icon:'🔒', title:'No Commitment', desc:'Quotes are free with zero obligations.' },
            { icon:'📞', title:'Expert Support', desc:'Our team reviews every quote personally.' },
            { icon:'🏆', title:'Best Rates', desc:'Competitive pricing across all routes.' },
          ].map((item, i) => (
            <div key={i} className="why-card">
              <span className="why-icon">{item.icon}</span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetQuote;
