import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Send, ArrowRight } from 'lucide-react';

const FORMSUBMIT_EMAIL = 'Web.pstudio.001@gmail.com';

const MagneticButton = ({ children, className = '', type = 'button' }: { children: React.ReactNode, className?: string, type?: 'button' | 'submit' | 'reset' }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className={`btn-primary hover-target ${className}`}
    >
      {children}
    </motion.button>
  );
};

const FloatingInput = ({ label, name, type = 'text', textarea = false, value, onChange, required, autoComplete }: { label: string, name: string, type?: string, textarea?: boolean, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, required?: boolean, autoComplete?: string }) => {
  const [isFocused, setIsFocused] = useState(false);
  const active = isFocused || value.length > 0;

  const style = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `2px solid ${active ? 'var(--accent-primary)' : 'var(--border-color)'}`,
    color: 'white',
    fontSize: '1.25rem',
    padding: '0.5rem 0',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    fontFamily: 'inherit',
    resize: 'none' as const
  };

  return (
    <div style={{ position: 'relative', marginTop: '2rem' }}>
      <motion.label
        animate={{
          y: active ? -25 : 10,
          scale: active ? 0.8 : 1,
          color: active ? 'var(--accent-secondary)' : 'var(--text-secondary)'
        }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          pointerEvents: 'none',
          transformOrigin: 'left top',
          fontSize: '1.25rem'
        }}
      >
        {label}
      </motion.label>
      {textarea ? (
        <textarea 
          name={name}
          rows={4} 
          style={style}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          autoComplete={autoComplete}
        />
      ) : (
        <input 
          name={name}
          type={type}
          style={style}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          autoComplete={autoComplete}
        />
      )}
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  return (
    <section id="contact" className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-secondary)', padding: '15rem 0' }}>
      <div className="bg-glow-blur" style={{ bottom: '-20%', left: '-20%', width: '60vw', height: '60vw', background: 'rgba(139, 92, 246, 0.15)' }}></div>
      <div className="bg-glow-blur" style={{ top: '-10%', right: '-10%', width: '40vw', height: '40vw', background: 'rgba(6, 182, 212, 0.1)' }}></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }} className="contact-grid">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 style={{ fontSize: '5rem', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '2rem', fontFamily: 'var(--font-display)' }}>
              Let's create <br/>
              <span className="text-gradient-accent">something</span> <br/>
              <span className="outline-text">extraordinary.</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '80%' }}>
              Ready to elevate your digital presence? We're currently taking on new projects for Q4.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Email Us</div>
                <a href={`mailto:${FORMSUBMIT_EMAIL}`} className="hover-target" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  {FORMSUBMIT_EMAIL} <ArrowRight size={20} className="text-gradient-accent" />
                </a>
              </div>
              <div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Call Us</div>
                <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 500 }}>
                  +94 70 271 1249
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            action={`https://formsubmit.co/${FORMSUBMIT_EMAIL}`}
            method="POST"
            style={{ padding: '3rem', background: 'rgba(255,255,255,0.02)', borderRadius: '2rem', border: '1px solid var(--border-color)', backdropFilter: 'blur(20px)' }}
          >
            {/* FormSubmit hidden configuration fields */}
            <input type="hidden" name="_subject" value="New Project Inquiry — Web & Pixel Studio" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            <h3 style={{ fontSize: '2rem', marginBottom: '2rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Project Inquiry</h3>
            <FloatingInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              autoComplete="name"
            />
            <FloatingInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              autoComplete="email"
            />
            <FloatingInput
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              autoComplete="off"
            />
            <FloatingInput
              label="Tell us about your project"
              name="message"
              textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />

            <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'flex-end' }}>
              <MagneticButton type="submit">
                <span style={{ fontSize: '1.25rem', padding: '0.5rem 1rem' }}>Send Message</span>
                <Send size={20} style={{ marginLeft: '0.5rem' }} />
              </MagneticButton>
            </div>
          </motion.form>

        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 4rem !important; }
          #contact h2 { font-size: 3.5rem !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
