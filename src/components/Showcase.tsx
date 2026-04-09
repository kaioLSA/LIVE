import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const showcaseItems = [
  {
    category: 'Arquitetura',
    title: 'Projetos que definem paisagens',
    description:
      'Criamos edificacoes que dialogam com o entorno, combinando funcionalidade, estetica e sustentabilidade. Do residencial ao corporativo, cada projeto e pensado para gerar impacto positivo.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80',
    features: ['Residencial', 'Corporativo', 'Institucional', 'Hotelaria'],
  },
  {
    category: 'Interiores',
    title: 'Ambientes que contam historias',
    description:
      'Nosso design de interiores transforma espacos em experiencias sensoriais. Trabalhamos com materiais nobres, iluminacao cenografica e mobiliario exclusivo para criar ambientes unicos.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80',
    features: ['Espacos Comerciais', 'Residencias', 'Restaurantes', 'Escritorios'],
  },
  {
    category: 'Retrofit',
    title: 'Renovacao com inteligencia',
    description:
      'Revitalizamos edificacoes existentes com tecnologia de ponta e respeito a historia do espaco. Nossos projetos de retrofit agregam valor, eficiencia energetica e nova vida a construcoes consolidadas.',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1000&q=80',
    features: ['Revitalizacao', 'Eficiencia Energetica', 'Modernizacao', 'Patrimonio'],
  },
];

const Showcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll('.showcase-item');
    items.forEach((item) => {
      const img = item.querySelector('.showcase-img') as HTMLElement;
      const text = item.querySelector('.showcase-text') as HTMLElement;

      gsap.fromTo(
        img,
        { x: img.dataset.dir === 'left' ? -80 : 80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 70%' },
        }
      );

      gsap.fromTo(
        text,
        { x: img.dataset.dir === 'left' ? 80 : -80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: item, start: 'top 70%' },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.label}>NOSSAS ESPECIALIDADES</span>
          <h2 style={styles.title}>Areas de <em style={styles.italic}>Atuacao</em></h2>
        </div>

        {showcaseItems.map((item, i) => {
          const isReversed = i % 2 !== 0;
          return (
            <div
              key={i}
              className="showcase-item"
              style={{
                ...styles.row,
                flexDirection: isReversed ? 'row-reverse' : 'row',
              }}
            >
              <div
                className="showcase-img"
                data-dir={isReversed ? 'right' : 'left'}
                style={styles.imageCol}
              >
                <div style={styles.imageWrapper}>
                  <img src={item.image} alt={item.title} style={styles.img} />
                  <div style={styles.imageOverlay}>
                    <span style={styles.imageCategory}>{item.category}</span>
                  </div>
                </div>
              </div>

              <div className="showcase-text" style={styles.textCol}>
                <span style={styles.itemLabel}>{item.category}</span>
                <h3 style={styles.itemTitle}>{item.title}</h3>
                <p style={styles.itemDesc}>{item.description}</p>
                <div style={styles.features}>
                  {item.features.map((f, j) => (
                    <span key={j} style={styles.feature}>
                      <span style={styles.featureDot} />
                      {f}
                    </span>
                  ))}
                </div>
                <button
                  style={styles.btn}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#c9a96e';
                    e.currentTarget.style.color = '#0a0a0a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#c9a96e';
                  }}
                >
                  Saiba Mais
                </button>
              </div>
            </div>
          );
        })}
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
    textAlign: 'center' as const,
    marginBottom: 80,
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
  },
  italic: { fontStyle: 'italic', color: '#c9a96e' },
  row: {
    display: 'flex',
    gap: 60,
    alignItems: 'center',
    marginBottom: 100,
  },
  imageCol: {
    flex: '1 1 55%',
    minWidth: 0,
  },
  imageWrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: 500,
    objectFit: 'cover' as const,
    display: 'block',
    transition: 'transform 0.6s ease',
  },
  imageOverlay: {
    position: 'absolute',
    top: 24,
    left: 24,
  },
  imageCategory: {
    padding: '8px 16px',
    background: 'rgba(10,10,10,0.7)',
    backdropFilter: 'blur(10px)',
    color: '#c9a96e',
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: 3,
    textTransform: 'uppercase' as const,
    border: '1px solid rgba(201,169,110,0.2)',
  },
  textCol: {
    flex: '1 1 45%',
    minWidth: 0,
  },
  itemLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: 4,
    textTransform: 'uppercase' as const,
    color: '#c9a96e',
    marginBottom: 12,
    display: 'block',
  },
  itemTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
    fontWeight: 500,
    color: '#fff',
    lineHeight: 1.2,
    marginBottom: 20,
  },
  itemDesc: {
    fontSize: '0.95rem',
    color: '#999',
    lineHeight: 1.8,
    marginBottom: 28,
  },
  features: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px 24px',
    marginBottom: 32,
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontSize: '0.85rem',
    color: '#bbb',
  },
  featureDot: {
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: '#c9a96e',
    flexShrink: 0,
  },
  btn: {
    padding: '12px 32px',
    background: 'transparent',
    color: '#c9a96e',
    border: '1px solid #c9a96e',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

const showcaseStyles = document.createElement('style');
showcaseStyles.textContent = `
  .showcase-item:hover .showcase-img img { transform: scale(1.03); }
  @media (max-width: 900px) {
    .showcase-item { flex-direction: column !important; gap: 32px !important; }
    .showcase-item > div:first-child { flex: 1 1 100% !important; }
    .showcase-item > div:last-child { flex: 1 1 100% !important; }
    .showcase-item img { height: 350px !important; }
  }
  @media (max-width: 480px) {
    .showcase-item img { height: 250px !important; }
  }
`;
document.head.appendChild(showcaseStyles);

export default Showcase;
