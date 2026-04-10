import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const counters = [
  { end: 15, suffix: '+', label: 'Anos no\nMercado' },
  { end: 200, suffix: '+', label: 'Projetos\nEntregues' },
  { end: 12, suffix: 'mil', label: 'm² de Area\nProjetada' },
  { end: 35, suffix: '+', label: 'Premios e\nCertificacoes' },
];

const Counters: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [values, setValues] = useState(counters.map(() => 0));

  useEffect(() => {
    if (!sectionRef.current) return;

    // Counter numbers trigger once (they need to complete)
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => setTriggered(true),
    });

    // Card entrance: scrub-controlled
    gsap.fromTo(
      '.counter-item',
      { y: 50, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          end: 'top 50%',
          scrub: 1,
        },
      }
    );

    // Divider lines grow
    gsap.fromTo(
      '.counter-divider',
      { scaleX: 0 },
      {
        scaleX: 1,
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 45%',
          scrub: 1,
        },
      }
    );
  }, []);

  useEffect(() => {
    if (!triggered) return;

    counters.forEach((counter, i) => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: counter.end,
        duration: 2.5,
        ease: 'power2.out',
        onUpdate: () => {
          setValues((prev) => {
            const next = [...prev];
            next[i] = Math.round(obj.val);
            return next;
          });
        },
      });
    });
  }, [triggered]);

  return (
    <section ref={sectionRef} style={styles.section}>
      <div style={styles.container}>
        <div style={styles.grid}>
          {counters.map((counter, i) => (
            <div key={i} className="counter-item" style={styles.item}>
              <div style={styles.numberRow}>
                <span style={styles.number}>{values[i]}</span>
                <span style={styles.suffix}>{counter.suffix}</span>
              </div>
              <div className="counter-divider" style={styles.divider} />
              <span style={styles.label}>{counter.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section:has(.counter-item) > div > div { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          section:has(.counter-item) > div > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '48px 0',
    background: '#ffffff',
  },
  container: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '0 24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 32,
  },
  item: {
    textAlign: 'center' as const,
    padding: '20px 0',
  },
  numberRow: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 16,
  },
  number: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(3rem, 6vw, 5rem)',
    fontWeight: 700,
    color: '#1a1a1a',
    lineHeight: 1,
  },
  suffix: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
    fontWeight: 500,
    color: '#c9a96e',
  },
  divider: {
    width: 40,
    height: 2,
    background: '#8B2335',
    margin: '0 auto 16px',
    transformOrigin: 'center',
  },
  label: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#666',
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
    whiteSpace: 'pre-line' as const,
    lineHeight: 1.5,
  },
};


export default Counters;
