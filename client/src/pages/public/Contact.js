import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
  };

  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, #2c3e50, #1a252f)', padding: '80px 40px', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '44px', fontWeight: '800', marginBottom: '12px' }}>Contact Us</h1>
        <p style={{ color: '#bdc3c7', fontSize: '18px' }}>We're here to help. Reach out any time.</p>
      </section>

      <section style={{ padding: '70px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '24px', color: '#2c3e50' }}>Get in Touch</h2>
            {submitted ? (
              <div style={{ background: '#d4edda', borderRadius: '12px', padding: '30px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
                <h3>Message Sent!</h3>
                <p>We'll respond within 24 business hours.</p>
                <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => setSubmitted(false)}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" name="subject" placeholder="How can we help?" value={formData.subject} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea name="message" placeholder="Describe your inquiry..." value={formData.message} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px' }}>
                  Send Message
                </button>
              </form>
            )}
          </div>

          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '24px', color: '#2c3e50' }}>Contact Info</h2>
            {[
              { icon: '📞', label: 'Phone', value: '+1 (800) 555-TRUCK' },
              { icon: '📧', label: 'Email', value: 'info@truckdispatch.com' },
              { icon: '📍', label: 'Address', value: '123 Logistics Ave, Dallas, TX 75001' },
              { icon: '🕐', label: 'Hours', value: 'Mon-Fri 8AM - 6PM CST' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', padding: '20px', background: 'white', borderRadius: '10px', marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <span style={{ fontSize: '28px' }}>{item.icon}</span>
                <div>
                  <p style={{ color: '#95a5a6', fontSize: '13px', marginBottom: '4px' }}>{item.label}</p>
                  <p style={{ fontWeight: '600', color: '#2c3e50' }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
