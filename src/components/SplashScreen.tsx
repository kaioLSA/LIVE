import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplashScreenProps {
  onComplete: () => void;
}

const WINE = '#3d1518';
const WINE_LIGHT = '#8B2335';
const GOLD = '#c9a96e';

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const logoGroupRef = useRef<SVGGElement>(null);
  const letterLRef = useRef<SVGTextElement>(null);
  const letterIRef = useRef<SVGTextElement>(null);
  const letterVRef = useRef<SVGTextElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const cursiveEGroupRef = useRef<SVGGElement>(null);
  const subtitleRef = useRef<SVGTextElement>(null);
  const hLineRef = useRef<SVGLineElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([letterLRef.current, letterIRef.current, letterVRef.current], {
        opacity: 0,
        y: 60,
        scale: 0.3,
      });
      gsap.set(dotRef.current, { opacity: 0, scale: 0 });
      gsap.set(cursiveEGroupRef.current, { opacity: 0, scale: 0.5, x: 20 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 10 });
      gsap.set(hLineRef.current, { scaleX: 0 });
      gsap.set([lineLeftRef.current, lineRightRef.current], { scaleX: 0 });
      gsap.set(taglineRef.current, { opacity: 0, y: 15 });

      const tl = gsap.timeline({
        onComplete: () => {
          const exitTl = gsap.timeline({ onComplete });

          exitTl.to(logoGroupRef.current, {
            scale: 0.9,
            duration: 0.3,
            ease: 'power2.in',
          });

          exitTl.to([lineLeftRef.current, lineRightRef.current], {
            scaleX: 0,
            duration: 0.3,
            ease: 'power2.in',
          }, '<');

          exitTl.to(taglineRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.25,
          }, '<');

          exitTl.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
          });
        },
      });

      // Letters fly in
      tl.to(letterLRef.current, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6, ease: 'back.out(1.7)',
      });

      tl.to(letterIRef.current, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.5, ease: 'back.out(1.7)',
      }, '-=0.35');

      tl.to(letterVRef.current, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.5, ease: 'back.out(1.7)',
      }, '-=0.35');

      // Wine dot pops in
      tl.to(dotRef.current, {
        opacity: 1, scale: 1,
        duration: 0.4, ease: 'back.out(2.5)',
      }, '-=0.2');

      // Cursive E swoops in
      tl.to(cursiveEGroupRef.current, {
        opacity: 1, scale: 1, x: 0,
        duration: 0.7, ease: 'back.out(1.4)',
      }, '-=0.15');

      // Pulse
      tl.to([letterLRef.current, letterIRef.current, letterVRef.current, dotRef.current], {
        scale: 1.08, duration: 0.2, ease: 'power2.out',
      }).to([letterLRef.current, letterIRef.current, letterVRef.current, dotRef.current], {
        scale: 1, duration: 0.25, ease: 'power2.inOut',
      });

      // Horizontal line grows
      tl.to(hLineRef.current, {
        scaleX: 1,
        duration: 0.5,
        ease: 'power3.out',
      }, '-=0.3');

      // Subtitle fades in
      tl.to(subtitleRef.current, {
        opacity: 0.6, y: 0,
        duration: 0.5, ease: 'power2.out',
      }, '-=0.3');

      // Decorative lines
      tl.to([lineLeftRef.current, lineRightRef.current], {
        scaleX: 1,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.3');

      // Tagline
      tl.to(taglineRef.current, {
        opacity: 1, y: 0,
        duration: 0.5, ease: 'power2.out',
      }, '-=0.3');

      // Hold
      tl.to({}, { duration: 0.6 });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
      }}
    >
      <div ref={bgRef} style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }} />

      {/* Decorative wine lines */}
      <div
        ref={lineLeftRef}
        style={{
          position: 'absolute',
          top: '50%',
          right: '52%',
          marginRight: 190,
          width: 120,
          height: 1,
          background: `linear-gradient(to left, ${WINE_LIGHT}, transparent)`,
          transformOrigin: 'right center',
        }}
      />
      <div
        ref={lineRightRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '52%',
          marginLeft: 190,
          width: 120,
          height: 1,
          background: `linear-gradient(to right, ${WINE_LIGHT}, transparent)`,
          transformOrigin: 'left center',
        }}
      />

      {/* Logo SVG */}
      <svg
        width="340"
        height="100"
        viewBox="0 0 340 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'relative', zIndex: 10, overflow: 'visible' }}
      >
        <g ref={logoGroupRef}>
          <text
            ref={letterLRef}
            x="0"
            y="68"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="72"
            fontWeight="700"
            fill="#ffffff"
            letterSpacing="-1"
          >
            L
          </text>

          <text
            ref={letterIRef}
            x="42"
            y="68"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="72"
            fontWeight="700"
            fill="#ffffff"
            letterSpacing="-1"
          >
            I
          </text>

          <text
            ref={letterVRef}
            x="62"
            y="68"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="72"
            fontWeight="700"
            fill="#ffffff"
            letterSpacing="-1"
          >
            V
          </text>

          <circle ref={dotRef} cx="118" cy="64" r="4.5" fill={WINE_LIGHT} />

          <g ref={cursiveEGroupRef}>
            <path
              d="M135,52 C136,40 142,18 160,15 C172,13 178,22 176,32 C174,42 162,50 148,56 C140,60 135,58 135,52 Z"
              fill={GOLD}
            />
            <path
              d="M135,52 C132,58 130,66 136,72 C142,78 154,78 166,72 C172,68 176,64 178,60"
              stroke={GOLD}
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Horizontal line */}
          <line
            ref={hLineRef}
            x1="0" y1="78" x2="195" y2="78"
            stroke={WINE_LIGHT}
            strokeWidth="0.8"
            style={{ transformOrigin: 'left' }}
          />

          <text
            ref={subtitleRef}
            x="28"
            y="93"
            fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
            fontSize="11.5"
            fontWeight="400"
            fill="rgba(255,255,255,0.5)"
            letterSpacing="3.5"
          >
            arquitetura | interiores
          </text>
        </g>
      </svg>

      {/* Tagline below logo */}
      <div
        ref={taglineRef}
        style={{
          position: 'relative',
          zIndex: 10,
          marginTop: 32,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          Escuta Real <span style={{ color: WINE_LIGHT }}>&middot;</span> Cuidado Minucioso <span style={{ color: WINE_LIGHT }}>&middot;</span> Resultado Unico
        </p>
      </div>

      <style>{`
        @media (max-width: 600px) {
          div[style*="z-index: 9999"] svg {
            width: 260px !important;
            height: 76px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
