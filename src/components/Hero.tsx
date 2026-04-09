import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });

    tl.fromTo(overlayRef.current, { scaleX: 1 }, { scaleX: 0, duration: 1.2, ease: 'power4.inOut' })
      .fromTo(titleRef.current?.children || [], { y: 100, opacity: 0, skewY: 5 }, { y: 0, opacity: 1, skewY: 0, stagger: 0.15, duration: 1, ease: 'power3.out' }, '-=0.5')
      .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .fromTo(statsRef.current?.children || [], { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, '-=0.3');

    // Parallax effect
    const handleScroll = () => {
      const scroll = window.scrollY;
      if (heroRef.current) {
        const bg = heroRef.current.querySelector('.hero-bg') as HTMLElement;
        if (bg) bg.style.transform = `scale(1.1) translateY(${scroll * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} id="hero" style={styles.hero}>
      <div className="hero-bg" style={styles.heroBg} />
      <div ref={overlayRef} style={styles.reveal} />
      <div style={styles.overlay} />

      <div style={styles.content}>
        <div style={styles.container}>
          <span style={styles.label}>LIV.E — ARQUITETURA E INTERIORES</span>

          <h1 ref={titleRef} style={styles.title}>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span style={{ display: 'inline-block' }}>Transformamos</span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span style={{ display: 'inline-block' }}>
                Espacos em <em style={styles.italic}>Experiencias</em>
              </span>
            </span>
          </h1>

          <p ref={subtitleRef} style={styles.subtitle}>
            Criamos projetos arquitetonicos unicos que conectam pessoas, funcionalidade e estetica.
            Cada espaco conta uma historia.
          </p>

          <div ref={ctaRef} style={styles.ctaGroup}>
            <button
              onClick={() => scrollTo('#projects')}
              style={styles.ctaPrimary}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = 'transparent';
                (e.target as HTMLElement).style.color = '#c9a96e';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = 'linear-gradient(135deg, #c9a96e, #b8943f)';
                (e.target as HTMLElement).style.color = '#0a0a0a';
              }}
            >
              Ver Projetos
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              style={styles.ctaSecondary}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = 'rgba(201,169,110,0.1)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = 'transparent';
              }}
            >
              Agendar Consulta
            </button>
          </div>

          <div ref={statsRef} style={styles.stats}>
            {[
              { number: '15+', text: 'Anos de\nExperiencia' },
              { number: '200+', text: 'Projetos\nEntregues' },
              { number: '35+', text: 'Premios\nRecebidos' },
              { number: '98%', text: 'Clientes\nSatisfeitos' },
            ].map((stat, i) => (
              <div key={i} style={styles.stat}>
                <span style={styles.statNumber}>{stat.number}</span>
                <span style={styles.statText}>{stat.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.scrollIndicator}>
        <div style={styles.scrollLine} />
        <span style={styles.scrollText}>SCROLL</span>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  hero: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  },
  heroBg: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transform: 'scale(1.1)',
  },
  reveal: {
    position: 'absolute',
    inset: 0,
    background: '#0a0a0a',
    transformOrigin: 'right',
    zIndex: 5,
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.85) 100%)',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    paddingTop: 120,
    paddingBottom: 60,
  },
  container: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '0 24px',
  },
  label: {
    display: 'inline-block',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: 5,
    color: '#c9a96e',
    marginBottom: 32,
    padding: '8px 16px',
    border: '1px solid rgba(201,169,110,0.3)',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
    fontWeight: 500,
    lineHeight: 1.1,
    color: '#fff',
    marginBottom: 32,
  },
  italic: {
    fontStyle: 'italic',
    color: '#c9a96e',
  },
  subtitle: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    color: '#aaa',
    maxWidth: 560,
    lineHeight: 1.8,
    marginBottom: 48,
  },
  ctaGroup: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap' as const,
    marginBottom: 80,
  },
  ctaPrimary: {
    padding: '16px 40px',
    background: 'linear-gradient(135deg, #c9a96e, #b8943f)',
    color: '#0a0a0a',
    border: '2px solid #c9a96e',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    transition: 'all 0.4s ease',
  },
  ctaSecondary: {
    padding: '16px 40px',
    background: 'transparent',
    color: '#f5f5f5',
    border: '2px solid rgba(255,255,255,0.2)',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 600,
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    transition: 'all 0.4s ease',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 32,
    maxWidth: 700,
  },
  stat: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 4,
  },
  statNumber: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
    fontWeight: 600,
    color: '#c9a96e',
  },
  statText: {
    fontSize: '0.75rem',
    color: '#777',
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
    whiteSpace: 'pre-line' as const,
    lineHeight: 1.4,
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 12,
    zIndex: 3,
  },
  scrollLine: {
    width: 1,
    height: 60,
    background: 'linear-gradient(to bottom, #c9a96e, transparent)',
    animation: 'scrollPulse 2s ease-in-out infinite',
  },
  scrollText: {
    fontSize: '0.6rem',
    letterSpacing: 3,
    color: '#c9a96e',
    writingMode: 'vertical-lr' as const,
  },
};

// Add keyframes
const keyframes = document.createElement('style');
keyframes.textContent = `
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.3; transform: scaleY(0.6); }
    50% { opacity: 1; transform: scaleY(1); }
  }
  @media (max-width: 600px) {
    #hero .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
`;
document.head.appendChild(keyframes);

export default Hero;
