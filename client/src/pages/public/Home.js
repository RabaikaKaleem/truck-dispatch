import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const services = [
  { icon: '🚚', title: 'Full Truckload (FTL)', desc: 'Dedicated trucks for large shipments. Direct routes, no stops, fastest transit times.' },
  { icon: '📦', title: 'Less-Than-Truckload (LTL)', desc: 'Cost-effective shared shipping for smaller loads. Only pay for space you use.' },
  { icon: '❄️', title: 'Refrigerated Transport', desc: 'Temperature-controlled vehicles for perishables, pharmaceuticals, and food products.' },
  { icon: '🏗️', title: 'Heavy Haul', desc: 'Specialized equipment for oversized cargo with permits and route planning.' },
  { icon: '⚡', title: 'Expedited Shipping', desc: 'Priority routing for time-critical shipments with guaranteed delivery windows.' },
  { icon: '🌍', title: 'Intermodal Transport', desc: 'Multi-modal shipping combining road, rail, and sea for maximum efficiency.' },
];

const testimonials = [
  { name: 'Marcus T.', title: 'Supply Chain Manager', text: 'TruckDispatch cut our logistics costs by 30%. Their platform is incredibly easy to use and the drivers are always professional and on time.', rating: 5 },
  { name: 'Sarah L.', title: 'E-commerce Director', text: 'We\'ve been using TruckDispatch for 2 years. The real-time tracking gives us and our customers full visibility on every shipment.', rating: 5 },
  { name: 'David R.', title: 'Warehouse Operations', text: 'Exceptional service from quote to delivery. The admin dashboard makes managing multiple loads effortless.', rating: 5 },
];

const Home = () => {
  return (
    <div className="home">

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-tag">🏆 America's #1 Dispatch Platform</div>
            <h1>Move Freight<br />Smarter &amp; <span>Faster</span></h1>
            <p>Connect with 500+ verified professional drivers across all 48 states. Real-time tracking, instant quotes, and guaranteed on-time delivery.</p>
            <div className="hero-btns">
              <Link to="/get-quote" className="btn btn-primary btn-lg">Get Free Quote →</Link>
              <Link to="/register" className="btn btn-outline-white btn-lg">Join as Driver</Link>
            </div>
            <div className="hero-trust">
              <div className="trust-avatars">
                {['J','M','S','R'].map((l,i) => <div key={i} className="trust-avatar">{l}</div>)}
              </div>
              <span>Trusted by <strong style={{color:'white'}}>2,000+</strong> shippers nationwide</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-header">
                <div className="hero-card-icon" style={{background:'rgba(249,115,22,0.15)'}}>🚛</div>
                <div>
                  <div className="hero-card-title">Load #TDX-4821</div>
                  <div className="hero-card-sub">Dallas TX → Chicago IL</div>
                </div>
                <span className="badge badge-in-transit" style={{marginLeft:'auto'}}>In Transit</span>
              </div>
              <div className="hero-card-progress">
                <div className="hero-card-bar" style={{width:'68%', background:'linear-gradient(90deg,#f97316,#ea580c)'}}></div>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginTop:'8px',fontSize:'12px',color:'#64748b'}}>
                <span>68% complete</span><span>ETA: 4h 20min</span>
              </div>
            </div>

            <div className="hero-card">
              <div className="hero-card-header">
                <div className="hero-card-icon" style={{background:'rgba(34,197,94,0.15)'}}>✅</div>
                <div>
                  <div className="hero-card-title">Load #TDX-4819</div>
                  <div className="hero-card-sub">Houston TX → Atlanta GA</div>
                </div>
                <span className="badge badge-delivered" style={{marginLeft:'auto'}}>Delivered</span>
              </div>
              <div style={{fontSize:'13px',color:'#64748b',marginTop:'4px'}}>Delivered on time · 12,400 lbs · General Freight</div>
            </div>

            <div className="hero-stats-row">
              <div className="hero-stat"><h3>99%</h3><p>On-Time Rate</p></div>
              <div className="hero-stat"><h3>500+</h3><p>Active Drivers</p></div>
              <div className="hero-stat"><h3>48</h3><p>States Covered</p></div>
              <div className="hero-stat"><h3>10K+</h3><p>Loads Delivered</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos bar */}
      <div className="logos-bar">
        <div className="logos-inner">
          <span className="logos-label">Trusted by leading companies</span>
          <div className="logos-list">
            {['FreightCo','LogiPro','CargoMax','ShipFast','HaulTech','LoadLink'].map(n => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <section className="services-section">
        <div className="section-wrapper">
          <div className="services-header">
            <span className="section-label">What We Offer</span>
            <h2 className="section-title">Comprehensive Trucking Solutions</h2>
            <p className="section-subtitle">From small LTL shipments to heavy haul operations, we have the right solution for every logistics need.</p>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <div key={i} className="service-card">
                <div className="service-icon-wrap">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <Link to="/get-quote" className="service-link">Get Quote →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-section">
        <div className="section-wrapper">
          <div className="how-header">
            <span className="section-label">Simple Process</span>
            <h2 className="section-title">Ship in 4 Easy Steps</h2>
            <p className="section-subtitle">Getting your freight moved has never been this simple. From quote to delivery in minutes.</p>
          </div>
          <div className="steps-grid">
            {[
              { n:'01', title:'Request a Quote', desc:'Fill out our simple form with pickup, delivery, and cargo details to get an instant estimate.' },
              { n:'02', title:'Get Matched', desc:'Our system instantly matches your load with the best available verified driver in your area.' },
              { n:'03', title:'Track Live', desc:'Monitor your shipment in real-time from dispatch all the way to final delivery.' },
              { n:'04', title:'Delivery Confirmed', desc:'Receive instant confirmation when your cargo is safely delivered to its destination.' },
            ].map((step, i) => (
              <div key={i} className="step-item">
                <div className="step-num">{step.n}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          {[
            { value:'10,000+', label:'Loads Delivered' },
            { value:'500+', label:'Verified Drivers' },
            { value:'99%', label:'On-Time Delivery' },
            { value:'48', label:'States Covered' },
          ].map((s, i) => (
            <div key={i} className="stat-item">
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-wrapper">
          <span className="section-label">Client Reviews</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="stars">{'★'.repeat(t.rating)}</div>
                <p>"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.name.charAt(0)}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-title">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div>
          <h2>Ready to Ship Your Freight?</h2>
          <p>Get an instant quote and connect with a professional driver today — no commitments.</p>
          <div className="cta-btns">
            <Link to="/get-quote" className="btn btn-outline-white btn-lg">Get Free Quote</Link>
            <Link to="/register" className="btn btn-lg" style={{background:'white', color:'#f97316'}}>Become a Driver</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>🚛 TruckDispatch</h3>
            <p>America's most trusted truck dispatch platform. Connecting shippers and drivers since 2018.</p>
            <div className="footer-social">
              {['🐦','💼','📘','📸'].map((icon, i) => (
                <div key={i} className="social-btn">{icon}</div>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/register">Join as Driver</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Full Truckload</Link></li>
              <li><Link to="/services">LTL Shipping</Link></li>
              <li><Link to="/services">Refrigerated</Link></li>
              <li><Link to="/services">Heavy Haul</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p>📞 +1 (800) 555-TRUCK</p>
            <p>📧 info@truckdispatch.com</p>
            <p>📍 Dallas, TX 75001</p>
            <p>🕐 Mon–Fri 8AM–6PM CST</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2024 TruckDispatch Inc. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
