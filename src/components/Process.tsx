import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Descoberta',
    desc: 'Entendemos suas necessidades, desejos e limitacoes para definir o briefing ideal do projeto.',
    icon: '🔍',
  },
  {
    number: '02',
    title: 'Conceito',
    desc: 'Desenvolvemos estudos preliminares e maquetes 3D para visualizacao do conceito arquitetonico.',
    icon: '✏️',
  },
  {
    number: '03',
    title: 'Desenvolvimento',
    desc: 'Elaboramos o projeto executivo com todos os detalhamentos tecnicos e especificacoes.',
    icon: '📐',
  },
  {
    number: '04',
    title: 'Execucao',
    desc: 'Acompanhamos cada etapa da obra garantindo fidelidade ao projeto e qualidade final.',
    icon: '🏗️',
  },
];

const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.process-card');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 80, opacity: 0, rotateX: 15 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );
    });

    // Animate the connecting line
    gsap.fromTo(
      sectionRef.current.querySelector('.process-line'),
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.label}>NOSSO PROCESSO</span>
          <h2 style={styles.title}>Como <em style={styles.italic}>Trabalhamos</em></h2>
          <p style={styles.subtitle}>
            Um processo estruturado para transformar sua visao em realidade com eficiencia e transparencia.
          </p>
        </div>

        <div style={styles.timeline}>
          <div style={styles.grid}>
            {/* Numbers row */}
            {steps.map((step, i) => (
              <div key={`num-${i}`} className="process-card" style={styles.numberCell}>
                <span style={styles.number}>{step.number}</span>
              </div>
            ))}

            {/* Dots + Line row — single row spanning all 4 columns */}
            <div style={styles.lineRow}>
              <div className="process-line" style={styles.line} />
              {steps.map((_, i) => (
                <div key={`dot-${i}`} style={styles.dotCell}>
                  <div style={styles.dotOuter}>
                    <div style={styles.dotInner} />
                  </div>
                </div>
              ))}
            </div>

            {/* Titles row */}
            {steps.map((step, i) => (
              <div key={`title-${i}`} className="process-card" style={styles.titleCell}>
                <h3 style={styles.cardTitle}>{step.title}</h3>
                <p style={styles.cardDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '120px 0',
    background: '#111',
    overflow: 'hidden',
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
  timeline: {
    position: 'relative',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0 32px',
    position: 'relative',
  },
  numberCell: {
    textAlign: 'center' as const,
    paddingBottom: 12,
  },
  number: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#c9a96e',
  },
  lineRow: {
    gridColumn: '1 / -1',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    position: 'relative',
    height: 20,
    gap: '0 32px',
  },
  line: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
    background: 'linear-gradient(to right, transparent 2%, #c9a96e 12%, #c9a96e 88%, transparent 98%)',
    transform: 'translateY(-50%)',
    transformOrigin: 'left',
    zIndex: 0,
  },
  dotCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
  },
  dotOuter: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    border: '2px solid #c9a96e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#111',
  },
  dotInner: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#c9a96e',
  },
  titleCell: {
    textAlign: 'center' as const,
    padding: '24px 12px 0',
  },
  cardTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.3rem',
    fontWeight: 500,
    color: '#fff',
    marginBottom: 12,
  },
  cardDesc: {
    fontSize: '0.85rem',
    color: '#888',
    lineHeight: 1.7,
  },
};

const processStyles = document.createElement('style');
processStyles.textContent = `
  @media (max-width: 768px) {
    section:has(.process-card) .process-line { display: none !important; }
    section:has(.process-card) > div > div:last-child > div { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 480px) {
    section:has(.process-card) > div > div:last-child > div { grid-template-columns: 1fr !important; }
  }
`;
document.head.appendChild(processStyles);

export default Process;
