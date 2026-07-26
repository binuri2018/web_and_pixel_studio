import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const MagneticLink = ({ children, href }: { children: React.ReactNode, href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
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
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, display: 'inline-block' }}
      className="hover-target"
      whileHover={{ color: 'white' }}
    >
      {children}
    </motion.a>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'rgba(3, 3, 3, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        padding: scrolled ? '1rem 0' : '2rem 0'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" className="hover-target" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'white' }}>
          <img src="/logo.jpeg" alt="Web & Pixel Studio Logo" style={{ height: '48px', objectFit: 'contain' }} />
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}>Web & Pixel Studio</span>
        </a>

        <div style={{ display: 'none', gap: '3rem', alignItems: 'center' }} className="desktop-nav">
          <MagneticLink href="#services">Capabilities</MagneticLink>
          <MagneticLink href="#work">Work</MagneticLink>
          <MagneticLink href="#about">About</MagneticLink>
          <MagneticLink href="#contact">Contact</MagneticLink>
          
          <a href="#contact" className="btn-primary hover-target" style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem' }}>
            <span>Start Project</span>
          </a>
        </div>

        <button 
          className="mobile-toggle hover-target" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex' }}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
