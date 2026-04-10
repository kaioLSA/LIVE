import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateHeadingReveal, animateLabelReveal } from '../utils/textReveal';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Descoberta',
    desc: 'Entendemos suas necessidades, desejos e limitacoes para definir o briefing ideal do projeto.',
  },
  {
    number: '02',
    title: 'Conceito',
    desc: 'Desenvolvemos estudos preliminares e maquetes 3D para visualizacao do conceito arquitetonico.',
  },
  {
    number: '03',
    title: 'Desenvolvimento',
    desc: 'Elaboramos o projeto executivo com todos os detalhamentos tecnicos e especificacoes.',
  },
  {
    number: '04',
    title: 'Execucao',
    desc: 'Acompanhamos cada etapa da obra garantindo fidelidade ao projeto e qualidade final.',
  },
];

const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    const label = section.querySelector('.process-label') as HTMLElement;
    if (label) animateLabelReveal(label, section);

    const heading = section.querySelector('.process-heading') as HTMLElement;
    if (heading) animateHeadingReveal(heading, section);

    gsap.fromTo(
      section.querySelector('.process-subtitle'),
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1,
        scrollTrigger: { trigger: section, start: 'top 70%', end: 'top 45%', scrub: 1 },
      }
    );

    const cards = section.querySelectorAll('.process-card');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0, rotateX: 15 },
        {
          y: 0, opacity: 1, rotateX: 0,
          scrollTrigger: {
            trigger: section.querySelector('.process-timeline'),
            start: `top ${80 - i * 5}%`,
            end: `top ${45 - i * 5}%`,
            scrub: 1,
          },
        }
      );
    });

    gsap.fromTo(
      section.querySelector('.process-line'),
      { scaleX: 0 },
      {
        scaleX: 1,
        scrollTrigger: {
          trigger: section.querySelector('.process-timeline'),
          start: 'top 70%',
          end: 'top 35%',
          scrub: 1,
        },
      }
    );

    // Vertical line for mobile
    gsap.fromTo(
      section.querySelector('.process-line-vertical'),
      { scaleY: 0 },
      {
        scaleY: 1,
        scrollTrigger: {
          trigger: section.querySelector('.process-timeline'),
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      section.querySelectorAll('.process-dot'),
      { scale: 0, opacity: 0 },
      {
        scale: 1, opacity: 1, stagger: 0.06,
        scrollTrigger: {
          trigger: section.querySelector('.process-timeline'),
          start: 'top 65%',
          end: 'top 35%',
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span className="process-label" style={styles.label}>NOSSO PROCESSO</span>
          <h2 className="process-heading" style={styles.title}>Como <em style={styles.italic}>Trabalhamos</em></h2>
          <p className="process-subtitle" style={styles.subtitle}>
            Um processo estruturado para transformar sua visao em realidade com eficiencia e transparencia.
          </p>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="process-timeline process-desktop" style={styles.timeline}>
          <div style={styles.grid}>
            {steps.map((step, i) => (
              <div key={`num-${i}`} className="process-card" style={styles.numberCell}>
                <span style={styles.number}>{step.number}</span>
              </div>
            ))}

            <div style={styles.lineRow}>
              <div className="process-line" style={styles.line} />
              {steps.map((_, i) => (
                <div key={`dot-${i}`} style={styles.dotCell}>
                  <div className="process-dot" style={styles.dotOuter}>
                    <div style={styles.dotInner} />
                  </div>
                </div>
              ))}
            </div>

            {steps.map((step, i) => (
              <div key={`title-${i}`} className="process-card" style={styles.titleCell}>
                <h3 style={styles.cardTitle}>{step.title}</h3>
                <p style={styles.cardDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: vertical timeline */}
        <div className="process-timeline process-mobile" style={{ position: 'relative' }}>
          <div className="process-line-vertical" style={styles.verticalLine} />
          {steps.map((step, i) => (
            <div key={i} className="process-card" style={styles.mobileStep}>
              <div style={styles.mobileDotCol}>
                <div className="process-dot" style={styles.dotOuter}>
                  <div style={styles.dotInner} />
                </div>
              </div>
              <div style={styles.mobileContent}>
                <span style={styles.mobileNumber}>{step.number}</span>
                <h3 style={styles.mobileTitle}>{step.title}</h3>
                <p style={styles.mobileDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .process-mobile { display: none; }
        @media (max-width: 768px) {
          .process-desktop { display: none !important; }
          .process-mobile { display: block !important; }
        }
      `}</style>
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
    fontFamily: "'Cormorant Garamond', serif",
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
    fontFamily: "'Cormorant Garamond', serif",
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
    border: '2px solid #8B2335',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#111',
    flexShrink: 0,
  },
  dotInner: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#8B2335',
  },
  titleCell: {
    textAlign: 'center' as const,
    padding: '24px 12px 0',
  },
  cardTitle: {
    fontFamily: "'Cormorant Garamond', serif",
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
  // Mobile vertical timeline
  verticalLine: {
    position: 'absolute',
    left: 9,
    top: 10,
    bottom: 10,
    width: 1,
    background: '#8B2335',
    transformOrigin: 'top',
    zIndex: 0,
  },
  mobileStep: {
    display: 'flex',
    gap: 24,
    marginBottom: 40,
    position: 'relative',
  },
  mobileDotCol: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    paddingTop: 4,
    zIndex: 1,
  },
  mobileContent: {
    flex: 1,
    paddingBottom: 8,
  },
  mobileNumber: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#c9a96e',
    display: 'block',
    marginBottom: 4,
  },
  mobileTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.4rem',
    fontWeight: 500,
    color: '#fff',
    marginBottom: 8,
  },
  mobileDesc: {
    fontSize: '0.85rem',
    color: '#888',
    lineHeight: 1.7,
  },
};

export default Process;
