import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight } from 'lucide-react';

const AnimatedCounter = ({ end, suffix = '', duration = 2 }: { end: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const PortfolioCard = ({ title, category, imgIndex = 0, image, link }: { title: string, category: string, imgIndex?: number, image?: string, link?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const images = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  const bgImage = image || images[imgIndex];

  const CardWrapper = link ? motion.a : motion.div;
  const linkProps = link ? { href: link, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <CardWrapper
      {...linkProps}
      ref={cardRef as any}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        position: 'relative', 
        height: '450px', 
        borderRadius: '1.5rem', 
        overflow: 'hidden', 
        cursor: 'none',
        display: 'block',
        textDecoration: 'none'
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)', zIndex: 1 }}></div>
      <motion.div 
        style={{ 
          position: 'absolute', inset: 0, 
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      
      <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', zIndex: 2 }}>
        <h3 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.5rem', fontFamily: 'var(--font-display)', color: 'white' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{category}</p>
      </div>

      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'var(--accent-primary)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 10,
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.5,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
      >
        <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>View</span>
      </motion.div>
    </CardWrapper>
  );
};

const Proof = () => {
  return (
    <section id="work" className="section" style={{ position: 'relative', background: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Massive Background Typography */}
        <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', width: '100%', textAlign: 'center', pointerEvents: 'none', zIndex: 0 }}>
          <h2 className="outline-text" style={{ fontSize: '15vw', fontWeight: 800, whiteSpace: 'nowrap', opacity: 0.1, fontFamily: 'var(--font-display)', margin: 0, lineHeight: 0.8 }}>
            IMPACT
          </h2>
        </div>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '8rem', paddingTop: '4rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '4.5rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, fontFamily: 'var(--font-display)' }}
          >
            Real Solutions.<br/>
            <span className="text-gradient-accent">Real Impact.</span>
          </motion.h2>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '10rem', position: 'relative', zIndex: 1 }}>
          {[
            { value: 100, suffix: '%', label: 'Commitment to Quality' },
            { value: 99, suffix: '.9%', label: 'Uptime & Reliability' },
            { value: 50, suffix: '+', label: 'Enterprise Projects' },
            { value: 10, suffix: 'x', label: 'Faster Time-to-Market' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ fontSize: '4.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)', letterSpacing: '-0.05em' }}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Portfolio Previews */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '3rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>Selected Work</h3>
            <a href="#" className="hover-target" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, fontSize: '1.1rem' }}>
              View All <ArrowUpRight size={20} />
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            <PortfolioCard 
              title="Lumina Health" 
              category="Web App & AI" 
              image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            />
            <PortfolioCard 
              title="Aether Logistics" 
              category="Dashboard Design" 
              image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            />
            <PortfolioCard 
              title="Ceylon Crunch" 
              category="Web App" 
              image="/ceylon-crunch.png" 
              link="https://ceyloncrunch.netlify.app/" 
            />
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          #work h2.proof-heading { font-size: clamp(2rem, 8vw, 3.5rem) !important; }
          #work .proof-work-header { flex-direction: column; align-items: flex-start !important; gap: 1rem; }
          #work .proof-work-header h3 { font-size: clamp(1.5rem, 6vw, 2.5rem) !important; }
        }
        @media (max-width: 600px) {
          #work .proof-portfolio-card { height: 320px !important; }
          #work .proof-stat-value { font-size: 3rem !important; }
        }
        @media (max-width: 480px) {
          #work .proof-stat-value { font-size: 2.5rem !important; }
          #work .proof-portfolio-card { height: 260px !important; }
          #work .proof-portfolio-card h3 { font-size: 1.5rem !important; }
        }
      `}</style>
    </section>
  );
};

export default Proof;
