import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => (
  <div className="about-page">
    <section className="about-hero">
      <h1>About TruckDispatch</h1>
      <p>America's most trusted truck dispatch platform since 2018</p>
    </section>

    <section className="about-mission">
      <div className="about-container">
        <div className="mission-text">
          <h2>Our Mission</h2>
          <p>We connect shippers with reliable, vetted truck drivers to ensure goods move efficiently across the country. Our platform makes dispatch management simple, transparent, and effective for everyone involved.</p>
          <p>Founded by logistics veterans, TruckDispatch was built to solve the fragmented communication between dispatchers, drivers, and shippers — making the whole process seamless from quote to delivery.</p>
        </div>
        <div className="mission-stats">
          <div className="m-stat"><h3>8+</h3><p>Years in Business</p></div>
          <div className="m-stat"><h3>500+</h3><p>Active Drivers</p></div>
          <div className="m-stat"><h3>10K+</h3><p>Loads Delivered</p></div>
          <div className="m-stat"><h3>48</h3><p>States Covered</p></div>
        </div>
      </div>
    </section>

    <section className="about-values">
      <div className="about-container">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          {[
            { icon: '🤝', title: 'Reliability', desc: 'We deliver on our promises every single time.' },
            { icon: '🔒', title: 'Safety', desc: 'All drivers are vetted and all loads are insured.' },
            { icon: '⚡', title: 'Efficiency', desc: 'Fast dispatch, real-time updates, minimal delays.' },
            { icon: '💬', title: 'Transparency', desc: 'Clear pricing, honest communication, no hidden fees.' },
          ].map((v, i) => (
            <div key={i} className="value-card">
              <span>{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="about-cta">
      <h2>Ready to work with us?</h2>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/get-quote" className="btn btn-primary">Get a Quote</Link>
        <Link to="/register" className="btn btn-outline">Become a Driver</Link>
      </div>
    </section>
  </div>
);

export default About;
