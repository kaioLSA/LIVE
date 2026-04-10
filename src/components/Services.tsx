import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Arquitetura',
    description: 'Projetos arquitetonicos residenciais, comerciais e corporativos. Do estudo de viabilidade ao projeto executivo, cada etapa e conduzida com escuta real e atencao a cada detalhe.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
  },
  {
    number: '02',
    title: 'Design de Interiores',
    description: 'Criamos ambientes que refletem a essencia de quem os habita. Combinacao de materiais nobres, beleza e elegancia para espacos que contam historias.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
  },
  {
    number: '03',
    title: 'Retrofit',
    description: 'Revitalizacao inteligente de edificacoes existentes, agregando valor, modernidade e eficiencia sem perder a identidade original do espaco.',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
  },
  {
    number: '04',
    title: 'Gerenciamento de Obra',
    description: 'Acompanhamento integral de cada etapa da obra, garantindo fidelidade ao projeto, cumprimento de prazos e controle rigoroso de qualidade.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
  {
    number: '05',
    title: 'Decorados & Turn Key',
    description: 'Entrega completa do projeto pronto para uso. Uma unica empresa assume toda a responsabilidade, do conceito a execucao final, com resultado impecavel.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
  },
];

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    const totalScrollHeight = services.length * 100;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${totalScrollHeight}%`,
      pin: pinRef.current,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const index = Math.min(
          Math.floor(progress * services.length),
          services.length - 1
        );
        setActiveIndex(index);
      },
    });

    return () => st.kill();
  }, []);

  useEffect(() => {
    gsap.to('.svc-image', {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.to('.svc-image', { opacity: 1, duration: 0.5 });
      },
    });
    gsap.fromTo(
      '.svc-text-content',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.2 }
    );
  }, [activeIndex]);

  const active = services[activeIndex];

  return (
    <section ref={sectionRef} id="services" style={styles.section}>
      <div ref={pinRef} style={styles.pinWrapper}>
        <div style={styles.container}>
          {/* Header */}
          <div style={styles.topBar}>
            <div>
              <span style={styles.label}>O QUE FAZEMOS</span>
              <h2 style={styles.title}>Nossos <em style={styles.italic}>Servicos</em></h2>
            </div>
            <div style={styles.counter}>
              <span style={styles.counterCurrent}>{active.number}</span>
              <span style={styles.counterSep}>/</span>
              <span style={styles.counterTotal}>{String(services.length).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Mobile/Tablet: horizontal tabs */}
          <div className="svc-tabs-mobile">
            <div style={styles.tabsScroll}>
              {services.map((svc, i) => (
                <button
                  key={i}
                  style={{
                    ...styles.tab,
                    color: activeIndex === i ? '#fff' : '#555',
                    borderBottomColor: activeIndex === i ? '#c9a96e' : 'transparent',
                  }}
                >
                  <span style={styles.tabNumber}>{svc.number}</span>
                  {svc.title}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop content grid */}
          <div className="svc-content-grid svc-desktop-grid" style={styles.grid}>
            {/* Left - navigation */}
            <div style={styles.navCol}>
              {services.map((svc, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.navItem,
                    opacity: activeIndex === i ? 1 : 0.35,
                    borderLeftColor: activeIndex === i ? '#c9a96e' : 'transparent',
                    paddingLeft: activeIndex === i ? 24 : 20,
                  }}
                >
                  <span style={styles.navNumber}>{svc.number}</span>
                  <span style={{
                    ...styles.navTitle,
                    color: activeIndex === i ? '#fff' : '#666',
                  }}>{svc.title}</span>
                </div>
              ))}
            </div>

            {/* Center - image */}
            <div className="svc-image" style={styles.imageCol}>
              <img src={active.image} alt={active.title} style={styles.img} />
              <div style={styles.imageGradient} />
            </div>

            {/* Right - description */}
            <div className="svc-text-content" style={styles.textCol}>
              <h3 style={styles.serviceTitle}>{active.title}</h3>
              <p style={styles.serviceDesc}>{active.description}</p>
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${((activeIndex + 1) / services.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Mobile/Tablet content: stacked image + text */}
          <div className="svc-mobile-content">
            <div className="svc-image" style={styles.mobileImageCol}>
              <img src={active.image} alt={active.title} style={styles.img} />
              <div style={styles.imageGradient} />
            </div>
            <div className="svc-text-content" style={styles.mobileTextCol}>
              <h3 style={styles.mobileServiceTitle}>{active.title}</h3>
              <p style={styles.mobileServiceDesc}>{active.description}</p>
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${((activeIndex + 1) / services.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .svc-tabs-mobile { display: none; }
        .svc-mobile-content { display: none; }

        @media (max-width: 900px) {
          .svc-desktop-grid { display: none !important; }
          .svc-tabs-mobile { display: block !important; }
          .svc-mobile-content { display: block !important; }
        }
      `}</style>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: '#0a0a0a',
    position: 'relative',
  },
  pinWrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    padding: '80px 0',
  },
  container: { maxWidth: 1400, margin: '0 auto', padding: '0 24px', width: '100%' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 },
  label: { fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: 4, color: '#c9a96e', marginBottom: 8, display: 'block' },
  title: { fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 500, color: '#fff' },
  italic: { fontStyle: 'italic', color: '#c9a96e' },
  counter: { display: 'flex', alignItems: 'baseline', gap: 4 },
  counterCurrent: { fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600, color: '#c9a96e' },
  counterSep: { fontSize: '1.2rem', color: '#333', margin: '0 4px' },
  counterTotal: { fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: '#555' },

  // Desktop grid
  grid: { display: 'grid', gridTemplateColumns: '200px 1fr 1fr', gap: 40, alignItems: 'start' },
  navCol: { display: 'flex', flexDirection: 'column' as const, gap: 8 },
  navItem: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
    borderLeft: '2px solid transparent', transition: 'all 0.4s ease', cursor: 'default',
  },
  navNumber: { fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', fontWeight: 600, color: '#c9a96e' },
  navTitle: { fontSize: '0.85rem', fontWeight: 500, letterSpacing: 0.5, transition: 'color 0.3s' },
  imageCol: { position: 'relative', overflow: 'hidden', height: 400 },
  img: { width: '100%', height: '100%', objectFit: 'cover' as const },
  imageGradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(10,10,10,0.8), transparent)' },
  textCol: { paddingTop: 20 },
  serviceTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 500, color: '#fff', marginBottom: 20 },
  serviceDesc: { fontSize: '1rem', color: '#999', lineHeight: 1.8, marginBottom: 32 },
  progressBar: { width: '100%', height: 2, background: '#2a2a2a', borderRadius: 1 },
  progressFill: { height: '100%', background: '#c9a96e', borderRadius: 1, transition: 'width 0.5s ease' },

  // Mobile tabs
  tabsScroll: {
    display: 'flex',
    gap: 0,
    overflowX: 'auto' as const,
    marginBottom: 24,
    borderBottom: '1px solid #2a2a2a',
    WebkitOverflowScrolling: 'touch' as any,
    scrollbarWidth: 'none' as any,
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 16px',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: 0.5,
    whiteSpace: 'nowrap' as const,
    cursor: 'default',
    transition: 'all 0.3s ease',
  },
  tabNumber: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#c9a96e',
  },

  // Mobile content
  mobileImageCol: {
    position: 'relative',
    overflow: 'hidden',
    height: 280,
    marginBottom: 24,
  },
  mobileTextCol: {
    paddingBottom: 16,
  },
  mobileServiceTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.6rem',
    fontWeight: 500,
    color: '#fff',
    marginBottom: 12,
  },
  mobileServiceDesc: {
    fontSize: '0.9rem',
    color: '#999',
    lineHeight: 1.8,
    marginBottom: 24,
  },
};

export default Services;
