import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateHeadingReveal, animateLabelReveal } from '../utils/textReveal';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Residencia Aurora',
    category: 'Residencial',
    location: 'Sao Paulo, SP',
    year: '2024',
    area: '450m2',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
    description: 'Uma residencia contemporanea que integra natureza e conforto em harmonia perfeita.',
  },
  {
    title: 'Torre Solaris',
    category: 'Comercial',
    location: 'Rio de Janeiro, RJ',
    year: '2023',
    area: '12.000m2',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80',
    description: 'Edificio corporativo com certificacao LEED e design inovador no coracao da cidade.',
  },
  {
    title: 'Casa Horizonte',
    category: 'Residencial',
    location: 'Florianopolis, SC',
    year: '2024',
    area: '320m2',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80',
    description: 'Projeto de luxo com vista panoramica para o mar e acabamentos premium.',
  },
  {
    title: 'Espaco Conceito',
    category: 'Interiores',
    location: 'Curitiba, PR',
    year: '2023',
    area: '800m2',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80',
    description: 'Showroom de design que une arte, tecnologia e experiencia sensorial.',
  },
  {
    title: 'Parque Urbano Viva',
    category: 'Urbanismo',
    location: 'Belo Horizonte, MG',
    year: '2024',
    area: '25.000m2',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=80',
    description: 'Revitalizacao urbana que transforma area degradada em espaco de convivencia.',
  },
  {
    title: 'Loft Industrial',
    category: 'Interiores',
    location: 'Porto Alegre, RS',
    year: '2023',
    area: '180m2',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80',
    description: 'Conversao de galpao industrial em loft contemporaneo com identidade unica.',
  },
];

const categories = ['Todos', 'Residencial', 'Comercial', 'Interiores', 'Urbanismo'];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === 'Todos'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    // Label typography
    const label = section.querySelector('.proj-label') as HTMLElement;
    if (label) animateLabelReveal(label, section);

    // Heading word reveal
    const heading = section.querySelector('.proj-heading') as HTMLElement;
    if (heading) animateHeadingReveal(heading, section);

    // Subtitle fade
    gsap.fromTo(
      section.querySelector('.proj-subtitle'),
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1,
        scrollTrigger: { trigger: section, start: 'top 70%', end: 'top 45%', scrub: 1 },
      }
    );

    // Filter buttons slide in
    gsap.fromTo(
      section.querySelectorAll('.proj-filter-btn'),
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.04,
        scrollTrigger: { trigger: section, start: 'top 65%', end: 'top 40%', scrub: 1 },
      }
    );
  }, []);

  // Cards animate on filter change (these stay non-scrub since they're user-triggered)
  useEffect(() => {
    if (!cardsRef.current) return;
    gsap.fromTo(
      cardsRef.current.children,
      { y: 60, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out' }
    );
  }, [activeFilter]);

  return (
    <section ref={sectionRef} id="projects" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <span className="proj-label" style={styles.label}>PORTFOLIO</span>
            <h2 className="proj-heading" style={styles.title}>Nossos <em style={styles.italic}>Projetos</em></h2>
          </div>
          <p className="proj-subtitle" style={styles.subtitle}>
            Cada projeto e uma narrativa unica, desenhada para superar expectativas.
          </p>
        </div>

        <div style={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat}
              className="proj-filter-btn"
              onClick={() => setActiveFilter(cat)}
              style={{
                ...styles.filterBtn,
                background: activeFilter === cat ? '#c9a96e' : 'transparent',
                color: activeFilter === cat ? '#0a0a0a' : '#999',
                borderColor: activeFilter === cat ? '#c9a96e' : '#333',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={cardsRef} style={styles.grid}>
          {filtered.map((project, i) => (
            <div
              key={project.title}
              style={styles.card}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div style={styles.cardImage}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    ...styles.img,
                    transform: hoveredIndex === i ? 'scale(1.08)' : 'scale(1)',
                  }}
                />
                <div style={{
                  ...styles.cardOverlay,
                  opacity: hoveredIndex === i ? 1 : 0,
                }}>
                  <span style={styles.cardCategory}>{project.category}</span>
                </div>
              </div>
              <div style={styles.cardContent}>
                <div style={styles.cardMeta}>
                  <span>{project.location}</span>
                  <span>{project.area}</span>
                </div>
                <h3 style={styles.cardTitle}>{project.title}</h3>
                <p style={styles.cardDesc}>{project.description}</p>
                <div style={styles.cardFooter}>
                  <span style={styles.cardYear}>{project.year}</span>
                  <span
                    style={{
                      ...styles.cardLink,
                      transform: hoveredIndex === i ? 'translateX(0)' : 'translateX(-10px)',
                      opacity: hoveredIndex === i ? 1 : 0,
                    }}
                  >
                    Ver Projeto →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #projects > div > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          #projects > div > div:last-child { grid-template-columns: 1fr !important; }
          #projects > div > div:first-child { flex-direction: column !important; align-items: flex-start !important; }
          #projects > div > div:first-child p { text-align: left !important; }
        }
      `}</style>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '120px 0',
    background: '#111',
  },
  container: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '0 24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 40,
    flexWrap: 'wrap' as const,
    gap: 24,
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
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 500,
    color: '#fff',
  },
  italic: {
    fontStyle: 'italic',
    color: '#c9a96e',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#888',
    maxWidth: 400,
    lineHeight: 1.7,
    textAlign: 'right' as const,
  },
  filters: {
    display: 'flex',
    gap: 12,
    marginBottom: 48,
    flexWrap: 'wrap' as const,
  },
  filterBtn: {
    padding: '10px 24px',
    border: '1px solid #333',
    borderRadius: 0,
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 500,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
  },
  card: {
    background: '#1a1a1a',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
  },
  cardImage: {
    position: 'relative',
    overflow: 'hidden',
    height: 280,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    transition: 'transform 0.6s ease',
  },
  cardOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(10,10,10,0.9), transparent)',
    display: 'flex',
    alignItems: 'flex-end',
    padding: 20,
    transition: 'opacity 0.4s ease',
  },
  cardCategory: {
    padding: '6px 14px',
    background: '#c9a96e',
    color: '#0a0a0a',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
  },
  cardContent: {
    padding: '24px 20px',
  },
  cardMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.75rem',
    color: '#666',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.3rem',
    fontWeight: 500,
    color: '#fff',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: '0.85rem',
    color: '#888',
    lineHeight: 1.6,
    marginBottom: 16,
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #2a2a2a',
    paddingTop: 16,
  },
  cardYear: {
    fontSize: '0.8rem',
    color: '#c9a96e',
    fontWeight: 600,
  },
  cardLink: {
    fontSize: '0.8rem',
    color: '#c9a96e',
    fontWeight: 500,
    transition: 'all 0.3s ease',
  },
};


export default Projects;
