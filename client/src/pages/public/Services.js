import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  { icon: '🚚', title: 'Full Truckload (FTL)', desc: 'Dedicated truck service for full shipments. Best for large cargo that fills an entire truck. Faster transit, direct routes, and no handling at intermediate points.', price: 'From $800/load' },
  { icon: '📦', title: 'Less-Than-Truckload (LTL)', desc: 'Cost-effective for smaller shipments that don\'t require a full truck. Share truck space with other shippers and only pay for the space you use.', price: 'From $150/load' },
  { icon: '❄️', title: 'Refrigerated Transport', desc: 'Temperature-controlled vehicles for perishable goods including food, pharmaceuticals, and other temperature-sensitive items. Constant monitoring.', price: 'From $1,200/load' },
  { icon: '🏗️', title: 'Heavy Haul', desc: 'Specialized equipment and permits for oversized or overweight cargo. Experienced drivers with route planning and escort services when required.', price: 'Custom quote' },
  { icon: '⚡', title: 'Expedited Shipping', desc: 'Time-critical shipments handled with priority routing and dedicated drivers. Guaranteed delivery times with real-time tracking updates.', price: 'From $1,500/load' },
  { icon: '🌍', title: 'Intermodal Transport', desc: 'Multi-modal shipping combining road, rail, and sea transport for long-distance or international shipments. Cost-effective for large volumes.', price: 'From $600/load' },
];

const Services = () => (
  <div>
    <section style={{ background: 'linear-gradient(135deg, #2c3e50, #1a252f)', padding: '80px 40px', textAlign: 'center', color: 'white' }}>
      <h1 style={{ fontSize: '44px', fontWeight: '800', marginBottom: '12px' }}>Our Services</h1>
      <p style={{ color: '#bdc3c7', fontSize: '18px' }}>Comprehensive trucking and dispatch solutions for every need</p>
    </section>

    <section style={{ padding: '70px 40px', background: 'white' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {services.map((s, i) => (
            <div key={i} style={{ border: '1px solid #dfe6e9', borderRadius: '12px', padding: '32px', transition: 'all 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
              <span style={{ fontSize: '44px', display: 'block', marginBottom: '16px' }}>{s.icon}</span>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c3e50' }}>{s.title}</h3>
              <p style={{ color: '#95a5a6', fontSize: '14px', lineHeight: '1.7', marginBottom: '16px' }}>{s.desc}</p>
              <span style={{ background: '#fff3e0', color: '#e67e22', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>{s.price}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '60px', padding: '40px', background: '#f8f9fa', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px', color: '#2c3e50' }}>Need a Custom Solution?</h2>
          <p style={{ color: '#95a5a6', marginBottom: '24px' }}>Contact us and we'll build a logistics plan that fits your exact requirements.</p>
          <Link to="/get-quote" className="btn btn-primary" style={{ fontSize: '16px', padding: '14px 36px' }}>Get Custom Quote</Link>
        </div>
      </div>
    </section>
  </div>
);

export default Services;
