import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Layout, Smartphone, Brain, PenTool, Cloud } from 'lucide-react';

const services = [
  { icon: Code, title: 'Custom Software', desc: 'Scalable applications built for your unique business needs. We engineer robust backend systems and performant frontends.' },
  { icon: Layout, title: 'Web Development', desc: 'High-performance, modern websites that convert. We build award-winning digital experiences that captivate users.' },
  { icon: Smartphone, title: 'Mobile Apps', desc: 'Native and cross-platform mobile experiences designed for speed, usability, and maximum engagement.' },
  { icon: Brain, title: 'AI Solutions', desc: 'Integrate artificial intelligence to automate workflows, optimize processes, and unlock new business capabilities.' },
  { icon: PenTool, title: 'UI/UX Design', desc: 'Premium, user-centric interfaces and digital products that blend aesthetics with seamless functionality.' },
  { icon: Cloud, title: 'Cloud Solutions', desc: 'Secure, scalable cloud architecture and deployment to future-proof your digital infrastructure.' },
];

const Capabilities = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section id="services" className="section" style={{ position: 'relative', background: 'var(--bg-primary)' }}>
      <div className="bg-glow-blur" style={{ top: '20%', right: '-10%', width: '40vw', height: '40vw', background: 'var(--accent-primary)' }}></div>
      
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'start' }} className="capabilities-layout">
          
          <div style={{ position: 'sticky', top: '20vh' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: '4rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}
            >
              Our <br/> <span className="text-gradient-accent">Capabilities.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '400px' }}
            >
              End-to-end digital services engineered to accelerate your growth and dominate your industry.
            </motion.p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border-color)' }}>
            {services.map((service, index) => {
              const Icon = service.icon;
              const isHovered = hoveredIndex === index;
              
              return (
                <motion.div 
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className="hover-target"
                  style={{ 
                    borderBottom: '1px solid var(--border-color)',
                    padding: '2rem 0',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Background Highlight */}
                  <motion.div 
                    initial={false}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.05) 0%, transparent 100%)', zIndex: 0 }}
                  />
                  
                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                      <span style={{ fontFamily: 'var(--font-display)', color: isHovered ? 'var(--accent-primary)' : 'var(--text-tertiary)', fontSize: '1.5rem', fontWeight: 600, transition: 'color 0.3s ease' }}>
                        0{index + 1}
                      </span>
                      <motion.h3 
                        initial={false}
                        animate={{ x: isHovered ? 20 : 0, color: isHovered ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontSize: '2.5rem', fontWeight: 600, margin: 0, letterSpacing: '-0.02em' }}
                        className={isHovered ? 'text-glow' : ''}
                      >
                        {service.title}
                      </motion.h3>
                    </div>
                    
                    <motion.div 
                      initial={false}
                      animate={{ rotate: isHovered ? 45 : 0, scale: isHovered ? 1.2 : 1, color: isHovered ? 'var(--accent-secondary)' : 'var(--text-tertiary)' }}
                    >
                      <Icon size={32} />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <motion.p 
                          initial={{ y: -10 }}
                          animate={{ y: 0 }}
                          style={{ paddingLeft: '5rem', paddingTop: '1.5rem', paddingRight: '2rem', color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: 1.6, maxWidth: '80%' }}
                        >
                          {service.desc}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .capabilities-layout { grid-template-columns: 1fr !important; }
          .capabilities-layout h3 { font-size: 1.75rem !important; }
        }
      `}</style>
    </section>
  );
};

export default Capabilities;
