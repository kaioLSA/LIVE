import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { LogoLight } from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { clipPath: 'circle(0% at calc(100% - 40px) 40px)' },
        { clipPath: 'circle(150% at calc(100% - 40px) 40px)', duration: 0.8, ease: 'power3.inOut' }
      );
      gsap.fromTo(
        '.mobile-link',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, delay: 0.3, ease: 'power3.out' }
      );
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Sobre', href: '#about' },
    { name: 'Projetos', href: '#projects' },
    { name: 'Servicos', href: '#services' },
    { name: 'Equipe', href: '#team' },
    { name: 'Contato', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          ...styles.nav,
          background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,169,110,0.15)' : '1px solid transparent',
        }}
      >
        <div style={styles.container}>
          <div ref={logoRef} style={styles.logo} onClick={() => handleNavClick('#hero')}>
            <LogoLight height={44} />
          </div>

          <div style={{ ...styles.desktopLinks, display: isMobile ? 'none' : 'flex' }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                style={styles.navLink}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = '#c9a96e';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = '#999';
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {!isMobile && (
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              style={styles.ctaBtn}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = '#c9a96e';
                (e.target as HTMLElement).style.color = '#0a0a0a';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = 'transparent';
                (e.target as HTMLElement).style.color = '#c9a96e';
              }}
            >
              Fale Conosco
            </a>
          )}

          {isMobile && (
          <button
            style={{ ...styles.burger, display: 'flex' }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span style={{
              ...styles.burgerLine,
              transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }} />
            <span style={{
              ...styles.burgerLine,
              opacity: isOpen ? 0 : 1,
            }} />
            <span style={{
              ...styles.burgerLine,
              transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }} />
          </button>
          )}
        </div>
      </nav>

      {isOpen && (
        <div ref={menuRef} style={styles.mobileMenu}>
          <div style={styles.mobileMenuInner}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="mobile-link"
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                style={styles.mobileLink}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: '20px 0',
    transition: 'all 0.4s ease',
  },
  container: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    cursor: 'pointer',
  },
  logoIcon: {
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #c9a96e, #e0c48a)',
    color: '#0a0a0a',
    fontFamily: "'Cormorant Garamond', serif",
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
    fontSize: '0.6rem',
    letterSpacing: 4,
    color: '#c9a96e',
    fontWeight: 500,
  },
  desktopLinks: {
    display: 'flex',
    gap: 32,
    alignItems: 'center',
  },
  navLink: {
    fontSize: '0.85rem',
    fontWeight: 500,
    letterSpacing: 1,
    color: '#999',
    textTransform: 'uppercase' as const,
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  },
  ctaBtn: {
    padding: '10px 24px',
    border: '1px solid #c9a96e',
    color: '#c9a96e',
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
    background: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  burger: {
    display: 'none',
    flexDirection: 'column' as const,
    gap: 5,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 8,
    zIndex: 1001,
  },
  burgerLine: {
    display: 'block',
    width: 24,
    height: 2,
    background: '#c9a96e',
    transition: 'all 0.3s ease',
  },
  mobileMenu: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(10,10,10,0.98)',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileMenuInner: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 32,
  },
  mobileLink: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '2rem',
    fontWeight: 500,
    color: '#f5f5f5',
    textTransform: 'uppercase' as const,
    letterSpacing: 3,
    transition: 'color 0.3s',
  },
};

export default Navbar;
