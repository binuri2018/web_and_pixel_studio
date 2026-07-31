import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, ExternalLink } from 'lucide-react';

const BrandCard = ({
  brandName,
  category,
  description,
  buttonText,
  href,
  gradientType,
  logoSrc,
  showcaseImg,
  accentColor,
  accentColorSecondary,
}: {
  brandName: string;
  category: string;
  description: string;
  buttonText: string;
  href: string;
  gradientType: 'purple' | 'cyan';
  logoSrc: string;
  showcaseImg: string;
  accentColor: string;
  accentColorSecondary: string;
}) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.6 };
  const cardRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const cardRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const glowColor = gradientType === 'purple'
    ? 'rgba(139, 92, 246, 0.18)'
    : 'rgba(6, 182, 212, 0.18)';

  const cardBorderActive = gradientType === 'purple'
    ? `linear-gradient(135deg, ${accentColor}66, ${accentColorSecondary}66)`
    : `linear-gradient(135deg, ${accentColor}66, ${accentColorSecondary}66)`;

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
        cursor: 'pointer',
      }}
      className="family-card-link"
    >
      {/* Border Glow */}
      <div
        style={{
          position: 'absolute',
          inset: -1,
          borderRadius: '2.05rem',
          padding: '1px',
          background: isHovered ? cardBorderActive : 'rgba(255, 255, 255, 0.06)',
          transition: 'background 0.5s ease',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Card Body */}
      <div
        className="glass-card family-card-body"
        style={{
          height: '100%',
          background: gradientType === 'purple'
            ? 'linear-gradient(145deg, rgba(25, 15, 35, 0.75) 0%, rgba(10, 5, 15, 0.9) 100%)'
            : 'linear-gradient(145deg, rgba(10, 20, 30, 0.75) 0%, rgba(5, 10, 15, 0.9) 100%)',
          borderColor: 'transparent',
          boxShadow: isHovered
            ? `0 30px 60px -15px ${glowColor}, 0 0 40px 0 ${glowColor}`
            : '0 15px 35px 0 rgba(0, 0, 0, 0.4)',
          transition: 'box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Top Section: Logo + Category badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
          {/* Logo */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '1rem',
              overflow: 'hidden',
              background: gradientType === 'purple'
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(255,255,255,0.06)',
              border: `1px solid ${accentColor}33`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: gradientType === 'purple' ? '0' : '8px',
              backdropFilter: 'blur(10px)',
              flexShrink: 0,
            }}
          >
            <img
              src={logoSrc}
              alt={`${brandName} logo`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: gradientType === 'purple' ? 'cover' : 'contain',
                filter: gradientType === 'cyan' ? 'invert(1)' : 'none',
              }}
            />
          </div>

          {/* Category Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: `${accentColor}18`,
              padding: '0.35rem 0.75rem',
              borderRadius: '2rem',
              border: `1px solid ${accentColor}30`,
            }}
          >
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: accentColor,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {category}
            </span>
          </div>
        </div>

        {/* Brand Name + Description */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3
            style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 800,
              color: 'white',
              marginBottom: '0.85rem',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {brandName}
          </h3>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
              lineHeight: 1.65,
            }}
          >
            {description}
          </p>
        </div>

        {/* Showcase Image */}
        <div
          style={{
            position: 'relative',
            borderRadius: '1.25rem',
            overflow: 'hidden',
            marginBottom: '1.75rem',
            border: `1px solid ${accentColor}22`,
            background: 'rgba(0,0,0,0.3)',
            flexShrink: 0,
          }}
          className="family-card-image"
        >
          <img
            src={showcaseImg}
            alt={`${brandName} showcase`}
            style={{
              width: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease',
              transform: isHovered ? 'scale(1.04)' : 'scale(1)',
              filter: isHovered ? 'brightness(1.1)' : 'brightness(0.9)',
            }}
          />
          {/* Overlay gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to top, ${accentColor}22 0%, transparent 60%)`,
              pointerEvents: 'none',
            }}
          />
          {/* Shine effect on hover */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? '100%' : '-100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* CTA Button Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: accentColor,
              fontWeight: 700,
              fontSize: '1rem',
            }}
          >
            <span>{buttonText}</span>
            <motion.div
              animate={isHovered ? { x: 5 } : { x: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <ArrowRight size={17} />
            </motion.div>
          </div>

          <motion.div
            animate={{
              background: isHovered ? accentColor : 'rgba(255,255,255,0.06)',
              borderColor: isHovered ? accentColor : 'rgba(255,255,255,0.1)',
            }}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              flexShrink: 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <ExternalLink size={15} />
          </motion.div>
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
        padding: '8rem 0',
        background: 'var(--bg-secondary)',
      }}
    >
      {/* Ambient Background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full blur-[160px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, rgba(6, 182, 212, 0.03) 50%, transparent 100%)',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
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
              marginBottom: '1.5rem',
            }}
          >
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Growing Beyond Client Solutions
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
              fontWeight: 800,
              marginBottom: '1.25rem',
              lineHeight: 1.1,
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.03em',
            }}
          >
            Part of Our{' '}
            <span className="text-gradient-accent">Digital Family</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '680px',
              margin: '0 auto',
            }}
          >
            We're passionate about creating meaningful digital experiences—not only for our clients
            but through our own growing family of brands. Each venture reflects our commitment to
            innovation, thoughtful design, and solving real-world challenges through technology.
          </motion.p>
        </div>

        {/* Brand Cards Grid */}
        <div className="family-cards-grid">
          <BrandCard
            brandName="Invitely"
            category="Digital Invitations"
            description="Create elegant online invitations for weddings, birthdays, corporate events, graduations, and every special occasion. Beautifully designed, easy to share, crafted to make every celebration unforgettable."
            buttonText="Explore Invitely"
            href="https://invitely2025.netlify.app/"
            gradientType="purple"
            logoSrc="/invitely_logo.jpg"
            showcaseImg="/invitely_showcase.png"
            accentColor="#C084FC"
            accentColorSecondary="#EC4899"
          />

          <BrandCard
            brandName="Project Pulse"
            category="Academic Support"
            description="Helping students succeed through smarter academic support, project guidance, learning resources, and productivity-focused digital solutions designed for modern education."
            buttonText="Explore Project Pulse"
            href="https://projectpulse01.netlify.app"
            gradientType="cyan"
            logoSrc="/projectpulse_logo.png"
            showcaseImg="/projectpulse_showcase.png"
            accentColor="#22D3EE"
            accentColorSecondary="#3B82F6"
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
        .family-card-body {
          min-height: 580px;
        }
        .family-card-image {
          height: 240px;
        }
        .family-card-image img {
          height: 100%;
        }

        @media (max-width: 1024px) {
          .family-cards-grid {
            grid-template-columns: 1fr;
            max-width: 600px;
            gap: 2rem;
          }
          .family-card-body {
            min-height: unset;
          }
          .family-card-image {
            height: 220px;
          }
        }

        @media (max-width: 480px) {
          .family-card-image {
            height: 180px;
          }
          #ecosystem .section {
            padding: 5rem 0;
          }
        }
      `}</style>
    </section>
  );
};

export default DigitalFamily;
