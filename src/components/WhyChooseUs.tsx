import { motion } from 'framer-motion';
import { Target, Cpu, MessageSquare, Scaling, Handshake, Sparkles } from 'lucide-react';

const reasons = [
  { icon: Target, title: 'Business First', desc: 'We focus on your ROI and strategic business objectives, delivering high-impact solutions rather than just raw code.' },
  { icon: Cpu, title: 'Cutting-Edge Tech', desc: 'We engineer with performance-driven, modern tech stacks designed for ultra-fast load times and security.' },
  { icon: MessageSquare, title: 'Clear Communication', desc: 'Transparent weekly updates, zero jargon, and complete end-to-end visibility throughout every sprint.' },
  { icon: Scaling, title: 'Engineered To Scale', desc: 'Robust architecture built from day one to handle heavy traffic and effortless business expansion.' },
  { icon: Handshake, title: 'Long-Term Partnership', desc: 'We stay invested in your success, offering ongoing strategic support and optimization far beyond launch day.' }
];

const WhyChooseUs = () => {
  return (
    <section className="section" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      <div className="bg-glow-blur" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60vw', height: '60vw', background: 'rgba(139, 92, 246, 0.08)' }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '6rem' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.4rem 1rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '1.5rem' }}>
            <Sparkles size={14} color="var(--accent-secondary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Why Partner With Us</span>
          </div>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.03em', fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>
            Why Leading Businesses <br />
            <span className="text-gradient-accent">Trust Web & Pixel Studio.</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', justifyContent: 'center' }}>
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card hover-target"
                style={{
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  cursor: 'default',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease',
                  background: 'linear-gradient(145deg, rgba(20, 20, 35, 0.7) 0%, rgba(8, 8, 17, 0.85) 100%)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 25px 50px -15px rgba(139, 92, 246, 0.25)';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                <div style={{
                  width: '56px', height: '56px', borderRadius: '1rem',
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.15))', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', marginBottom: '1.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <Icon size={26} style={{ color: 'var(--accent-secondary)' }} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.85rem', fontFamily: 'var(--font-display)', color: 'white' }}>{reason.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.6 }}>{reason.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
