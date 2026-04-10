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
      width={340 * scale}
      height={height}
      viewBox="0 0 340 100"
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
      <circle cx="118" cy="64" r="4.5" fill="#3d1518" />

      {/* Cursive E - calligraphic style matching the logo */}
      <path
        d="M135,52 C136,40 142,18 160,15 C172,13 178,22 176,32 C174,42 162,50 148,56 C140,60 135,58 135,52 Z"
        fill="#c9a96e"
      />
      <path
        d="M135,52 C132,58 130,66 136,72 C142,78 154,78 166,72 C172,68 176,64 178,60"
        stroke="#c9a96e"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M148,56 C142,58 136,56 135,52"
        stroke="#c9a96e"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Horizontal line */}
      <line x1="0" y1="78" x2="195" y2="78" stroke="#999" strokeWidth="0.8" />

      {/* arquitetura | interiores */}
      <text
        x="28"
        y="93"
        fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
        fontSize="11.5"
        fontWeight="400"
        fill="#888"
        letterSpacing="3.5"
      >
        arquitetura | interiores
      </text>
    </svg>
  );
};

export const LogoLight: React.FC<LogoProps> = ({ height = 50, className, style }) => {
  const scale = height / 100;

  return (
    <svg
      width={340 * scale}
      height={height}
      viewBox="0 0 340 100"
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
      <circle cx="118" cy="64" r="4.5" fill="#ffffff" />

      {/* Cursive E - calligraphic style */}
      <path
        d="M135,52 C136,40 142,18 160,15 C172,13 178,22 176,32 C174,42 162,50 148,56 C140,60 135,58 135,52 Z"
        fill="#c9a96e"
      />
      <path
        d="M135,52 C132,58 130,66 136,72 C142,78 154,78 166,72 C172,68 176,64 178,60"
        stroke="#c9a96e"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M148,56 C142,58 136,56 135,52"
        stroke="#c9a96e"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Horizontal line */}
      <line x1="0" y1="78" x2="195" y2="78" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />

      {/* arquitetura | interiores */}
      <text
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
    </svg>
  );
};

export default Logo;
