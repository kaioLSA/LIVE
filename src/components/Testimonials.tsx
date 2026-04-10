import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateHeadingReveal, animateLabelReveal } from '../utils/textReveal';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Ana Paula Ribeiro',
    role: 'CEO, Grupo Innovare',
    text: 'O LIV.E transformou nossa sede corporativa em um espaco que reflete nossa identidade. A equipe entendeu perfeitamente nossa visao e superou todas as expectativas.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    project: 'Torre Solaris',
  },
  {
    name: 'Fernando Gomes',
    role: 'Investidor Imobiliario',
    text: 'Ja realizamos 5 projetos juntos e cada um e melhor que o anterior. A atencao aos detalhes e o compromisso com prazos fazem do LIV.E nosso parceiro ideal.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    project: 'Residencia Aurora',
  },
  {
    name: 'Camila Santos',
    role: 'Diretora de Operacoes',
    text: 'O bom gosto e a confianca que a equipe da LIV.E transmite sao incomparaveis. Cuidaram de cada etapa do processo, do conceito a execucao, com resultado impecavel.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    project: 'Espaco Conceito',
  },
];

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    // Label typography
    const label = section.querySelector('.test-label') as HTMLElement;
    if (label) animateLabelReveal(label, section);

    // Heading word reveal
    const heading = section.querySelector('.test-heading') as HTMLElement;
    if (heading) animateHeadingReveal(heading, section);

    // Card: scrub slide in
    gsap.fromTo(
      section.querySelector('.test-card'),
      { x: 60, opacity: 0 },
      {
        x: 0, opacity: 1,
        scrollTrigger: { trigger: section, start: 'top 70%', end: 'top 35%', scrub: 1 },
      }
    );

    // Dots
    gsap.fromTo(
      section.querySelector('.test-dots'),
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        scrollTrigger: { trigger: section, start: 'top 65%', end: 'top 45%', scrub: 1 },
      }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo('.test-card-content', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
  }, [active]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const t = testimonials[active];

  return (
    <section ref={sectionRef} style={styles.section}>
      <div style={styles.container}>
        <div style={styles.grid}>
          <div>
            <span className="test-label" style={styles.label}>DEPOIMENTOS</span>
            <h2 className="test-heading" style={styles.title}>O que nossos <em style={styles.italic}>clientes</em> dizem</h2>
            <div className="test-dots" style={styles.dots}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    ...styles.dot,
                    background: active === i ? '#c9a96e' : '#333',
                    width: active === i ? 32 : 10,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="test-card" style={styles.card}>
            <div className="test-card-content">
              <div style={styles.quoteIcon}>"</div>
              <p style={styles.text}>{t.text}</p>
              <div style={styles.author}>
                <img src={t.image} alt={t.name} style={styles.avatar} />
                <div>
                  <h4 style={styles.authorName}>{t.name}</h4>
                  <span style={styles.authorRole}>{t.role}</span>
                  <span style={styles.project}>Projeto: {t.project}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section:has(.test-card) > div > div { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
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
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr',
    gap: 80,
    alignItems: 'center',
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
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 500,
    color: '#fff',
    marginBottom: 32,
  },
  italic: { fontStyle: 'italic', color: '#c9a96e' },
  dots: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  card: {
    background: '#1a1a1a',
    padding: '48px 40px',
    position: 'relative',
    borderLeft: '3px solid #c9a96e',
  },
  quoteIcon: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '5rem',
    color: 'rgba(201,169,110,0.2)',
    lineHeight: 1,
    marginBottom: -20,
  },
  text: {
    fontSize: '1.1rem',
    color: '#ccc',
    lineHeight: 1.9,
    marginBottom: 32,
    fontStyle: 'italic',
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    objectFit: 'cover' as const,
    border: '2px solid #c9a96e',
  },
  authorName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.1rem',
    color: '#fff',
    marginBottom: 2,
  },
  authorRole: {
    fontSize: '0.8rem',
    color: '#888',
    display: 'block',
  },
  project: {
    fontSize: '0.7rem',
    color: '#c9a96e',
    letterSpacing: 1,
    fontWeight: 600,
    marginTop: 4,
    display: 'block',
  },
};


export default Testimonials;
