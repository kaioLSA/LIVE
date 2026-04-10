import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const logoGroupRef = useRef<SVGGElement>(null);
  const letterLRef = useRef<SVGTextElement>(null);
  const letterIRef = useRef<SVGTextElement>(null);
  const letterVRef = useRef<SVGTextElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const cursiveERef = useRef<SVGPathElement>(null);
  const subtitleRef = useRef<SVGTextElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([letterLRef.current, letterIRef.current, letterVRef.current], {
        opacity: 0,
        y: 60,
        scale: 0.3,
      });
      gsap.set(dotRef.current, { opacity: 0, scale: 0 });
      gsap.set(cursiveERef.current, { opacity: 0, strokeDasharray: 300, strokeDashoffset: 300 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 10 });
      gsap.set([lineLeftRef.current, lineRightRef.current], { scaleX: 0 });
      gsap.set(taglineRef.current, { opacity: 0, y: 15 });

      const tl = gsap.timeline({
        onComplete: () => {
          // Exit animation
          const exitTl = gsap.timeline({ onComplete });

          // Scale logo down slightly
          exitTl.to(logoGroupRef.current, {
            scale: 0.9,
            duration: 0.3,
            ease: 'power2.in',
          });

          // Lines shrink back
          exitTl.to([lineLeftRef.current, lineRightRef.current], {
            scaleX: 0,
            duration: 0.3,
            ease: 'power2.in',
          }, '<');

          // Tagline fades
          exitTl.to(taglineRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.25,
          }, '<');

          // Logo and bg fade out
          exitTl.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
          });
        },
      });

      // Letters fly in one by one from different directions
      tl.to(letterLRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
      });

      tl.to(letterIRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }, '-=0.35');

      tl.to(letterVRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }, '-=0.35');

      // Gold dot pops in
      tl.to(dotRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(2.5)',
      }, '-=0.2');

      // Cursive E draws itself
      tl.to(cursiveERef.current, {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.2');

      // Quick pulse on all letters
      tl.to([letterLRef.current, letterIRef.current, letterVRef.current, dotRef.current], {
        scale: 1.1,
        duration: 0.2,
        ease: 'power2.out',
      }).to([letterLRef.current, letterIRef.current, letterVRef.current, dotRef.current], {
        scale: 1,
        duration: 0.25,
        ease: 'power2.inOut',
      });

      // Subtitle fades in
      tl.to(subtitleRef.current, {
        opacity: 0.7,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3');

      // Lines expand outward
      tl.to([lineLeftRef.current, lineRightRef.current], {
        scaleX: 1,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.3');

      // Tagline appears
      tl.to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3');

      // Hold for a moment
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
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#0a0a0a',
        }}
      />

      {/* Decorative lines */}
      <div
        ref={lineLeftRef}
        style={{
          position: 'absolute',
          top: '50%',
          right: '52%',
          marginRight: 180,
          width: 120,
          height: 1,
          background: 'linear-gradient(to left, #c9a96e, transparent)',
          transformOrigin: 'right center',
        }}
      />
      <div
        ref={lineRightRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '52%',
          marginLeft: 180,
          width: 120,
          height: 1,
          background: 'linear-gradient(to right, #c9a96e, transparent)',
          transformOrigin: 'left center',
        }}
      />

      {/* Logo SVG */}
      <svg
        width="320"
        height="100"
        viewBox="0 0 320 100"
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

          <circle ref={dotRef} cx="118" cy="64" r="4" fill="#c9a96e" />

          <path
            ref={cursiveERef}
            d="M138,58 C138,58 142,20 168,18 C180,17 182,30 175,38 C168,46 148,52 138,58 C138,58 132,64 138,70 C144,76 158,74 168,66"
            stroke="#c9a96e"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          <text
            ref={subtitleRef}
            x="0"
            y="92"
            fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
            fontSize="13"
            fontWeight="400"
            fill="#c9a96e"
            letterSpacing="6"
          >
            ARQUITETURA E INTERIORES
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
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          Escuta Real &middot; Cuidado Minucioso &middot; Resultado Unico
        </p>
      </div>

      <style>{`
        @media (max-width: 600px) {
          div[style*="z-index: 9999"] svg {
            width: 240px !important;
            height: 75px !important;
          }
          div[style*="marginRight: 180"] { display: none !important; }
          div[style*="marginLeft: 180"] { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
