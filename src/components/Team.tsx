import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateHeadingReveal, animateLabelReveal } from '../utils/textReveal';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: 'Lilian Bianchini',
    role: 'Fundadora & Diretora Criativa',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80',
    bio: 'Mais de 20 anos de experiencia em projetos de arquitetura e interiores de alto padrao.',
    years: '20 anos',
  },
  {
    name: 'Felipe Matos',
    role: 'Arquiteto & Socio',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80',
    bio: '7 anos de experiencia em projetos arquitetonicos residenciais e corporativos.',
    years: '7 anos',
  },
  {
    name: 'Vitoria Ferreira',
    role: 'Designer de Interiores & Socia',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80',
    bio: '5 anos criando ambientes que combinam beleza, elegancia e funcionalidade.',
    years: '5 anos',
  },
];

const Team: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    // Label typography
    const label = section.querySelector('.team-label') as HTMLElement;
    if (label) animateLabelReveal(label, section);

    // Heading word reveal
    const heading = section.querySelector('.team-heading') as HTMLElement;
    if (heading) animateHeadingReveal(heading, section);

    // Subtitle
    gsap.fromTo(
      section.querySelector('.team-subtitle'),
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1,
        scrollTrigger: { trigger: section, start: 'top 70%', end: 'top 45%', scrub: 1 },
      }
    );

    // Team cards: scrub stagger from bottom
    gsap.fromTo(
      section.querySelectorAll('.team-card'),
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1, stagger: 0.08,
        scrollTrigger: {
          trigger: section.querySelector('.team-grid'),
          start: 'top 85%',
          end: 'top 35%',
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="team" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span className="team-label" style={styles.label}>NOSSA EQUIPE</span>
          <h2 className="team-heading" style={styles.title}>Os <em style={styles.italic}>Talentos</em> por Tras dos Projetos</h2>
          <p className="team-subtitle" style={styles.subtitle}>
            Uma equipe unida pela paixao por criar espacos extraordinarios, com confianca e comprometimento em cada entrega.
          </p>
        </div>

        <div className="team-grid" style={styles.grid}>
          {team.map((member, i) => (
            <div
              key={i}
              className="team-card"
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
                <div style={{ ...styles.overlay, opacity: hoveredIndex === i ? 1 : 0 }}>
                  <p style={styles.bio}>{member.bio}</p>
                </div>
                <div style={styles.goldBar} />
                <div style={styles.yearsBadge}>
                  <span style={styles.yearsText}>{member.years}</span>
                </div>
              </div>
              <div style={styles.info}>
                <h3 style={styles.name}>{member.name}</h3>
                <span style={styles.role}>{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .team-grid { grid-template-columns: 1fr !important; max-width: 400px !important; margin: 0 auto !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .team-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: { padding: '120px 0', background: '#111' },
  container: { maxWidth: 1400, margin: '0 auto', padding: '0 24px' },
  header: { textAlign: 'center' as const, marginBottom: 60 },
  label: { fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: 4, color: '#c9a96e', marginBottom: 12, display: 'block' },
  title: { fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 500, color: '#fff', marginBottom: 16 },
  italic: { fontStyle: 'italic', color: '#c9a96e' },
  subtitle: { fontSize: '1rem', color: '#888', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 },
  card: { cursor: 'pointer' },
  imageWrapper: { position: 'relative', overflow: 'hidden', height: 420, marginBottom: 20 },
  img: { width: '100%', height: '100%', objectFit: 'cover' as const, transition: 'all 0.5s ease' },
  overlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 50%)', display: 'flex', flexDirection: 'column' as const, justifyContent: 'flex-end', padding: 24, transition: 'opacity 0.4s ease' },
  bio: { fontSize: '0.85rem', color: '#ccc', lineHeight: 1.6 },
  goldBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: '#8B2335' },
  yearsBadge: { position: 'absolute', top: 16, right: 16, background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(10px)', padding: '6px 14px', border: '1px solid rgba(201,169,110,0.3)' },
  yearsText: { fontSize: '0.7rem', fontWeight: 600, letterSpacing: 1, color: '#c9a96e', textTransform: 'uppercase' as const },
  info: { textAlign: 'center' as const },
  name: { fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 500, color: '#fff', marginBottom: 4 },
  role: { fontSize: '0.8rem', color: '#c9a96e', letterSpacing: 1, fontWeight: 500 },
};

export default Team;
