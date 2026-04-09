import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Marquee: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 20,
      ease: 'none',
      repeat: -1,
    });
  }, []);

  const items = [
    'ARQUITETURA', 'DESIGN', 'INOVACAO', 'SUSTENTABILIDADE',
    'URBANISMO', 'INTERIORES', 'BIM', 'EXCELENCIA',
  ];

  const doubled = [...items, ...items];

  return (
    <div style={styles.wrapper}>
      <div ref={trackRef} style={styles.track}>
        {doubled.map((item, i) => (
          <span key={i} style={styles.item}>
            {item}
            <span style={styles.dot}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    overflow: 'hidden',
    padding: '40px 0',
    background: '#111',
    borderTop: '1px solid #1a1a1a',
    borderBottom: '1px solid #1a1a1a',
  },
  track: {
    display: 'flex',
    whiteSpace: 'nowrap' as const,
    width: 'fit-content',
  },
  item: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.5rem, 4vw, 3rem)',
    fontWeight: 400,
    color: 'rgba(201,169,110,0.15)',
    letterSpacing: 8,
    padding: '0 24px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 24,
  },
  dot: {
    fontSize: '0.5rem',
    color: 'rgba(201,169,110,0.3)',
  },
};

export default Marquee;
