import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, ShieldCheck, Palette, Cpu } from 'lucide-react';

const About = () => {
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const pillars = [
    {
      icon: ShieldCheck,
      number: '01',
      title: 'Purpose-Built Software',
      highlight: 'Solving Real Problems',
      desc: "Most businesses don't need more software. They need the right software. We build purpose-driven digital solutions tailored to your exact business objectives.",
      accent: 'var(--accent-primary)',
      gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.03))',
      border: 'rgba(139, 92, 246, 0.25)',
    },
    {
      icon: Palette,
      number: '02',
      title: 'Design Without Compromise',
      highlight: 'User Experience First',
      desc: 'We partner with ambitious brands to craft digital experiences that simplify operations, elevate customer engagement, and drive sustainable growth.',
      accent: 'var(--accent-secondary)',
      gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(6, 182, 212, 0.03))',
      border: 'rgba(6, 182, 212, 0.25)',
    },
    {
      icon: Cpu,
      number: '03',
      title: 'Engineered For Scale',
      highlight: 'Built For Future Growth',
      desc: 'Every website, mobile application, automation, and AI solution we engineer is designed with a single goal: helping your business work smarter and scale seamlessly.',
      accent: '#EC4899',
      gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(236, 72, 153, 0.03))',
      border: 'rgba(236, 72, 153, 0.25)',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section"
      style={{
        position: 'relative',
        background: 'var(--bg-secondary)',
        overflow: 'hidden',
        padding: '7rem 0',
      }}
    >
      {/* Background ambient lighting */}
      <div
        className="bg-glow-blur"
        style={{
          top: '20%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          background: 'rgba(139, 92, 246, 0.08)',
        }}
      />
      <div
        className="bg-glow-blur"
        style={{
          bottom: '10%',
          right: '-10%',
          width: '45vw',
          height: '45vw',
          background: 'rgba(6, 182, 212, 0.06)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 5rem auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.03)',
              padding: '0.4rem 1.1rem',
              borderRadius: '2rem',
              border: '1px solid rgba(255,255,255,0.08)',
              marginBottom: '1.5rem',
            }}
          >
            <Sparkles size={14} color="var(--accent-secondary)" />
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Who We Are
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
              fontWeight: 800,
              marginBottom: '1.5rem',
              lineHeight: 1.1,
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.03em',
            }}
          >
            Technology Should Solve Problems— <br />
            <span className="text-gradient-accent">Not Create Them.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '720px',
              margin: '0 auto',
            }}
          >
            We don't build software just for the sake of writing code. We partner with forward-thinking businesses to craft digital infrastructure that turns complex operations into smooth, scalable growth.
          </motion.p>
        </div>

        {/* Main Content Grid: 3 Cards + Visual Illustration Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch',
          }}
          className="about-pillars-grid"
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
                className="glass-card hover-target"
                style={{
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '1.75rem',
                  background: 'linear-gradient(145deg, rgba(15, 15, 28, 0.75) 0%, rgba(8, 8, 16, 0.9) 100%)',
                  border: `1px solid ${pillar.border}`,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
                }}
                whileHover={{
                  y: -8,
                  boxShadow: `0 25px 50px -15px ${pillar.border}`,
                }}
              >
                {/* Background ambient card glow */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-20%',
                    width: '180px',
                    height: '180px',
                    background: pillar.gradient,
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    pointerEvents: 'none',
                  }}
                />

                <div>
                  {/* Top row: Icon + Number */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '2rem',
                    }}
                  >
                    <div
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '1rem',
                        background: pillar.gradient,
                        border: `1px solid ${pillar.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: pillar.accent,
                      }}
                    >
                      <Icon size={26} />
                    </div>
                    <span
                      style={{
                        fontSize: '1.75rem',
                        fontWeight: 800,
                        fontFamily: 'var(--font-display)',
                        color: 'rgba(255,255,255,0.15)',
                      }}
                    >
                      {pillar.number}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: pillar.accent,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {pillar.highlight}
                  </span>

                  <h3
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 700,
                      color: 'white',
                      marginBottom: '1rem',
                      fontFamily: 'var(--font-display)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.25,
                    }}
                  >
                    {pillar.title}
                  </h3>

                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.98rem',
                      lineHeight: 1.65,
                    }}
                  >
                    {pillar.desc}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '2rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: pillar.accent,
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    Core Principle
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          #about {
            padding: 5rem 0 !important;
          }
          .about-pillars-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
