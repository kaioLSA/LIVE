import React from 'react';

interface LogoProps {
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

const Logo: React.FC<LogoProps> = ({ height = 50, className, style }) => {
  const scale = height / 100;

  return (
    <svg
      width={320 * scale}
      height={height}
      viewBox="0 0 320 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* L */}
      <text
        x="0"
        y="68"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="72"
        fontWeight="700"
        fill="#3d1518"
        letterSpacing="-1"
      >
        L
      </text>

      {/* I */}
      <text
        x="42"
        y="68"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="72"
        fontWeight="700"
        fill="#3d1518"
        letterSpacing="-1"
      >
        I
      </text>

      {/* V */}
      <text
        x="62"
        y="68"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="72"
        fontWeight="700"
        fill="#3d1518"
        letterSpacing="-1"
      >
        V
      </text>

      {/* Dot */}
      <circle cx="118" cy="64" r="4" fill="#c9a96e" />

      {/* Cursive E */}
      <path
        d="M138,58 C138,58 142,20 168,18 C180,17 182,30 175,38 C168,46 148,52 138,58 C138,58 132,64 138,70 C144,76 158,74 168,66"
        stroke="#c9a96e"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* ARQUITETURA E INTERIORES */}
      <text
        x="0"
        y="92"
        fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
        fontSize="13"
        fontWeight="400"
        fill="#3d1518"
        letterSpacing="6"
      >
        ARQUITETURA E INTERIORES
      </text>
    </svg>
  );
};

export const LogoLight: React.FC<LogoProps> = ({ height = 50, className, style }) => {
  const scale = height / 100;

  return (
    <svg
      width={320 * scale}
      height={height}
      viewBox="0 0 320 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* L */}
      <text
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

      {/* I */}
      <text
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

      {/* V */}
      <text
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

      {/* Dot */}
      <circle cx="118" cy="64" r="4" fill="#c9a96e" />

      {/* Cursive E */}
      <path
        d="M138,58 C138,58 142,20 168,18 C180,17 182,30 175,38 C168,46 148,52 138,58 C138,58 132,64 138,70 C144,76 158,74 168,66"
        stroke="#c9a96e"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* ARQUITETURA E INTERIORES */}
      <text
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
    </svg>
  );
};

export default Logo;
