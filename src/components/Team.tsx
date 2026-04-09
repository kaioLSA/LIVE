import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: 'Rafael Mendes',
    role: 'Diretor Criativo & Fundador',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80',
    bio: 'Mais de 20 anos de experiencia em projetos premiados internacionalmente.',
  },
  {
    name: 'Juliana Torres',
    role: 'Arquiteta Senior',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80',
    bio: 'Especialista em arquitetura sustentavel e certificacoes LEED.',
  },
  {
    name: 'Lucas Almeida',
    role: 'Designer de Interiores',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80',
    bio: 'Referencia em design biofílico e espacos corporativos.',
  },
  {
    name: 'Marina Costa',
    role: 'Urbanista & Paisagista',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80',
    bio: 'Mestre em planejamento urbano com foco em cidades inteligentes.',
  },
];

const Team: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.team-animate'),
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="team" style={styles.section}>
      <div style={styles.container}>
        <div className="team-animate" style={styles.header}>
          <span style={styles.label}>NOSSA EQUIPE</span>
          <h2 style={styles.title}>Os <em style={styles.italic}>Talentos</em> por Tras dos Projetos</h2>
          <p style={styles.subtitle}>
            Uma equipe multidisciplinar unida pela paixao por criar espacos extraordinarios.
          </p>
        </div>

        <div style={styles.grid}>
          {team.map((member, i) => (
            <div
              key={i}
              className="team-animate"
              style={styles.card}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div style={styles.imageWrapper}>
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    ...styles.img,
                    transform: hoveredIndex === i ? 'scale(1.05)' : 'scale(1)',
                    filter: hoveredIndex === i ? 'none' : 'grayscale(60%)',
                  }}
                />
                <div style={{
                  ...styles.overlay,
                  opacity: hoveredIndex === i ? 1 : 0,
                }}>
                  <p style={styles.bio}>{member.bio}</p>
                  <div style={styles.socials}>
                    {['LinkedIn', 'Instagram'].map((s) => (
                      <span key={s} style={styles.social}>{s}</span>
                    ))}
                  </div>
                </div>
                <div style={styles.goldBar} />
              </div>
              <div style={styles.info}>
                <h3 style={styles.name}>{member.name}</h3>
                <span style={styles.role}>{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
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
    textAlign: 'center' as const,
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
    margin: '0 auto',
    lineHeight: 1.7,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 24,
  },
  card: {
    cursor: 'pointer',
  },
  imageWrapper: {
    position: 'relative',
    overflow: 'hidden',
    height: 380,
    marginBottom: 20,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    transition: 'all 0.5s ease',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 50%)',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-end',
    padding: 24,
    transition: 'opacity 0.4s ease',
  },
  bio: {
    fontSize: '0.85rem',
    color: '#ccc',
    lineHeight: 1.6,
    marginBottom: 16,
  },
  socials: {
    display: 'flex',
    gap: 12,
  },
  social: {
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
    color: '#c9a96e',
    padding: '6px 12px',
    border: '1px solid rgba(201,169,110,0.3)',
  },
  goldBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    background: '#c9a96e',
  },
  info: {
    textAlign: 'center' as const,
  },
  name: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.15rem',
    fontWeight: 500,
    color: '#fff',
    marginBottom: 4,
  },
  role: {
    fontSize: '0.8rem',
    color: '#c9a96e',
    letterSpacing: 1,
    fontWeight: 500,
  },
};

const teamStyles = document.createElement('style');
teamStyles.textContent = `
  @media (max-width: 1024px) {
    #team > div > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
  }
  @media (max-width: 600px) {
    #team > div > div:last-child { grid-template-columns: 1fr !important; }
    #team > div > div:last-child > div > div:first-child { height: 300px !important; }
  }
`;
document.head.appendChild(teamStyles);

export default Team;
