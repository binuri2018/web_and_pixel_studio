import { Code2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: '#020202', borderTop: '1px solid var(--border-color)', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          
          <div>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'white', marginBottom: '1.5rem' }}>
              <Code2 size={24} color="var(--accent-primary)" />
              <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>Studio.</span>
            </a>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Building software that moves businesses forward. Premium, cinematic digital experiences.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '1.5rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Home', 'About Us', 'How It Works', 'Careers'].map(link => (
                <li key={link}>
                  <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                     onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-secondary)'}
                     onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '1.5rem' }}>Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Custom Software', 'Web Development', 'AI Solutions', 'Mobile Apps'].map(link => (
                <li key={link}>
                  <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                     onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-secondary)'}
                     onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '1.5rem' }}>Socials</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Twitter', 'LinkedIn', 'Instagram', 'Dribbble'].map(link => (
                <li key={link}>
                  <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                     onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-secondary)'}
                     onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            &copy; {new Date().getFullYear()} Studio. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Designed for the future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
