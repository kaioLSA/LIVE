import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Projeto Arquitetonico',
    description: 'Desenvolvimento completo de projetos residenciais, comerciais e corporativos, desde o estudo preliminar ate o projeto executivo.',
    features: ['Estudo de viabilidade', 'Projeto conceitual', 'Projeto executivo', 'Acompanhamento de obra'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
  },
  {
    number: '02',
    title: 'Design de Interiores',
    description: 'Criacao de ambientes funcionais e esteticamente sofisticados que refletem a personalidade e o estilo de vida de cada cliente.',
    features: ['Layout e mobiliario', 'Especificacao de materiais', 'Iluminacao', 'Decoracao'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
  },
  {
    number: '03',
    title: 'Urbanismo & Paisagismo',
    description: 'Planejamento urbano e projetos paisagisticos que promovem sustentabilidade, funcionalidade e qualidade de vida.',
    features: ['Master plan', 'Areas verdes', 'Espacos publicos', 'Mobiliario urbano'],
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
  },
  {
    number: '04',
    title: 'Consultoria & BIM',
    description: 'Consultoria especializada e modelagem BIM para projetos de alta complexidade com total controle de informacoes.',
    features: ['Modelagem 3D/BIM', 'Compatibilizacao', 'Consultoria tecnica', 'Gestao de projetos'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
];

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.svc-animate'),
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      '.svc-detail',
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    );
  }, [activeIndex]);

  const active = services[activeIndex];

  return (
    <section ref={sectionRef} id="services" style={styles.section}>
      <div style={styles.container}>
        <div className="svc-animate" style={styles.header}>
          <span style={styles.label}>O QUE FAZEMOS</span>
          <h2 style={styles.title}>Nossos <em style={styles.italic}>Servicos</em></h2>
          <p style={styles.subtitle}>
            Oferecemos solucoes completas em arquitetura, design e urbanismo, do conceito a execucao.
          </p>
        </div>

        <div style={styles.grid}>
          <div style={styles.listCol}>
            {services.map((svc, i) => (
              <div
                key={i}
                className="svc-animate"
                style={{
                  ...styles.item,
                  borderColor: activeIndex === i ? '#c9a96e' : '#2a2a2a',
                  background: activeIndex === i ? 'rgba(201,169,110,0.05)' : 'transparent',
                }}
                onClick={() => setActiveIndex(i)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#c9a96e';
                }}
                onMouseLeave={(e) => {
                  if (activeIndex !== i) {
                    (e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a';
                  }
                }}
              >
                <span style={styles.itemNumber}>{svc.number}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    ...styles.itemTitle,
                    color: activeIndex === i ? '#c9a96e' : '#fff',
                  }}>{svc.title}</h3>
                  <p style={styles.itemDesc}>{svc.description}</p>
                </div>
                <span style={{
                  ...styles.arrow,
                  transform: activeIndex === i ? 'rotate(0deg)' : 'rotate(-90deg)',
                  color: activeIndex === i ? '#c9a96e' : '#555',
                }}>↓</span>
              </div>
            ))}
          </div>

          <div className="svc-detail svc-animate" style={styles.detailCol}>
            <div style={styles.detailImage}>
              <img src={active.image} alt={active.title} style={styles.img} />
              <div style={styles.detailOverlay}>
                <span style={styles.detailNumber}>{active.number}</span>
              </div>
            </div>
            <div style={styles.detailContent}>
              <h3 style={styles.detailTitle}>{active.title}</h3>
              <ul style={styles.features}>
                {active.features.map((f, i) => (
                  <li key={i} style={styles.feature}>
                    <span style={styles.featureDot} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '120px 0',
    background: '#0a0a0a',
  },
  container: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '0 24px',
  },
  header: {
    marginBottom: 60,
  },
  label: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: 4,
    color: '#c9a96e',
    marginBottom: 12,
    display: 'block',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 500,
    color: '#fff',
    marginBottom: 16,
  },
  italic: { fontStyle: 'italic', color: '#c9a96e' },
  subtitle: {
    fontSize: '1rem',
    color: '#888',
    maxWidth: 500,
    lineHeight: 1.7,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 48,
    alignItems: 'start',
  },
  listCol: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 0,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    padding: '24px 20px',
    borderLeft: '3px solid #2a2a2a',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  itemNumber: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#c9a96e',
    opacity: 0.5,
  },
  itemTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.2rem',
    fontWeight: 500,
    marginBottom: 6,
    transition: 'color 0.3s',
  },
  itemDesc: {
    fontSize: '0.85rem',
    color: '#777',
    lineHeight: 1.6,
  },
  arrow: {
    fontSize: '1.2rem',
    transition: 'all 0.3s ease',
  },
  detailCol: {
    position: 'sticky' as const,
    top: 100,
  },
  detailImage: {
    position: 'relative',
    overflow: 'hidden',
    height: 350,
    marginBottom: 24,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  detailOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: '20px 24px',
    background: 'linear-gradient(to top, rgba(10,10,10,0.9), transparent)',
    width: '100%',
  },
  detailNumber: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '3rem',
    fontWeight: 700,
    color: 'rgba(201,169,110,0.3)',
  },
  detailContent: {
    padding: '0 8px',
  },
  detailTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem',
    fontWeight: 500,
    color: '#fff',
    marginBottom: 20,
  },
  features: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 12,
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontSize: '0.9rem',
    color: '#bbb',
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#c9a96e',
    flexShrink: 0,
  },
};

const svcStyles = document.createElement('style');
svcStyles.textContent = `
  @media (max-width: 768px) {
    #services > div > div:last-child {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(svcStyles);

export default Services;
