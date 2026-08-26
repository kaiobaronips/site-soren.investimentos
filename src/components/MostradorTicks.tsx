/**
 * Arco de marcações medido quadro a quadro do vídeo de referência.
 *
 * O ajuste de círculo sobre os pixels dos traços deu centro fixo em x, raio
 * ~460px e espaçamento angular de ~3.08°, com um traço longo a cada 12. Os
 * ângulos, comprimentos e brilhos são idênticos entre quadros: o elemento não
 * se anima — o que se move no vídeo é a página rolando por trás dele.
 */

const RAIO = 460
const PASSO = 3
const A_INICIAL = 195
const A_FINAL = 300
const CADA_LONGO = 12

type Marca = { angulo: number; longo: boolean }

const MARCAS: Marca[] = (() => {
  const lista: Marca[] = []
  for (let a = A_INICIAL; a <= A_FINAL; a += PASSO) {
    lista.push({ angulo: a, longo: Math.round((a - A_INICIAL) / PASSO) % CADA_LONGO === 0 })
  }
  return lista
})()

export function MostradorTicks({ className = '' }: { className?: string }) {
  return (
    // viewBox recorta exatamente o trecho de arco visível no vídeo, então não
    // é preciso posicionar um círculo gigante e cortar com overflow.
    <svg
      viewBox="-500 -500 760 400"
      aria-hidden="true"
      className={`text-accent ${className}`}
    >
      {MARCAS.map(({ angulo, longo }) => {
        const comprimento = longo ? 30 : 7
        const rad = (angulo * Math.PI) / 180
        const x1 = Math.cos(rad) * RAIO
        const y1 = Math.sin(rad) * RAIO
        const x2 = Math.cos(rad) * (RAIO + comprimento)
        const y2 = Math.sin(rad) * (RAIO + comprimento)

        return (
          <line
            key={angulo}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth={longo ? 2.4 : 1.6}
            opacity={longo ? 0.9 : 0.55}
          />
        )
      })}
    </svg>
  )
}
