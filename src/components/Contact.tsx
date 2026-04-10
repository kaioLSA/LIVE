import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateHeadingReveal, animateLabelReveal } from '../utils/textReveal';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    // Label typography
    const label = section.querySelector('.contact-label') as HTMLElement;
    if (label) animateLabelReveal(label, section);

    // Heading word reveal
    const heading = section.querySelector('.contact-heading') as HTMLElement;
    if (heading) animateHeadingReveal(heading, section);

    // Subtitle
    gsap.fromTo(
      section.querySelector('.contact-subtitle'),
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1,
        scrollTrigger: { trigger: section, start: 'top 70%', end: 'top 45%', scrub: 1 },
      }
    );

    // Info items: scrub stagger
    gsap.fromTo(
      section.querySelectorAll('.contact-info-item'),
      { x: -30, opacity: 0 },
      {
        x: 0, opacity: 1, stagger: 0.06,
        scrollTrigger: { trigger: section, start: 'top 60%', end: 'top 25%', scrub: 1 },
      }
    );

    // Form: scrub slide in from right
    gsap.fromTo(
      section.querySelector('.contact-form'),
      { x: 60, opacity: 0 },
      {
        x: 0, opacity: 1,
        scrollTrigger: { trigger: section, start: 'top 65%', end: 'top 25%', scrub: 1 },
      }
    );
  }, []);

  const inputStyle = (name: string): React.CSSProperties => ({
    ...styles.input,
    borderColor: focused === name ? '#c9a96e' : '#2a2a2a',
    background: focused === name ? 'rgba(201,169,110,0.05)' : '#1a1a1a',
  });

  return (
    <section ref={sectionRef} id="contact" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.grid}>
          <div>
            <span className="contact-label" style={styles.label}>CONTATO</span>
            <h2 className="contact-heading" style={styles.title}>
              Vamos criar algo <em style={styles.italic}>extraordinario</em> juntos
            </h2>
            <p className="contact-subtitle" style={styles.subtitle}>
              Entre em contato para discutir seu proximo projeto.
              Estamos prontos para transformar suas ideias em realidade.
            </p>

            <div style={styles.info}>
              {[
                { label: 'Endereco', value: 'Av. Paulista, 1578 - Sala 1204\nSao Paulo, SP - 01310-200' },
                { label: 'Telefone', value: '+55 (11) 3456-7890' },
                { label: 'Email', value: 'contato@livearquitetura.com.br' },
                { label: 'Horario', value: 'Seg - Sex: 9h as 18h' },
              ].map((item, i) => (
                <div key={i} className="contact-info-item" style={styles.infoItem}>
                  <span style={styles.infoLabel}>{item.label}</span>
                  <span style={styles.infoValue}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form" style={styles.formWrapper}>
            <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
              <h3 style={styles.formTitle}>Solicitar Orcamento</h3>

              <div style={styles.formRow}>
                <div style={styles.field}>
                  <label style={styles.fieldLabel}>Nome completo</label>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    style={inputStyle('name')}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.fieldLabel}>Email</label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    style={inputStyle('email')}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.field}>
                  <label style={styles.fieldLabel}>Telefone</label>
                  <input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    style={inputStyle('phone')}
                    onFocus={() => setFocused('phone')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.fieldLabel}>Tipo de projeto</label>
                  <select
                    style={inputStyle('type')}
                    onFocus={() => setFocused('type')}
                    onBlur={() => setFocused(null)}
                  >
                    <option value="">Selecione...</option>
                    <option value="residencial">Residencial</option>
                    <option value="comercial">Comercial</option>
                    <option value="interiores">Design de Interiores</option>
                    <option value="urbanismo">Urbanismo</option>
                    <option value="consultoria">Consultoria</option>
                  </select>
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.fieldLabel}>Mensagem</label>
                <textarea
                  placeholder="Descreva seu projeto..."
                  rows={5}
                  style={{
                    ...inputStyle('msg'),
                    resize: 'vertical' as const,
                    minHeight: 120,
                  }}
                  onFocus={() => setFocused('msg')}
                  onBlur={() => setFocused(null)}
                />
              </div>

              <button
                type="submit"
                style={styles.submitBtn}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = 'transparent';
                  (e.target as HTMLElement).style.color = '#8B2335';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = '#8B2335';
                  (e.target as HTMLElement).style.color = '#fff';
                }}
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact > div > div { grid-template-columns: 1fr !important; gap: 48px !important; }
          #contact form > div:has(> div + div) { grid-template-columns: 1fr !important; }
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
    gridTemplateColumns: '1fr 1.2fr',
    gap: 80,
    alignItems: 'start',
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
    marginBottom: 16,
  },
  italic: { fontStyle: 'italic', color: '#c9a96e' },
  subtitle: {
    fontSize: '1rem',
    color: '#888',
    lineHeight: 1.8,
    marginBottom: 48,
  },
  info: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 24,
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 4,
  },
  infoLabel: {
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
    color: '#c9a96e',
  },
  infoValue: {
    fontSize: '0.95rem',
    color: '#ccc',
    whiteSpace: 'pre-line' as const,
    lineHeight: 1.5,
  },
  formWrapper: {
    background: '#111',
    padding: '40px',
    border: '1px solid #2a2a2a',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 20,
  },
  formTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.5rem',
    fontWeight: 500,
    color: '#fff',
    marginBottom: 8,
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
  },
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 6,
  },
  fieldLabel: {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: 1,
    color: '#888',
    textTransform: 'uppercase' as const,
  },
  input: {
    padding: '14px 16px',
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    color: '#fff',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    borderRadius: 0,
    width: '100%',
  },
  submitBtn: {
    padding: '16px 40px',
    background: '#8B2335',
    color: '#fff',
    border: '2px solid #8B2335',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: 8,
  },
};


export default Contact;
