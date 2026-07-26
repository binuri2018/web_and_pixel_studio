import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const steps = [
  { id: '01', title: 'Discover', desc: 'Deep dive into your business, goals, and technical requirements to define a strategic roadmap. We leave no stone unturned in understanding your domain.' },
  { id: '02', title: 'Design', desc: 'Crafting premium, intuitive user experiences and interfaces that align with your brand identity and captivate your audience.' },
  { id: '03', title: 'Develop', desc: 'Building robust, scalable solutions using modern tech stacks, clean architecture, and rigorous agile methodologies.' },
  { id: '04', title: 'Launch', desc: 'Comprehensive QA testing followed by a seamless, zero-downtime deployment to production environments.' },
  { id: '05', title: 'Grow', desc: 'Ongoing strategic support, analytics monitoring, and continuous optimization to ensure your tech scales as you do.' },
];

const HowItWorks = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="section" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }} ref={containerRef}>
      
      {/* Abstract Backgrounds */}
      <div className="bg-glow-blur" style={{ top: '30%', left: '-10%', width: '50vw', height: '50vw', background: 'rgba(6, 182, 212, 0.15)' }}></div>
      <div className="bg-glow-blur" style={{ bottom: '-10%', right: '-10%', width: '40vw', height: '40vw', background: 'rgba(139, 92, 246, 0.15)' }}></div>

      <div className="container" style={{ maxWidth: '1000px', position: 'relative', zIndex: 2 }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ textAlign: 'center', marginBottom: '8rem' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1rem', borderRadius: '2rem', border: '1px solid var(--accent-secondary)', background: 'rgba(6, 182, 212, 0.1)', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Methodology</span>
          </div>
          <h2 style={{ fontSize: '4rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            How We Build <br/><span className="text-gradient-accent">Excellence.</span>
          </h2>
        </motion.div>

        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          {/* Background Line */}
          <div style={{ position: 'absolute', left: '60px', top: 0, bottom: 0, width: '1px', background: 'var(--border-color)', zIndex: 0 }}></div>
          
          {/* Glowing Animated Progress Line */}
          <motion.div 
            style={{ 
              position: 'absolute', left: '59px', top: 0, bottom: 0, width: '3px', 
              background: 'linear-gradient(to bottom, var(--accent-secondary), var(--accent-primary))',
              scaleY,
              transformOrigin: 'top',
              zIndex: 1,
              boxShadow: '0 0 20px var(--accent-secondary), 0 0 40px var(--accent-primary)'
            }} 
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem', position: 'relative', zIndex: 2 }}>
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start', position: 'relative' }}
                className="hover-target"
              >
                {/* 3D Floating Number */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotateZ: 5 }}
                  style={{ 
                    width: '90px', height: '90px', borderRadius: '50%', 
                    background: 'var(--bg-primary)', border: '1px solid var(--glass-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)',
                    flexShrink: 0, zIndex: 2, position: 'relative',
                    marginLeft: '-45px',
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,255,255,0.05)',
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  <span style={{ 
                    background: 'linear-gradient(135deg, #fff, #a1a1aa)', 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent',
                    transform: 'translateZ(20px)'
                  }}>
                    {step.id}
                  </span>
                </motion.div>
                
                <div style={{ paddingTop: '0.5rem' }}>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '1rem', letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}>{step.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
