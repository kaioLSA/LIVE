import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Counters from './components/Counters';
import About from './components/About';
import Showcase from './components/Showcase';
import Projects from './components/Projects';
import Process from './components/Process';
import Services from './components/Services';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [splashDone, setSplashDone] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSplashComplete = () => {
    setSplashDone(true);
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <div className="App" style={{ overflow: 'hidden' }}>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
      <div style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        <Navbar />
        <Hero />
        <Counters />
        <About />
        <Showcase />
        <Projects />
        <Process />
        <Services />
        <Team />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default App;
