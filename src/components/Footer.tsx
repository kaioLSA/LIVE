import React from 'react';
import { LogoLight } from './Logo';

const navLinks = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Sobre', href: '#about' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Servicos', href: '#services' },
  { name: 'Equipe', href: '#team' },
  { name: 'Contato', href: '#contact' },
];

const handleClick = (e: React.MouseEvent, href: string) => {
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div className="footer-top" style={styles.top}>
          <div style={styles.brand}>
            <div style={styles.logo}>
              <LogoLight height={48} />
            </div>
            <p style={styles.brandDesc}>
              Escritorio boutique de arquitetura e interiores. Criamos projetos unicos,
              guiados por escuta real, cuidado minucioso e relacoes proximas.
            </p>
          </div>

          <div className="footer-links" style={styles.links}>
            <div>
              <h4 style={styles.linksTitle}>Navegacao</h4>
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  style={styles.link}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#c9a96e'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#777'; }}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div>
              <h4 style={styles.linksTitle}>Servicos</h4>
              {['Arquitetura', 'Design de Interiores', 'Retrofit', 'Gerenciamento de Obra', 'Turn Key'].map((item) => (
                <a
                  key={item}
                  href="#services"
                  onClick={(e) => handleClick(e, '#services')}
                  style={styles.link}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#c9a96e'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#777'; }}
                >
                  {item}
                </a>
              ))}
            </div>
            <div>
              <h4 style={styles.linksTitle}>Contato</h4>
              <span style={styles.link}>contato@livearquitetura.com.br</span>
              <span style={styles.link}>+55 (11) 3456-7890</span>
              <span style={{ ...styles.link, marginTop: 16, display: 'block' }}>Instagram</span>
              <span style={styles.link}>LinkedIn</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom" style={styles.bottom}>
          <span style={styles.copy}>&copy; {new Date().getFullYear()} LIV.E Arquitetura e Interiores. Todos os direitos reservados.</span>
          <div style={styles.bottomLinks}>
            <span style={styles.bottomLink}>Politica de Privacidade</span>
            <span style={styles.bottomLink}>Termos de Uso</span>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .footer-top { grid-template-columns: 1fr !important; gap: 40px !important; }
          .footer-links { grid-template-columns: 1fr 1fr !important; }
          .footer-bottom { flex-direction: column !important; text-align: center !important; }
        }
        @media (max-width: 480px) {
          .footer-links { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  footer: { padding: '80px 0 0', background: '#0a0a0a', borderTop: '1px solid #1a1a1a' },
  container: { maxWidth: 1400, margin: '0 auto', padding: '0 24px' },
  top: { display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: 80, paddingBottom: 60, borderBottom: '1px solid #1a1a1a' },
  brand: {},
  logo: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 },
  brandDesc: { fontSize: '0.9rem', color: '#777', lineHeight: 1.7, maxWidth: 320 },
  links: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 },
  linksTitle: { fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' as const, color: '#fff', marginBottom: 16 },
  link: { display: 'block', fontSize: '0.85rem', color: '#777', marginBottom: 10, cursor: 'pointer', transition: 'color 0.3s', textDecoration: 'none' },
  bottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', flexWrap: 'wrap' as const, gap: 16 },
  copy: { fontSize: '0.8rem', color: '#555' },
  bottomLinks: { display: 'flex', gap: 24 },
  bottomLink: { fontSize: '0.8rem', color: '#555', cursor: 'pointer' },
};

export default Footer;
