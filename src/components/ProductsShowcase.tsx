import { useRef } from 'react';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Smartphone, Mail, Layout, Monitor, BookOpen, PenTool, BarChart, Sparkles, Star } from 'lucide-react';

const TiltCard = ({ children, href, className }: { children: React.ReactNode, href: string, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "2000px",
        display: 'block',
        textDecoration: 'none'
      }}
      className={`relative w-full rounded-[2.5rem] overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div 
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        className="h-full w-full"
      >
        {children}
      </div>
    </motion.a>
  );
};

const Confetti = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.6 }}>
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: ['#8B5CF6', '#D946EF', '#F472B6'][i % 3],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

const ProductsShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  return (
    <section ref={sectionRef} className="section" style={{ position: 'relative', overflow: 'hidden', padding: '10rem 0' }}>
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-0 w-[40vw] h-[40vw] bg-purple-900/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[40vw] h-[40vw] bg-cyan-900/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '6rem', maxWidth: '800px', margin: '0 auto 6rem auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem' }}
          >
            <Star size={16} color="var(--accent-primary)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Beyond Client Projects</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}
          >
            Products Powered by <span className="text-gradient-accent">Our Team.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}
          >
            Alongside building custom software for our clients, we design and develop our own digital products to solve real-world problems and deliver meaningful experiences.
          </motion.p>
        </div>

        {/* Products */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          {/* PRODUCT ONE: Invitely */}
          <TiltCard href="#" className="group">
            <div 
              className="glass-card" 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                minHeight: '600px',
                background: 'linear-gradient(145deg, rgba(30, 20, 50, 0.8) 0%, rgba(10, 5, 20, 0.9) 100%)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                boxShadow: '0 30px 60px -20px rgba(139, 92, 246, 0.2)',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Content Side */}
              <div style={{ padding: '4rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10, transform: "translateZ(40px)" }}>
                <div style={{ marginBottom: 'auto' }}>
                  <img src="/logo.jpeg" alt="Invitely" style={{ height: '40px', borderRadius: '8px', marginBottom: '2rem', display: 'none' }} /> 
                  <h3 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem', color: '#fff' }}>Invitely</h3>
                  <p style={{ fontSize: '1.25rem', color: '#D8B4FE', fontWeight: 500, marginBottom: '1.5rem' }}>Beautiful online invitation platform.</p>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                    Create and share elegant digital invitations for weddings, birthdays, corporate events, and every special celebration.
                  </p>
                  
                  <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', listStyle: 'none', padding: 0, marginBottom: '3rem' }}>
                    {[
                      { icon: <Layout size={18} />, text: "Elegant Templates" },
                      { icon: <Mail size={18} />, text: "Instant Sharing" },
                      { icon: <Sparkles size={18} />, text: "Modern Design" },
                      { icon: <Smartphone size={18} />, text: "Mobile Friendly" }
                    ].map((feature, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#E9D5FF', fontSize: '0.95rem' }}>
                        <div style={{ padding: '0.4rem', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '8px', color: '#C084FC' }}>
                          {feature.icon}
                        </div>
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div 
                  className="inline-flex items-center gap-2 text-white font-semibold transition-all group-hover:gap-4"
                  style={{ color: '#C084FC', fontSize: '1.1rem' }}
                >
                  Explore Invitely <ArrowRight size={20} />
                </div>
              </div>
              
              {/* Visual Side */}
              <div style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)' }}>
                <Confetti />
                
                {/* Abstract Visuals */}
                <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: "translateZ(60px)" }}>
                  
                  {/* Floating Smartphone Mockup */}
                  <motion.div
                    animate={{ y: [-10, 10, -10], rotate: [0, -2, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width: '240px',
                      height: '480px',
                      background: 'rgba(20, 10, 30, 0.9)',
                      border: '4px solid #3B2A5E',
                      borderRadius: '32px',
                      position: 'relative',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(139, 92, 246, 0.3)',
                      overflow: 'hidden',
                      zIndex: 3
                    }}
                  >
                    {/* Notch */}
                    <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '40%', height: '24px', background: '#3B2A5E', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 10 }}></div>
                    {/* Screen Content Abstract */}
                    <div style={{ padding: '40px 20px', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                       <div style={{ width: '100%', height: '140px', borderRadius: '16px', background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)', opacity: 0.8 }}></div>
                       <div style={{ width: '60%', height: '12px', borderRadius: '6px', background: 'rgba(255,255,255,0.2)' }}></div>
                       <div style={{ width: '80%', height: '12px', borderRadius: '6px', background: 'rgba(255,255,255,0.1)' }}></div>
                       <div style={{ width: '40%', height: '12px', borderRadius: '6px', background: 'rgba(255,255,255,0.1)' }}></div>
                       <div style={{ marginTop: 'auto', width: '100%', height: '48px', borderRadius: '24px', background: '#A855F7', opacity: 0.9 }}></div>
                    </div>
                  </motion.div>

                  {/* Floating Invite Card Back */}
                  <motion.div
                    animate={{ y: [10, -10, 10], rotate: [10, 15, 10] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    style={{
                      position: 'absolute',
                      right: '10%',
                      top: '20%',
                      width: '180px',
                      height: '240px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      zIndex: 2,
                      boxShadow: '0 15px 30px rgba(0,0,0,0.3)'
                    }}
                  />
                  
                  {/* Floating Invite Card Front */}
                  <motion.div
                    animate={{ y: [-15, 15, -15], x: [-5, 5, -5], rotate: [-15, -10, -15] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    style={{
                      position: 'absolute',
                      left: '10%',
                      bottom: '20%',
                      width: '160px',
                      height: '200px',
                      background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '16px',
                      zIndex: 4,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                    }}
                  />
                </div>
              </div>
            </div>
          </TiltCard>

          {/* PRODUCT TWO: Project Pulse */}
          <TiltCard href="https://projectpulse01.netlify.app" className="group">
            <div 
              className="glass-card" 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                minHeight: '600px',
                background: 'linear-gradient(145deg, rgba(10, 20, 40, 0.8) 0%, rgba(5, 10, 20, 0.9) 100%)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                boxShadow: '0 30px 60px -20px rgba(6, 182, 212, 0.2)',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Visual Side (Left for alternate layout) */}
              <div style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.15) 0%, transparent 70%)', order: 1 }}>
                
                {/* Abstract Visuals */}
                <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: "translateZ(60px)" }}>
                  
                  {/* Floating Laptop Mockup */}
                  <motion.div
                    animate={{ y: [-12, 12, -12] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width: '320px',
                      height: '220px',
                      background: 'rgba(15, 25, 45, 0.9)',
                      border: '4px solid #1E293B',
                      borderRadius: '16px',
                      position: 'relative',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(6, 182, 212, 0.2)',
                      overflow: 'hidden',
                      zIndex: 3,
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {/* Screen Content Dashboard Abstract */}
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {/* Header */}
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <div style={{ width: '30%', height: '10px', borderRadius: '5px', background: 'rgba(255,255,255,0.2)' }}></div>
                         <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(6,182,212,0.5)' }}></div>
                       </div>
                       
                       <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
                         {/* Sidebar */}
                         <div style={{ width: '40px', height: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px' }}>
                           <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}></div>
                           <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                           <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                         </div>
                         {/* Main Content */}
                         <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                           <div style={{ display: 'flex', gap: '8px' }}>
                              <div style={{ flex: 1, height: '60px', background: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)', borderRadius: '8px', opacity: 0.8 }}></div>
                              <div style={{ flex: 1, height: '60px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '8px' }}></div>
                           </div>
                           <div style={{ width: '100%', flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px', display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
                             {/* Abstract Graph */}
                             <div style={{ width: '15%', height: '40%', background: '#06B6D4', borderRadius: '4px 4px 0 0' }}></div>
                             <div style={{ width: '15%', height: '70%', background: '#3B82F6', borderRadius: '4px 4px 0 0' }}></div>
                             <div style={{ width: '15%', height: '50%', background: '#06B6D4', borderRadius: '4px 4px 0 0' }}></div>
                             <div style={{ width: '15%', height: '90%', background: '#3B82F6', borderRadius: '4px 4px 0 0' }}></div>
                           </div>
                         </div>
                       </div>
                    </div>
                    {/* Laptop Bottom Lip */}
                    <div style={{ height: '12px', background: '#0F172A', borderTop: '1px solid #1E293B' }}></div>
                  </motion.div>

                  {/* Floating Book/Document 1 */}
                  <motion.div
                    animate={{ y: [15, -15, 15], x: [5, -5, 5], rotate: [-10, -5, -10] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    style={{
                      position: 'absolute',
                      left: '8%',
                      top: '15%',
                      width: '120px',
                      height: '160px',
                      background: 'rgba(14, 165, 233, 0.15)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(14, 165, 233, 0.3)',
                      borderRadius: '12px',
                      zIndex: 4,
                      boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                      padding: '16px'
                    }}
                  >
                     <div style={{ width: '60%', height: '6px', background: '#0EA5E9', borderRadius: '3px', marginBottom: '16px' }}></div>
                     <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', marginBottom: '8px' }}></div>
                     <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', marginBottom: '8px' }}></div>
                     <div style={{ width: '80%', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}></div>
                  </motion.div>
                  
                  {/* Floating Element 2 */}
                  <motion.div
                    animate={{ y: [-10, 10, -10], rotate: [15, 20, 15] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    style={{
                      position: 'absolute',
                      right: '12%',
                      bottom: '25%',
                      width: '100px',
                      height: '100px',
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '24px',
                      zIndex: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                    }}
                  >
                    <BookOpen size={32} color="#60A5FA" opacity={0.8} />
                  </motion.div>
                </div>
              </div>

              {/* Content Side (Right for alternate layout) */}
              <div style={{ padding: '4rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10, transform: "translateZ(40px)", order: 2 }}>
                <div style={{ marginBottom: 'auto' }}>
                  <h3 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem', color: '#fff' }}>Project Pulse</h3>
                  <p style={{ fontSize: '1.25rem', color: '#67E8F9', fontWeight: 500, marginBottom: '1.5rem' }}>Modern academic support platform.</p>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                    Helping students succeed through assignment support, project guidance, learning resources, and digital tools.
                  </p>
                  
                  <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', listStyle: 'none', padding: 0, marginBottom: '3rem' }}>
                    {[
                      { icon: <PenTool size={18} />, text: "Assignment Support" },
                      { icon: <BookOpen size={18} />, text: "Learning Resources" },
                      { icon: <Monitor size={18} />, text: "Student Tools" },
                      { icon: <BarChart size={18} />, text: "Project Guidance" }
                    ].map((feature, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#BAE6FD', fontSize: '0.95rem' }}>
                        <div style={{ padding: '0.4rem', background: 'rgba(6, 182, 212, 0.2)', borderRadius: '8px', color: '#22D3EE' }}>
                          {feature.icon}
                        </div>
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div 
                  className="inline-flex items-center gap-2 text-white font-semibold transition-all group-hover:gap-4"
                  style={{ color: '#22D3EE', fontSize: '1.1rem' }}
                >
                  Visit Project Pulse <ArrowRight size={20} />
                </div>
              </div>

            </div>
          </TiltCard>

        </div>
      </div>
      
      <style>{`
        @media (max-width: 992px) {
          .glass-card {
            grid-template-columns: 1fr !important;
          }
          .glass-card > div:nth-child(1) { order: 1 !important; padding: 3rem 2rem !important; }
          .glass-card > div:nth-child(2) { order: 2 !important; height: 400px; padding: 2rem !important; }
          .glass-card ul { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default ProductsShowcase;
