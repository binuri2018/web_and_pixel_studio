import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

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
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'var(--glass-bg)', padding: '0.75rem 1.25rem', borderRadius: '2rem', border: '1px solid var(--glass-border)', marginBottom: '2.5rem', backdropFilter: 'blur(10px)' }}
            >
              <Sparkles size={18} color="var(--accent-secondary)" />
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Premium Web & Software Studio</span>
            </motion.div>
            
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
              style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}
            >
              <a href="#contact" className="btn-primary hover-target">
                <span>Start Project</span>
                <ArrowRight size={20} style={{ marginLeft: '0.75rem', position: 'relative', zIndex: 2 }} />
              </a>
              <a href="https://wa.me/94702711249" target="_blank" rel="noopener noreferrer" className="btn-secondary hover-target" style={{ gap: '0.75rem', borderColor: 'rgba(37, 211, 102, 0.4)' }}>
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
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', width: '100%', paddingBottom: '85%', borderRadius: '2rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 30px 60px -20px rgba(139, 92, 246, 0.3)', background: 'linear-gradient(145deg, #111, #000)' }}
            >
              <img 
                src="/hero_visual.png" 
                alt="Premium Digital Experience" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 40%)' }}></div>
              

            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 992px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 4rem !important; }
          .hero-grid h1 { font-size: 3rem !important; }
          .hero-image-container { padding: 0 2rem; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
