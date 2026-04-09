import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    title: 'Residencia Aurora',
    subtitle: 'Arquitetura Residencial',
    location: 'Sao Paulo, SP',
  },
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
    title: 'Torre Solaris',
    subtitle: 'Arquitetura Corporativa',
    location: 'Rio de Janeiro, RJ',
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
    title: 'Casa Horizonte',
    subtitle: 'Design de Interiores',
    location: 'Florianopolis, SC',
  },
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === current) return;
    setIsAnimating(true);

    // Animate text out
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrent(index);
      },
    });

    tl.to('.hero-slide-text', {
      y: -40,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    });
  }, [current, isAnimating]);

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % slides.length);
  }, [current, goToSlide]);

  // Auto-play
  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [nextSlide]);

  // Animate text in when slide changes
  useEffect(() => {
    gsap.fromTo(
      '.hero-slide-text',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
        onComplete: () => setIsAnimating(false),
      }
    );
  }, [current]);

  // Initial entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(
      '.hero-reveal',
      { scaleY: 1 },
      { scaleY: 0, duration: 1.4, ease: 'power4.inOut' }
    )
      .fromTo(
        '.hero-slide-text',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        '.hero-dots',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(
        '.hero-scroll',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      );
  }, []);

  // Parallax
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scroll = window.scrollY;
        const bgs = heroRef.current.querySelectorAll('.slide-bg') as NodeListOf<HTMLElement>;
        bgs.forEach((bg) => {
          bg.style.transform = `scale(1.05) translateY(${scroll * 0.2}px)`;
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDotClick = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    goToSlide(index);
    intervalRef.current = setInterval(nextSlide, 6000);
  };

  return (
    <section ref={heroRef} id="hero" style={styles.hero}>
      {/* Reveal overlay */}
      <div className="hero-reveal" style={styles.reveal} />

      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          style={{
            ...styles.slide,
            opacity: current === i ? 1 : 0,
            zIndex: current === i ? 1 : 0,
          }}
        >
          <div
            className="slide-bg"
            style={{
              ...styles.slideBg,
              backgroundImage: `url(${slide.image})`,
            }}
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div style={styles.gradientBottom} />
      <div style={styles.gradientLeft} />

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.container}>
          <div ref={textRef} className="hero-slide-text" style={styles.textBlock}>
            <span style={styles.slideSubtitle}>{slides[current].subtitle}</span>
            <h1 style={styles.slideTitle}>{slides[current].title}</h1>
            <div style={styles.locationRow}>
              <div style={styles.locationLine} />
              <span style={styles.locationText}>{slides[current].location}</span>
            </div>
            <button
              onClick={() => {
                const el = document.querySelector('#projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={styles.ctaBtn}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = '#c9a96e';
                el.style.color = '#0a0a0a';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = 'transparent';
                el.style.color = '#ffffff';
              }}
            >
              Conhecer Projeto
            </button>
          </div>
        </div>
      </div>

      {/* Slide counter + dots */}
      <div className="hero-dots" style={styles.dotsWrapper}>
        <span style={styles.counter}>
          {String(current + 1).padStart(2, '0')}
          <span style={styles.counterSep}>/</span>
          {String(slides.length).padStart(2, '0')}
        </span>
        <div style={styles.dotsRow}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              style={{
                ...styles.dot,
                width: current === i ? 40 : 12,
                background: current === i ? '#c9a96e' : 'rgba(255,255,255,0.3)',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <div style={styles.arrows}>
        <button
          onClick={() => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            goToSlide((current - 1 + slides.length) % slides.length);
            intervalRef.current = setInterval(nextSlide, 6000);
          }}
          style={styles.arrow}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c9a96e'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
          aria-label="Previous slide"
        >
          ←
        </button>
        <button
          onClick={() => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            goToSlide((current + 1) % slides.length);
            intervalRef.current = setInterval(nextSlide, 6000);
          }}
          style={styles.arrow}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c9a96e'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
          aria-label="Next slide"
        >
          →
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll" style={styles.scrollIndicator}>
        <div style={styles.scrollLine} />
        <span style={styles.scrollText}>SCROLL</span>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  hero: {
    position: 'relative',
    height: '100vh',
    minHeight: 600,
    overflow: 'hidden',
    background: '#0a0a0a',
  },
  reveal: {
    position: 'absolute',
    inset: 0,
    background: '#0a0a0a',
    transformOrigin: 'top',
    zIndex: 10,
  },
  slide: {
    position: 'absolute',
    inset: 0,
    transition: 'opacity 1.2s ease-in-out',
  },
  slideBg: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transform: 'scale(1.05)',
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.6) 40%, transparent 100%)',
    zIndex: 2,
    pointerEvents: 'none',
  },
  gradientLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '50%',
    background: 'linear-gradient(to right, rgba(10,10,10,0.7) 0%, transparent 100%)',
    zIndex: 2,
    pointerEvents: 'none',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3,
    paddingBottom: 100,
  },
  container: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '0 24px',
  },
  textBlock: {
    maxWidth: 650,
  },
  slideSubtitle: {
    display: 'block',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: 4,
    textTransform: 'uppercase' as const,
    color: '#c9a96e',
    marginBottom: 16,
  },
  slideTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    fontWeight: 500,
    lineHeight: 1.1,
    color: '#ffffff',
    marginBottom: 20,
  },
  locationRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
  },
  locationLine: {
    width: 40,
    height: 1,
    background: '#c9a96e',
  },
  locationText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1,
  },
  ctaBtn: {
    padding: '14px 36px',
    background: 'transparent',
    color: '#ffffff',
    border: '1px solid rgba(255,255,255,0.4)',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    transition: 'all 0.4s ease',
  },
  dotsWrapper: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 4,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 12,
  },
  counter: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 500,
    color: '#ffffff',
    letterSpacing: 2,
  },
  counterSep: {
    color: 'rgba(255,255,255,0.3)',
    margin: '0 6px',
  },
  dotsRow: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  dot: {
    height: 3,
    borderRadius: 2,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    padding: 0,
  },
  arrows: {
    position: 'absolute',
    right: 40,
    bottom: 100,
    zIndex: 4,
    display: 'flex',
    gap: 8,
  },
  arrow: {
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(10,10,10,0.4)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.3)',
    color: '#ffffff',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 12,
    zIndex: 4,
  },
  scrollLine: {
    width: 1,
    height: 50,
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

const heroStyles = document.createElement('style');
heroStyles.textContent = `
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.3; transform: scaleY(0.6); }
    50% { opacity: 1; transform: scaleY(1); }
  }
  @media (max-width: 768px) {
    #hero .hero-scroll { display: none !important; }
    #hero > div:nth-last-child(2) { right: auto !important; left: 50% !important; transform: translateX(-50%) !important; bottom: 160px !important; }
  }
  @media (max-width: 480px) {
    #hero > div:nth-last-child(2) { display: none !important; }
  }
`;
document.head.appendChild(heroStyles);

export default Hero;
