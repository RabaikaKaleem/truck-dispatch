import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>🚛 Reliable Truck Dispatch Services</h1>
          <p>Connecting shippers with professional drivers across the country. Fast, secure, and always on time.</p>
          <div className="hero-btns">
            <Link to="/get-quote" className="btn btn-primary">Get a Free Quote</Link>
            <Link to="/register" className="btn btn-outline">Join as Driver</Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <h3>500+</h3>
            <p>Active Drivers</p>
          </div>
          <div className="stat-card">
            <h3>10,000+</h3>
            <p>Loads Delivered</p>
          </div>
          <div className="stat-card">
            <h3>50+</h3>
            <p>States Covered</p>
          </div>
          <div className="stat-card">
            <h3>99%</h3>
            <p>On-Time Rate</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="home-services">
        <div className="section-container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Professional logistics solutions for every need</p>
          <div className="services-grid">
            {[
              { icon: '🚚', title: 'Full Truckload (FTL)', desc: 'Dedicated trucks for large, full shipments across state lines.' },
              { icon: '📦', title: 'Less-Than-Truckload (LTL)', desc: 'Cost-effective shipping for smaller loads sharing truck space.' },
              { icon: '❄️', title: 'Refrigerated Transport', desc: 'Temperature-controlled vehicles for perishable goods.' },
              { icon: '🏗️', title: 'Heavy Haul', desc: 'Specialized equipment for oversized and overweight cargo.' },
              { icon: '⚡', title: 'Expedited Shipping', desc: 'Rush deliveries when time-critical shipments are needed.' },
              { icon: '🌍', title: 'Intermodal Transport', desc: 'Seamless multi-modal shipping by road, rail, and sea.' },
            ].map((s, i) => (
              <div key={i} className="service-card">
                <span className="service-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="section-container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            {[
              { step: '01', title: 'Request a Quote', desc: 'Fill out our simple form with your load details and pickup/drop locations.' },
              { step: '02', title: 'Get Matched', desc: 'Our team assigns the best available driver for your shipment.' },
              { step: '03', title: 'Track in Real-Time', desc: 'Monitor your shipment status from dispatch to delivery.' },
              { step: '04', title: 'Delivery Confirmed', desc: 'Get confirmation when your load is safely delivered.' },
            ].map((step, i) => (
              <div key={i} className="step-card">
                <div className="step-number">{step.step}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <h2>Ready to Ship?</h2>
          <p>Get an instant quote and we'll connect you with a professional driver today.</p>
          <Link to="/get-quote" className="btn btn-primary">Get Free Quote Now</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>🚛 TruckDispatch</h3>
            <p>Your trusted logistics partner across the nation.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/get-quote">Get Quote</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact</h4>
            <p>📧 info@truckdispatch.com</p>
            <p>📞 +1 (800) 555-TRUCK</p>
            <p>📍 123 Logistics Ave, Dallas TX</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 TruckDispatch. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
