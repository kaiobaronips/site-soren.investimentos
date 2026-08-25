type Props = { className?: string; variant?: 'full' | 'symbol' }

/**
 * Marca provisória. O lockup segue o do site atual: SOREN em caixa alta com
 * tracking largo, ponto bronze, e INVESTIMENTOS abaixo em corpo miúdo.
 * Substituir pelo arquivo oficial quando ele estiver disponível na pasta.
 */
export function SorenMark({ className, variant = 'full' }: Props) {
  if (variant === 'symbol') {
    return (
      <svg viewBox="0 0 32 32" className={className} role="img" aria-label="Soren">
        <text
          x="16" y="22" textAnchor="middle" fill="currentColor"
          fontFamily="Commuter Sans, Arial, sans-serif" fontSize="19" fontWeight="500"
        >
          S
        </text>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 168 30" className={className} role="img" aria-label="Soren Investimentos">
      <text
        x="0" y="15" fill="currentColor"
        fontFamily="Commuter Sans, Arial, sans-serif" fontSize="15" fontWeight="500" letterSpacing="5.2"
      >
        SOREN
      </text>
      {/* Ponto bronze — separador do lockup */}
      <circle cx="80.5" cy="10.5" r="1.9" className="fill-accent" />
      <text
        x="0.5" y="26" fill="currentColor" opacity="0.78"
        fontFamily="Helvetica Now Display, Arial, sans-serif" fontSize="6.4" fontWeight="700" letterSpacing="4.1"
      >
        INVESTIMENTOS
      </text>
    </svg>
  )
}
