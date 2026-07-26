import React from 'react';
import { motion } from 'framer-motion';
import { Target, Cpu, MessageSquare, Scaling, Handshake } from 'lucide-react';

const reasons = [
  { icon: Target, title: 'Business First', desc: 'We focus on your ROI and business objectives, not just code.' },
  { icon: Cpu, title: 'Modern Technology', desc: 'We build with the latest, most reliable frameworks available.' },
  { icon: MessageSquare, title: 'Clear Communication', desc: 'Transparent updates, zero jargon, and complete visibility.' },
  { icon: Scaling, title: 'Built To Scale', desc: 'Architecture that grows seamlessly alongside your business.' },
  { icon: Handshake, title: 'Long-Term Partnership', desc: 'We are invested in your success long after the launch.' }
];

const WhyChooseUs = () => {
  return (
    <section className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Why Businesses Work With Us
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card"
                style={{
                  flex: '1 1 300px',
                  maxWidth: '350px',
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'default',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(124, 58, 237, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.3)';
                }}
              >
                <div style={{
                  width: '60px', height: '60px', borderRadius: '50%',
                  background: 'rgba(124, 58, 237, 0.1)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
                  border: '1px solid rgba(124, 58, 237, 0.2)'
                }}>
                  <Icon size={30} style={{ color: 'var(--accent-primary)' }} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>{reason.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{reason.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
