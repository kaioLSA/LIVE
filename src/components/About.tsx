import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateHeadingReveal, animateLabelReveal } from '../utils/textReveal';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Label: letter-spacing reveal
    const label = section.querySelector('.about-label') as HTMLElement;
    if (label) animateLabelReveal(label, section);

    // Heading: word-by-word reveal
    const heading = section.querySelector('.about-heading') as HTMLElement;
    if (heading) animateHeadingReveal(heading, section, { start: 'top 78%', end: 'top 45%' });

    // Text paragraphs: scrub fade up
    gsap.fromTo(
      section.querySelectorAll('.about-text'),
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.08,
        scrollTrigger: { trigger: section, start: 'top 65%', end: 'top 25%', scrub: 1 },
      }
    );

    // Values: scrub slide in
    gsap.fromTo(
      section.querySelectorAll('.about-value'),
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1, stagger: 0.06,
        scrollTrigger: { trigger: section.querySelector('.about-values'), start: 'top 85%', end: 'top 45%', scrub: 1 },
      }
    );

    // Main image: scale + reveal
    gsap.fromTo(
      section.querySelector('.about-image'),
      { scale: 1.15, opacity: 0, clipPath: 'inset(10% 10% 10% 10%)' },
      {
        scale: 1, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)',
        scrollTrigger: { trigger: section, start: 'top 75%', end: 'top 25%', scrub: 1 },
      }
    );

    // Secondary image: slide up
    gsap.fromTo(
      section.querySelector('.about-image-2'),
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1,
        scrollTrigger: { trigger: section, start: 'top 60%', end: 'top 20%', scrub: 1 },
      }
    );

    // Divider line grows
    gsap.fromTo(
      section.querySelector('.about-divider'),
      { scaleX: 0 },
      {
        scaleX: 1,
        scrollTrigger: { trigger: section.querySelector('.about-divider'), start: 'top 85%', end: 'top 65%', scrub: 1 },
      }
    );
  }, []);

  const values = [
    { icon: '01', title: 'Escuta Real', desc: 'Cada projeto comeca com uma conversa genuina para entender sua essencia' },
    { icon: '02', title: 'Cuidado Minucioso', desc: 'Do conceito a execucao, cada detalhe e pensado com precisao' },
    { icon: '03', title: 'Resultado Unico', desc: 'Projetos tao singulares quanto a historia de cada cliente' },
  ];

  return (
    <section ref={sectionRef} id="about" style={styles.section}>
      <div style={styles.container}>
        <div className="about-grid" style={styles.grid}>
          <div style={styles.imageCol}>
            <div className="about-image" style={styles.imageWrapper}>
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                alt="Interior moderno"
                style={styles.image}
              />
            </div>
            <div className="about-image-2" style={styles.imageSmall}>
              <img
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80"
                alt="Detalhe arquitetonico"
                style={styles.image}
              />
              <div style={styles.experience}>
                <span style={styles.expNumber}>20</span>
                <span style={styles.expText}>ANOS DE{'\n'}EXPERIENCIA</span>
              </div>
            </div>
          </div>

          <div style={styles.textCol}>
            <span className="about-label" style={styles.label}>QUEM SOMOS</span>
            <h2 className="about-heading" style={styles.title}>
              Um escritorio boutique que cria projetos{' '}
              <em style={styles.italic}>unicos</em>
            </h2>
            <p className="about-text" style={styles.text}>
              Somos um escritorio boutique que cria projetos unicos, guiados por escuta real,
              cuidado minucioso e relacoes proximas — porque cada cliente merece um processo
              tao singular quanto sua historia.
            </p>
            <p className="about-text" style={styles.text}>
              Liderado por Lilian Bianchini, Felipe Matos e Vitoria Ferreira, a LIV.E
              combina mais de 20 anos de experiencia em arquitetura, interiores e gestao
              de obras para entregar resultados que unem beleza, elegancia e funcionalidade.
            </p>

            <div className="about-divider" style={styles.divider} />

            <div className="about-values" style={styles.values}>
              {values.map((v, i) => (
                <div key={i} className="about-value" style={styles.value}>
                  <span style={styles.valueIcon}>{v.icon}</span>
                  <div>
                    <h4 style={styles.valueTitle}>{v.title}</h4>
                    <p style={styles.valueDesc}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: { padding: '120px 0', background: '#0a0a0a', overflow: 'hidden' },
  container: { maxWidth: 1400, margin: '0 auto', padding: '0 24px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' },
  imageCol: { position: 'relative' },
  imageWrapper: { overflow: 'hidden' },
  image: { width: '100%', height: '100%', objectFit: 'cover' as const, display: 'block' },
  imageSmall: { position: 'absolute', bottom: -40, right: -40, width: '55%', border: '8px solid #0a0a0a' },
  experience: { position: 'absolute', top: -30, left: -30, background: '#c9a96e', padding: '24px 20px', display: 'flex', alignItems: 'center', gap: 10 },
  expNumber: { fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 700, color: '#0a0a0a', lineHeight: 1 },
  expText: { fontSize: '0.6rem', fontWeight: 700, letterSpacing: 2, color: '#0a0a0a', lineHeight: 1.4, whiteSpace: 'pre-line' as const },
  textCol: { paddingLeft: 20 },
  label: { fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#c9a96e', marginBottom: 16, display: 'block' },
  title: { fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, lineHeight: 1.2, color: '#fff', marginBottom: 24 },
  italic: { fontStyle: 'italic', color: '#c9a96e' },
  text: { fontSize: '1rem', color: '#999', lineHeight: 1.8, marginBottom: 16 },
  divider: { width: 60, height: 2, background: '#c9a96e', margin: '32px 0', transformOrigin: 'left' },
  values: { display: 'flex', flexDirection: 'column' as const, gap: 24 },
  value: { display: 'flex', gap: 20, alignItems: 'flex-start' },
  valueIcon: { fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 700, color: '#c9a96e', minWidth: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(201,169,110,0.3)' },
  valueTitle: { fontFamily: "'Inter', sans-serif", fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: 4 },
  valueDesc: { fontSize: '0.875rem', color: '#777', lineHeight: 1.6 },
};

export default About;
