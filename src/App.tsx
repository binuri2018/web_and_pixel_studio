import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Capabilities from './components/Capabilities';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import DigitalFamily from './components/DigitalFamily';
import Proof from './components/Proof';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  useEffect(() => {
    new Lenis({
      autoRaf: true,
    });

    // lenis.on('scroll', (e) => {
    //   console.log(e);
    // });
  }, []);

  return (
    <div className="app-container">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Capabilities />
        <WhyChooseUs />
        <HowItWorks />
        <Proof />
        <DigitalFamily />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
