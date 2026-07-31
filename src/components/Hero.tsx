import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Text animation variants
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        staggerChildren: 0.05,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50, rotate: -5 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number] },
    },
  };


  return (
    <section 
      ref={containerRef}
      className="section" 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        paddingTop: '8rem', 
        overflow: 'hidden',
        perspective: '1000px'
      }}
    >
      <div className="bg-glow-blur" style={{ top: '10%', left: '10%', width: '50vw', height: '50vw', background: 'var(--accent-primary)' }}></div>
      <div className="bg-glow-blur" style={{ bottom: '-10%', right: '0%', width: '40vw', height: '40vw', background: 'var(--accent-secondary)' }}></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">
          
          <motion.div style={{ zIndex: 10 }}>

            
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '4.75rem', lineHeight: 1.1, fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
              <div style={{ overflow: 'hidden', paddingBottom: '0.2em' }}>
                <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                  Building <span className="outline-text">Iconic</span>
                </motion.div>
              </div>
              <motion.div 
                variants={sentence}
                initial="hidden"
                animate="visible"
                style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em' }}
              >
                {"Digital Experiences".split(" ").map((word, wordIndex) => (
                  <span key={wordIndex} style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
                    {word.split("").map((char, index) => (
                      <motion.span key={char + "-" + index} variants={letter} className="text-gradient-accent">
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.div>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '90%', lineHeight: 1.6, fontWeight: 400 }}
            >
              We craft award-winning websites, robust software, and immersive brand experiences for companies that refuse to blend in.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="hero-cta-buttons"
              style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}
            >
              <a href="#contact" className="btn-primary hover-target" style={{ boxShadow: '0 0 15px rgba(139, 92, 246, 0.4), 0 0 30px rgba(139, 92, 246, 0.2)' }}>
                <span>Start Project</span>
                <ArrowRight size={20} style={{ marginLeft: '0.75rem', position: 'relative', zIndex: 2 }} />
              </a>
              <a href="https://wa.me/94702711249" target="_blank" rel="noopener noreferrer" className="btn-secondary hover-target" style={{ gap: '0.75rem', borderColor: 'rgba(37, 211, 102, 0.4)', boxShadow: '0 0 15px rgba(37, 211, 102, 0.25), 0 0 30px rgba(37, 211, 102, 0.1)' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                WhatsApp Us
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            style={{ y: y1, opacity, rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="hero-image-container"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}
            >
              {/* Outer Pulsing Glow Ring */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: '-4%',
                  borderRadius: '50%',
                  border: '1px solid rgba(139, 92, 246, 0.15)',
                  boxShadow: '0 0 60px rgba(139, 92, 246, 0.08), inset 0 0 60px rgba(139, 92, 246, 0.05)',
                  pointerEvents: 'none'
                }}
              />

              {/* Orbiting Ring 1 — Slow, tilted */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: '-8%',
                  borderRadius: '50%',
                  border: '1px dashed rgba(6, 182, 212, 0.2)',
                  transform: 'rotateX(60deg) rotateZ(0deg)',
                  transformStyle: 'preserve-3d',
                  pointerEvents: 'none'
                }}
              >
                {/* Orbiting dot */}
                <motion.div style={{
                  position: 'absolute', top: '0%', left: '50%', width: '8px', height: '8px',
                  borderRadius: '50%', background: 'var(--accent-secondary)',
                  boxShadow: '0 0 12px var(--accent-secondary), 0 0 24px rgba(6, 182, 212, 0.3)',
                  transform: 'translate(-50%, -50%)'
                }} />
              </motion.div>

              {/* Orbiting Ring 2 — Faster, opposite tilt */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: '-2%',
                  borderRadius: '50%',
                  border: '1px solid rgba(139, 92, 246, 0.12)',
                  transform: 'rotateX(70deg) rotateY(20deg)',
                  transformStyle: 'preserve-3d',
                  pointerEvents: 'none'
                }}
              >
                <motion.div style={{
                  position: 'absolute', bottom: '0%', left: '50%', width: '6px', height: '6px',
                  borderRadius: '50%', background: 'var(--accent-primary)',
                  boxShadow: '0 0 10px var(--accent-primary), 0 0 20px rgba(139, 92, 246, 0.3)',
                  transform: 'translate(-50%, 50%)'
                }} />
              </motion.div>

              {/* Central Image Container */}
              <div style={{
                position: 'absolute',
                inset: '10%',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid rgba(255,255,255,0.08)',
                boxShadow: '0 30px 80px -20px rgba(139, 92, 246, 0.35), 0 0 40px rgba(6, 182, 212, 0.1), inset 0 0 30px rgba(0,0,0,0.5)',
                background: 'linear-gradient(145deg, #0a0a14, #050508)'
              }}>
                <img 
                  src="/hero_visual.png" 
                  alt="Premium Digital Experience" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                />
                {/* Inner radial gradient overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, transparent 40%, rgba(3,3,7,0.6) 100%)' }} />
                {/* Bottom fade */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3,3,7,0.7) 0%, transparent 50%)' }} />
                {/* Scan Line Effect */}
                <motion.div
                  animate={{ top: ['-10%', '110%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
                  style={{
                    position: 'absolute', left: 0, right: 0, height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.4), transparent)',
                    boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)',
                    pointerEvents: 'none'
                  }}
                />
              </div>

              {/* Floating Element: Code Snippet */}
              <motion.div
                animate={{ y: [-8, 8, -8], x: [-3, 3, -3] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', top: '6%', right: '2%',
                  background: 'rgba(10, 10, 20, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.5)',
                  zIndex: 10,
                  transform: 'translateZ(40px)'
                }}
              >
                <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444' }} />
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B' }} />
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.6rem', lineHeight: 1.6 }}>
                  <span style={{ color: '#C084FC' }}>const</span> <span style={{ color: '#67E8F9' }}>studio</span> <span style={{ color: '#94A3B8' }}>=</span> <span style={{ color: '#FDE68A' }}>{'{'}</span><br/>
                  <span style={{ color: '#94A3B8' }}>{'  '}</span><span style={{ color: '#67E8F9' }}>craft</span><span style={{ color: '#94A3B8' }}>:</span> <span style={{ color: '#86EFAC' }}>"pixel-perfect"</span><br/>
                  <span style={{ color: '#FDE68A' }}>{'}'}</span><span style={{ color: '#94A3B8' }}>;</span>
                </div>
              </motion.div>

              {/* Floating Element: Color Palette */}
              <motion.div
                animate={{ y: [6, -10, 6], rotate: [-4, 2, -4] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                style={{
                  position: 'absolute', bottom: '8%', left: '0%',
                  background: 'rgba(10, 10, 20, 0.8)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  borderRadius: '14px',
                  padding: '10px 14px',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.5)',
                  zIndex: 10,
                  transform: 'translateZ(30px)'
                }}
              >
                <div style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Palette</div>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {['#8B5CF6', '#06B6D4', '#EC4899', '#F59E0B', '#10B981'].map((c, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.3 }}
                      style={{ width: '18px', height: '18px', borderRadius: '6px', background: c, border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Floating Element: Responsive Preview */}
              <motion.div
                animate={{ y: [-6, 8, -6], x: [4, -4, 4] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                style={{
                  position: 'absolute', bottom: '16%', right: '-2%',
                  background: 'rgba(10, 10, 20, 0.8)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.5)',
                  zIndex: 10,
                  display: 'flex', alignItems: 'center', gap: '8px',
                  transform: 'translateZ(50px)'
                }}
              >
                <div style={{ width: '26px', height: '18px', borderRadius: '3px', border: '1.5px solid #67E8F9', position: 'relative' }}>
                  <div style={{ position: 'absolute', bottom: '-4px', left: '25%', right: '25%', height: '2px', background: '#67E8F9', borderRadius: '1px' }} />
                </div>
                <div style={{ width: '12px', height: '18px', borderRadius: '2px', border: '1.5px solid #C084FC' }} />
                <div style={{ width: '14px', height: '16px', borderRadius: '2px', border: '1.5px solid #F472B6' }} />
              </motion.div>

              {/* Floating Element: Performance Badge (top-left) */}
              <motion.div
                animate={{ y: [5, -7, 5] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                style={{
                  position: 'absolute', top: '14%', left: '-2%',
                  background: 'rgba(10, 10, 20, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.5)',
                  zIndex: 10,
                  display: 'flex', alignItems: 'center', gap: '8px',
                  transform: 'translateZ(35px)'
                }}
              >
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: 'conic-gradient(#10B981 0deg, #10B981 330deg, rgba(255,255,255,0.1) 330deg, rgba(255,255,255,0.1) 360deg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(10,10,20,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', fontWeight: 800, color: '#10B981' }}>
                    98
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#fff' }}>Speed</div>
                  <div style={{ fontSize: '0.45rem', color: '#10B981' }}>Optimized</div>
                </div>
              </motion.div>

              {/* Ambient Particle Dots */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  animate={{
                    y: [0, -20 - Math.random() * 20, 0],
                    x: [0, (Math.random() - 0.5) * 30, 0],
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: Math.random() * 4
                  }}
                  style={{
                    position: 'absolute',
                    width: `${3 + Math.random() * 4}px`,
                    height: `${3 + Math.random() * 4}px`,
                    borderRadius: '50%',
                    background: i % 2 === 0 ? 'var(--accent-secondary)' : 'var(--accent-primary)',
                    boxShadow: `0 0 8px ${i % 2 === 0 ? 'rgba(6,182,212,0.5)' : 'rgba(139,92,246,0.5)'}`,
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    pointerEvents: 'none'
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 992px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; text-align: center; }
          .hero-grid h1 { font-size: clamp(2.2rem, 8vw, 3.5rem) !important; }
          .hero-image-container { max-width: 380px; margin: 0 auto; padding: 0 1rem; }
          .hero-cta-buttons { justify-content: center; }
        }
        @media (max-width: 600px) {
          .hero-grid h1 { font-size: clamp(1.9rem, 9vw, 2.8rem) !important; }
          .hero-cta-buttons { flex-direction: column !important; align-items: stretch !important; width: 100%; }
          .hero-cta-buttons a { text-align: center; justify-content: center; }
          .hero-grid p { font-size: 1rem !important; max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
