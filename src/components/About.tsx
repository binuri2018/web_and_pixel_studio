import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const textOpacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.4], [0, 1, 1, 0]);
  const textOpacity2 = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const textOpacity3 = useTransform(scrollYProgress, [0.6, 0.7, 0.9, 1], [0, 1, 1, 0]);

  const textY1 = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.4], [50, 0, 0, -50]);
  const textY2 = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [50, 0, 0, -50]);
  const textY3 = useTransform(scrollYProgress, [0.6, 0.7, 0.9, 1], [50, 0, 0, -50]);

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <section id="about" ref={containerRef} style={{ position: 'relative', height: '400vh', background: 'var(--bg-secondary)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        
        {/* Background Visual Element */}
        <div style={{ position: 'absolute', right: '10%', top: '50%', transform: 'translateY(-50%)', width: '40vw', height: '40vw', zIndex: 0, opacity: 0.6 }}>
          <motion.div 
            style={{ 
              width: '100%', height: '100%', 
              borderRadius: '2rem',
              overflow: 'hidden',
              scale,
              rotate,
              border: '1px solid rgba(255,255,255,0.05)',
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)'
            }} 
          >
            <img src="/about_illustration.png" alt="About Data Flow" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 40%, var(--bg-secondary) 100%)' }}></div>
          </motion.div>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            
            <div style={{ position: 'relative', height: '50vh', display: 'flex', alignItems: 'center' }}>
              
              {/* Text Block 1 */}
              <motion.div style={{ position: 'absolute', opacity: textOpacity1, y: textY1, width: '100%' }}>
                <h2 style={{ fontSize: '4rem', fontWeight: 700, marginBottom: '2rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  Technology Should <br/> Solve Problems—<br/>
                  <span className="text-gradient-accent">Not Create Them.</span>
                </h2>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '90%' }}>
                  Most businesses don't need more software. They need the <strong>right software</strong>. We build with purpose.
                </p>
              </motion.div>

              {/* Text Block 2 */}
              <motion.div style={{ position: 'absolute', opacity: textOpacity2, y: textY2, width: '100%' }}>
                <h2 style={{ fontSize: '4rem', fontWeight: 700, marginBottom: '2rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  Design <br/>
                  <span className="outline-text" style={{ color: 'transparent', WebkitTextStroke: '1px var(--accent-secondary)' }}>Without Compromise.</span>
                </h2>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '90%' }}>
                  We partner with ambitious businesses to design digital experiences that simplify operations, improve customer experiences, and unlock sustainable growth.
                </p>
              </motion.div>

              {/* Text Block 3 */}
              <motion.div style={{ position: 'absolute', opacity: textOpacity3, y: textY3, width: '100%' }}>
                <h2 style={{ fontSize: '4rem', fontWeight: 700, marginBottom: '2rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  Engineered For <br/>
                  <span className="text-glow" style={{ color: 'var(--accent-primary)' }}>Scale.</span>
                </h2>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '90%' }}>
                  Every website, application, automation, and AI solution we create is built with one purpose: <strong>Helping your business work smarter.</strong>
                </p>
              </motion.div>

            </div>

            {/* Empty column for spacing */}
            <div></div>

          </div>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 992px) {
          #about h2 { font-size: 3rem !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
