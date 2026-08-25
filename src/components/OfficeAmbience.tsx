/**
 * Ambientação do hero enquanto não há arquivo de vídeo.
 *
 * Não tenta imitar uma fotografia. Constrói a leitura de um interior:
 * luz de veneziana em bronze atravessando o ambiente, plano de fundo em
 * verde profundo, reflexo no piso e grão. A deriva lateral lenta das lâminas
 * dá a sensação de câmera percorrendo a sala.
 */
export function OfficeAmbience({ className = '' }: { className?: string }) {
  return (
    <div className={`grain pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {/* Base */}
      <div className="absolute inset-0 bg-void" />

      {/* Volume de verde — profundidade da sala */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(120% 80% at 78% 18%, rgba(22,56,42,0.85) 0%, rgba(5,14,11,0) 58%),' +
            'radial-gradient(90% 70% at 12% 72%, rgba(15,42,32,0.7) 0%, rgba(5,14,11,0) 60%)',
        }}
      />

      {/* Luz de veneziana — lâminas em bronze com deriva lateral */}
      <div className="absolute inset-0 opacity-[0.16] [animation:slats_38s_linear_infinite]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(97deg, rgba(201,168,118,0) 0px, rgba(201,168,118,0) 46px,' +
            'rgba(201,168,118,0.55) 46px, rgba(201,168,118,0.55) 49px,' +
            'rgba(227,203,160,0.28) 49px, rgba(227,203,160,0.28) 58px,' +
            'rgba(201,168,118,0) 58px, rgba(201,168,118,0) 104px)',
          maskImage:
            'radial-gradient(75% 95% at 72% 8%, #000 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0) 78%)',
          WebkitMaskImage:
            'radial-gradient(75% 95% at 72% 8%, #000 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0) 78%)',
        }}
      />

      {/* Facho quente da janela */}
      <div
        className="absolute inset-0 opacity-70 [animation:bloom_16s_ease-in-out_infinite_alternate]"
        style={{
          backgroundImage:
            'radial-gradient(48% 62% at 76% 6%, rgba(201,168,118,0.2) 0%, rgba(201,168,118,0) 64%)',
        }}
      />

      {/* Reflexo no piso */}
      <div
        className="absolute inset-x-0 bottom-0 h-[38%]"
        style={{
          backgroundImage:
            'linear-gradient(to top, rgba(201,168,118,0.07) 0%, rgba(201,168,118,0.02) 38%, rgba(5,14,11,0) 100%)',
        }}
      />

      {/* Vinheta — fecha as bordas e sustenta a leitura do texto */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to top, rgba(5,14,11,0.97) 0%, rgba(5,14,11,0.62) 42%, rgba(5,14,11,0.34) 100%),' +
            'linear-gradient(to right, rgba(5,14,11,0.9) 0%, rgba(5,14,11,0.1) 46%, rgba(5,14,11,0) 100%)',
        }}
      />

      <style>{`
        @keyframes slats {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-104px,0,0); }
        }
        @keyframes bloom {
          from { opacity: 0.5; }
          to   { opacity: 0.85; }
        }
      `}</style>
    </div>
  )
}
