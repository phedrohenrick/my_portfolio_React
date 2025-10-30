import React, { useEffect, useRef } from 'react';

const SailingShip: React.FC = () => {
  const shipRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const navio = shipRef.current;
    let posicaoX = 50;
    let direcao = 1;

    const navegar = () => {
      posicaoX += direcao;
      if (posicaoX > 450 || posicaoX < 50) {
        direcao *= -1; // Inverte a direção ao atingir os limites
      }
      if (navio) {
        navio.setAttribute('transform', `translate(${posicaoX}, 80)`);
      }
      requestAnimationFrame(navegar);
    };

    navegar();
  }, []);

  return (
    <svg width="500" height="200" xmlns="http://www.w3.org/2000/svg">
      {/* Mar */}
      <rect id="mar" x="0" y="100" width="500" height="100" fill="#0077be" style={{ animation: 'onda 3s infinite ease-in-out' }} />

      {/* Navio */}
      <g id="navio" ref={shipRef} transform="translate(50, 80)">
        {/* Casco */}
        <path d="M20 40 L40 40 L50 60 L10 60 Z" fill="#be9e6b" />
        {/* Mastro */}
        <rect x="30" y="20" width="5" height="20" fill="#8b7355" />
        {/* Vela */}
        <path d="M32 20 L32 0 L50 20 Z" fill="#ffa500" />
      </g>
    </svg>
  );
};

export default SailingShip;