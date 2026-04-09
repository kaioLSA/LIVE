import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelectorAll('.about-animate'),
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%' },
      }
    );

    gsap.fromTo(
      section.querySelector('.about-image'),
      { scale: 1.2, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 70%' },
      }
    );

    gsap.fromTo(
      section.querySelector('.about-image-2'),
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 65%' },
      }
    );
  }, []);

  const values = [
    { icon: '01', title: 'Inovacao', desc: 'Solucoes criativas que desafiam o convencional' },
    { icon: '02', title: 'Sustentabilidade', desc: 'Projetos eco-conscientes para o futuro' },
    { icon: '03', title: 'Excelencia', desc: 'Atencao meticulosa a cada detalhe' },
  ];

  return (
    <section ref={sectionRef} id="about" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.grid}>
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
                <span style={styles.expNumber}>15</span>
                <span style={styles.expText}>ANOS DE<br />EXPERIENCIA</span>
              </div>
            </div>
          </div>

          <div style={styles.textCol}>
            <span className="about-animate" style={styles.label}>SOBRE NOS</span>
            <h2 className="about-animate" style={styles.title}>
              Projetamos espacos que <em style={styles.italic}>inspiram</em> e transformam vidas
            </h2>
            <p className="about-animate" style={styles.text}>
              Fundado em 2009, o LIV.E nasceu da paixao por criar espacos que transcendem
              a simples funcionalidade. Nossa equipe multidisciplinar combina criatividade,
              tecnica e sensibilidade para entregar projetos que refletem a essencia de cada cliente.
            </p>
            <p className="about-animate" style={styles.text}>
              Acreditamos que a boa arquitetura transforma nao apenas espacos fisicos,
              mas a forma como as pessoas vivem, trabalham e se relacionam com o ambiente ao seu redor.
            </p>

            <div className="about-animate" style={styles.divider} />

            <div style={styles.values}>
              {values.map((v, i) => (
                <div key={i} className="about-animate" style={styles.value}>
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
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '120px 0',
    background: '#0a0a0a',
    overflow: 'hidden',
  },
  container: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '0 24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 80,
    alignItems: 'center',
  },
  imageCol: {
    position: 'relative',
  },
  imageWrapper: {
    overflow: 'hidden',
    borderRadius: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    display: 'block',
  },
  imageSmall: {
    position: 'absolute',
    bottom: -40,
    right: -40,
    width: '55%',
    border: '8px solid #0a0a0a',
  },
  experience: {
    position: 'absolute',
    top: -30,
    left: -30,
    background: '#c9a96e',
    padding: '24px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  expNumber: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#0a0a0a',
    lineHeight: 1,
  },
  expText: {
    fontSize: '0.6rem',
    fontWeight: 700,
    letterSpacing: 2,
    color: '#0a0a0a',
    lineHeight: 1.4,
  },
  textCol: {
    paddingLeft: 20,
  },
  label: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: 4,
    textTransform: 'uppercase' as const,
    color: '#c9a96e',
    marginBottom: 16,
    display: 'block',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 500,
    lineHeight: 1.2,
    color: '#fff',
    marginBottom: 24,
  },
  italic: {
    fontStyle: 'italic',
    color: '#c9a96e',
  },
  text: {
    fontSize: '1rem',
    color: '#999',
    lineHeight: 1.8,
    marginBottom: 16,
  },
  divider: {
    width: 60,
    height: 2,
    background: '#c9a96e',
    margin: '32px 0',
  },
  values: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 24,
  },
  value: {
    display: 'flex',
    gap: 20,
    alignItems: 'flex-start',
  },
  valueIcon: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#c9a96e',
    minWidth: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(201,169,110,0.3)',
  },
  valueTitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1rem',
    fontWeight: 600,
    color: '#fff',
    marginBottom: 4,
  },
  valueDesc: {
    fontSize: '0.875rem',
    color: '#777',
    lineHeight: 1.6,
  },
};

// Responsive
const aboutStyles = document.createElement('style');
aboutStyles.textContent = `
  @media (max-width: 768px) {
    #about > div > div {
      grid-template-columns: 1fr !important;
      gap: 60px !important;
    }
    #about .image-small {
      position: relative !important;
      bottom: auto !important;
      right: auto !important;
      margin-top: 16px;
    }
  }
`;
document.head.appendChild(aboutStyles);

export default About;
