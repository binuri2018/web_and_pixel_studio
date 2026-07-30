import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Sparkles, Mail, BookOpen, GraduationCap, FileText } from 'lucide-react';

// Custom sparkles animation component for Invitely
const SparklesBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.8 }}>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${15 + Math.random() * 70}%`,
            color: '#F472B6',
          }}
          animate={{
            scale: [0.5, 1.2, 0.5],
            opacity: [0.2, 0.8, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        >
          <Sparkles size={12 + Math.random() * 12} />
        </motion.div>
      ))}
    </div>
  );
};

// Custom floating items for Project Pulse
const AcademicFloatingElements = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.6 }}>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-cyan-400"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 5 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        >
          {i % 2 === 0 ? <GraduationCap size={16} /> : <FileText size={14} />}
        </motion.div>
      ))}
    </div>
  );
};

const BrandCard = ({
  brandName,
  category,
  description,
  buttonText,
  href,
  gradientType, // 'purple' | 'cyan'
  visualType // 'invitely' | 'pulse'
}: {
  brandName: string;
  category: string;
  description: string;
  buttonText: string;
  href: string;
  gradientType: 'purple' | 'cyan';
  visualType: 'invitely' | 'pulse';
}) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Mouse positions for 3D parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.6 };
  const cardRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const cardRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  // Parallax layers (different translation amounts to create depth)
  const bgTranslateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const bgTranslateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-12, 12]), springConfig);

  const midTranslateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-25, 25]), springConfig);
  const midTranslateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-25, 25]), springConfig);

  const topTranslateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-40, 40]), springConfig);
  const topTranslateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-40, 40]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const glowColor = gradientType === 'purple' 
    ? 'rgba(139, 92, 246, 0.15)' 
    : 'rgba(6, 182, 212, 0.15)';

  const cardBorderActive = gradientType === 'purple'
    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.4))'
    : 'linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(59, 130, 246, 0.4))';

  return (
    <motion.a
      ref={(el) => {
        cardRef.current = el;
        inViewRef(el);
      }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX: cardRotateX,
        rotateY: cardRotateY,
        transformStyle: 'preserve-3d',
        perspective: '1500px',
        display: 'block',
        textDecoration: 'none',
        position: 'relative',
        borderRadius: '2rem',
        cursor: 'pointer'
      }}
      className="family-card-link"
    >
      {/* Premium Outer Glowing/Border Layer */}
      <div
        style={{
          position: 'absolute',
          inset: -1,
          borderRadius: '2.05rem',
          padding: '1px',
          background: isHovered 
            ? cardBorderActive 
            : 'rgba(255, 255, 255, 0.06)',
          transition: 'background 0.5s ease',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Main Card Body */}
      <div
        className="glass-card"
        style={{
          height: '100%',
          minHeight: '520px',
          background: gradientType === 'purple'
            ? 'linear-gradient(145deg, rgba(25, 15, 35, 0.7) 0%, rgba(10, 5, 15, 0.85) 100%)'
            : 'linear-gradient(145deg, rgba(10, 20, 30, 0.7) 0%, rgba(5, 10, 15, 0.85) 100%)',
          borderColor: 'transparent',
          boxShadow: isHovered 
            ? `0 30px 60px -15px ${glowColor}, 0 0 40px 0 ${glowColor}` 
            : '0 15px 35px 0 rgba(0, 0, 0, 0.4)',
          transition: 'box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: '3rem 2.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Parallax Background Glow */}
        <motion.div
          style={{
            position: 'absolute',
            inset: '-10%',
            background: gradientType === 'purple'
              ? 'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.15) 0%, rgba(139, 92, 246, 0.05) 60%, transparent 100%)'
              : 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.05) 60%, transparent 100%)',
            x: bgTranslateX,
            y: bgTranslateY,
            pointerEvents: 'none',
            zIndex: 0,
            transform: 'translateZ(-10px)'
          }}
        />

        {/* Content Side (Top half on flex layout) */}
        <div style={{ position: 'relative', zIndex: 10, transform: 'translateZ(30px)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.04)', padding: '0.4rem 0.8rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: gradientType === 'purple' ? '#E9D5FF' : '#BAE6FD', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {category}
            </span>
          </div>

          <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '1rem', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {brandName}
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '90%' }}>
            {description}
          </p>
        </div>

        {/* Visual Showcase (Middle/Lower Area) */}
        <div 
          style={{ 
            height: '220px', 
            position: 'relative', 
            margin: '1rem 0 2rem 0', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            transformStyle: 'preserve-3d',
            pointerEvents: 'none',
            zIndex: 5
          }}
        >
          {visualType === 'invitely' ? (
            <>
              <SparklesBackground />
              
              {/* Floating Phone/Invite Mockup (Middle Layer) */}
              <motion.div
                style={{
                  position: 'relative',
                  width: '130px',
                  height: '190px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '12px',
                  x: midTranslateX,
                  y: midTranslateY,
                  transform: 'translateZ(20px)',
                }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -1.5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Mock Card Content */}
                <div style={{ width: '30%', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', marginBottom: '10px' }}></div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', background: 'rgba(255, 71, 150, 0.05)', border: '1px solid rgba(236, 72, 153, 0.1)', borderRadius: '8px', padding: '10px', justifyContent: 'center', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.45rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F472B6', fontWeight: 700 }}>Save the Date</span>
                  <div style={{ width: '40px', height: '1px', background: 'rgba(236,72,153,0.3)', margin: '2px 0' }}></div>
                  <span style={{ fontSize: '0.35rem', color: 'rgba(255,255,255,0.4)' }}>Wedding Reception</span>
                </div>
                <div style={{ width: '100%', height: '14px', background: '#8B5CF6', borderRadius: '7px', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '20%', height: '2px', background: 'white', borderRadius: '1px' }}></div>
                </div>
              </motion.div>

              {/* Floating Envelope Back (Back Layer) */}
              <motion.div
                style={{
                  position: 'absolute',
                  right: '12%',
                  top: '15%',
                  width: '90px',
                  height: '75px',
                  background: 'rgba(139, 92, 246, 0.1)',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '8px',
                  x: bgTranslateX,
                  y: bgTranslateY,
                  transform: 'translateZ(10px) rotate(15deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#C084FC',
                  opacity: 0.8
                }}
                animate={{
                  y: [0, 8, 0],
                  rotate: [15, 12, 15]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <Mail size={24} style={{ opacity: 0.6 }} />
              </motion.div>

              {/* Floating Sparkly Card Front (Top Layer) */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: '12%',
                  bottom: '10%',
                  width: '100px',
                  height: '80px',
                  background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '10px',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                  x: topTranslateX,
                  y: topTranslateY,
                  transform: 'translateZ(40px) rotate(-12deg)',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '8px',
                  justifyContent: 'space-between'
                }}
                animate={{
                  y: [0, -12, 0],
                  rotate: [-12, -15, -12]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Sparkles size={10} color="#F472B6" />
                  <div style={{ width: '20px', height: '3px', background: 'rgba(255,255,255,0.2)', borderRadius: '1.5px' }}></div>
                </div>
                <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px' }}></div>
                <div style={{ width: '70%', height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px' }}></div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ width: '30px', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                </div>
              </motion.div>
            </>
          ) : (
            <>
              <AcademicFloatingElements />
              
              {/* Floating Laptop/Dashboard Mockup (Middle Layer) */}
              <motion.div
                style={{
                  position: 'relative',
                  width: '180px',
                  height: '120px',
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '3px solid #1E293B',
                  borderRadius: '12px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  x: midTranslateX,
                  y: midTranslateY,
                  transform: 'translateZ(20px)',
                }}
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 1, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              >
                {/* Dashboard Header */}
                <div style={{ height: '14px', background: '#0F172A', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', padding: '0 6px', gap: '3px' }}>
                  <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#EF4444' }}></div>
                  <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#F59E0B' }}></div>
                  <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#10B981' }}></div>
                  <div style={{ width: '30px', height: '4px', background: '#1E293B', borderRadius: '2px', marginLeft: '6px' }}></div>
                </div>
                {/* Dashboard Body */}
                <div style={{ flex: 1, padding: '8px', display: 'flex', gap: '6px' }}>
                  {/* Left panel */}
                  <div style={{ width: '35px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', padding: '4px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}></div>
                    <div style={{ width: '70%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}></div>
                    <div style={{ width: '80%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}></div>
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <div style={{ flex: 1, height: '24px', background: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)', borderRadius: '4px', opacity: 0.8 }}></div>
                      <div style={{ flex: 1, height: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}></div>
                    </div>
                    {/* Small progress lines */}
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}></div>
                    <div style={{ width: '85%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}></div>
                  </div>
                </div>
                {/* Laptop Keyboard Lip */}
                <div style={{ height: '4px', background: '#0F172A', borderTop: '1px solid #1E293B' }}></div>
              </motion.div>

              {/* Floating Book (Back Layer) */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: '10%',
                  top: '20%',
                  width: '65px',
                  height: '80px',
                  background: 'rgba(6, 182, 212, 0.12)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '6px',
                  padding: '8px',
                  x: bgTranslateX,
                  y: bgTranslateY,
                  transform: 'translateZ(10px) rotate(-15deg)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                animate={{
                  y: [0, 10, 0],
                  rotate: [-15, -12, -15]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }}
              >
                <div style={{ width: '40%', height: '4px', background: 'rgba(6, 182, 212, 0.5)', borderRadius: '2px' }}></div>
                <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px' }}></div>
                <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px' }}></div>
                <div style={{ width: '80%', height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px' }}></div>
              </motion.div>

              {/* Floating Academic Document (Top Layer) */}
              <motion.div
                style={{
                  position: 'absolute',
                  right: '12%',
                  bottom: '10%',
                  width: '80px',
                  height: '100px',
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                  padding: '10px',
                  x: topTranslateX,
                  y: topTranslateY,
                  transform: 'translateZ(40px) rotate(10deg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [10, 14, 10]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.1
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <BookOpen size={10} color="#22D3EE" />
                  <div style={{ width: '25px', height: '3px', background: 'rgba(255,255,255,0.2)', borderRadius: '1.5px' }}></div>
                </div>
                <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '1.5px' }}></div>
                <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '1.5px' }}></div>
                <div style={{ width: '60%', height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '1.5px' }}></div>
                <div style={{ marginTop: 'auto', display: 'flex', gap: '3px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#22D3EE' }}></div>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }}></div>
                </div>
              </motion.div>
            </>
          )}
        </div>

        {/* Action Button Area (Bottom half) */}
        <div style={{ position: 'relative', zIndex: 10, transform: 'translateZ(20px)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: gradientType === 'purple' ? '#C084FC' : '#22D3EE',
              fontWeight: 600,
              fontSize: '1.05rem',
              transition: 'all 0.3s ease',
            }}
          >
            <span>{buttonText}</span>
            <motion.div
              animate={isHovered ? { x: 6 } : { x: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <ArrowRight size={18} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

const DigitalFamily = () => {
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section 
      id="ecosystem" 
      ref={sectionRef} 
      className="section" 
      style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        padding: '10rem 0',
        background: 'var(--bg-secondary)' 
      }}
    >
      {/* Background ambient glow matching Proof & Contact transitions */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full blur-[160px] pointer-events-none" 
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, rgba(6, 182, 212, 0.02) 50%, transparent 100%)',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '6rem', maxWidth: '800px', margin: '0 auto 6rem auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              background: 'rgba(255,255,255,0.03)', 
              padding: '0.5rem 1.2rem', 
              borderRadius: '2rem', 
              border: '1px solid rgba(255,255,255,0.06)', 
              marginBottom: '1.5rem' 
            }}
          >
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Growing Beyond Client Solutions
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
              fontWeight: 800, 
              marginBottom: '1.5rem', 
              lineHeight: 1.1,
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.03em'
            }}
          >
            Part of Our <span className="text-gradient-accent">Digital Family</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ 
              fontSize: '1.15rem', 
              color: 'var(--text-secondary)', 
              lineHeight: 1.6,
              maxWidth: '720px',
              margin: '0 auto'
            }}
          >
            We're passionate about creating meaningful digital experiences—not only for our clients but also through our own growing family of brands. Each venture reflects our commitment to innovation, thoughtful design, and solving real-world challenges through technology.
          </motion.p>
        </div>

        {/* Side-by-side Desktop Layout, Stacked Mobile Layout */}
        <div className="family-cards-grid">
          <BrandCard
            brandName="Invitely"
            category="Digital Invitation Platform"
            description="Create elegant online invitations for weddings, birthdays, corporate events, graduations, baby showers, and every special occasion. Beautifully designed, easy to share, and crafted to make every celebration unforgettable."
            buttonText="Explore Invitely"
            href="https://invitely.site"
            gradientType="purple"
            visualType="invitely"
          />

          <BrandCard
            brandName="Project Pulse"
            category="Academic Support Platform"
            description="Helping students succeed through smarter academic support, project guidance, learning resources, and productivity-focused digital solutions designed for modern education."
            buttonText="Explore Project Pulse"
            href="https://projectpulse01.netlify.app"
            gradientType="cyan"
            visualType="pulse"
          />
        </div>
      </div>

      <style>{`
        .family-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.5rem;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 992px) {
          .family-cards-grid {
            grid-template-columns: 1fr;
            max-width: 600px;
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default DigitalFamily;
