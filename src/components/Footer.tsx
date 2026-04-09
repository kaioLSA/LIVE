import React from 'react';
import { LogoLight } from './Logo';

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.top}>
          <div style={styles.brand}>
            <div style={styles.logo}>
              <LogoLight height={48} />
            </div>
            <p style={styles.brandDesc}>
              Transformando espacos em experiencias desde 2009. Arquitetura e
              interiores que inspiram, conectam e transformam vidas.
            </p>
          </div>

          <div style={styles.links}>
            <div>
              <h4 style={styles.linksTitle}>Navegacao</h4>
              {['Inicio', 'Sobre', 'Projetos', 'Servicos', 'Equipe', 'Contato'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} style={styles.link}>
                  {item}
                </a>
              ))}
            </div>
            <div>
              <h4 style={styles.linksTitle}>Servicos</h4>
              {['Projeto Arquitetonico', 'Design de Interiores', 'Urbanismo', 'Consultoria BIM'].map((item) => (
                <span key={item} style={styles.link}>{item}</span>
              ))}
            </div>
            <div>
              <h4 style={styles.linksTitle}>Social</h4>
              {['Instagram', 'LinkedIn', 'Pinterest', 'Behance'].map((item) => (
                <span key={item} style={styles.link}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.bottom}>
          <span style={styles.copy}>&copy; 2024 LIV.E. Todos os direitos reservados.</span>
          <div style={styles.bottomLinks}>
            <span style={styles.bottomLink}>Politica de Privacidade</span>
            <span style={styles.bottomLink}>Termos de Uso</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  footer: {
    padding: '80px 0 0',
    background: '#0a0a0a',
    borderTop: '1px solid #1a1a1a',
  },
  container: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '0 24px',
  },
  top: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 2fr',
    gap: 80,
    paddingBottom: 60,
    borderBottom: '1px solid #1a1a1a',
  },
  brand: {},
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  logoIcon: {
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #c9a96e, #e0c48a)',
    color: '#0a0a0a',
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem',
    fontWeight: 700,
    borderRadius: 4,
  },
  logoText: {
    display: 'block',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.9rem',
    fontWeight: 700,
    letterSpacing: 3,
    color: '#fff',
  },
  logoSub: {
    display: 'block',
    fontSize: '0.55rem',
    letterSpacing: 3,
    color: '#c9a96e',
    fontWeight: 500,
  },
  brandDesc: {
    fontSize: '0.9rem',
    color: '#777',
    lineHeight: 1.7,
    maxWidth: 320,
  },
  links: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 40,
  },
  linksTitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
    color: '#fff',
    marginBottom: 16,
  },
  link: {
    display: 'block',
    fontSize: '0.85rem',
    color: '#777',
    marginBottom: 10,
    cursor: 'pointer',
    transition: 'color 0.3s',
    textDecoration: 'none',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 0',
    flexWrap: 'wrap' as const,
    gap: 16,
  },
  copy: {
    fontSize: '0.8rem',
    color: '#555',
  },
  bottomLinks: {
    display: 'flex',
    gap: 24,
  },
  bottomLink: {
    fontSize: '0.8rem',
    color: '#555',
    cursor: 'pointer',
  },
};

const footerStyles = document.createElement('style');
footerStyles.textContent = `
  footer a:hover, footer span:hover { color: #c9a96e !important; }
  @media (max-width: 768px) {
    footer > div > div:first-child { grid-template-columns: 1fr !important; gap: 40px !important; }
    footer > div > div:first-child > div:last-child { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 480px) {
    footer > div > div:first-child > div:last-child { grid-template-columns: 1fr !important; }
  }
`;
document.head.appendChild(footerStyles);

export default Footer;
