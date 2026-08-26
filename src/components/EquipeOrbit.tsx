import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const DURACAO_TRANSICAO = 0.4
const INTERVALO_AUTOMATICO = 3600
const ESPACO_ENTRE_TITULOS = 132

const ESPECIALIDADES = [
  {
    titulo: 'Planejamento patrimonial',
    descricao:
      'Diagnóstico e visão integral para transformar objetivos em decisões coordenadas.',
    marcadores: ['Diagnóstico', 'Objetivos'],
    imagem: '/equipe-planejamento.jpg',
    alt: 'Profissional em uma apresentação de planejamento',
  },
  {
    titulo: 'Estratégia de investimentos',
    descricao:
      'Alocação, risco e oportunidades analisados sob o mesmo critério de longo prazo.',
    marcadores: ['Alocação', 'Estratégia'],
    imagem: '/equipe-estrategia.jpg',
    alt: 'Profissional de investimentos em um ambiente corporativo',
  },
  {
    titulo: 'Proteção patrimonial',
    descricao:
      'Liquidez, estruturas e proteção organizadas para atravessar diferentes ciclos.',
    marcadores: ['Proteção', 'Risco'],
    imagem: '/equipe-relacionamento.jpg',
    alt: 'Profissional em um escritório contemporâneo',
  },
  {
    titulo: 'Sucessão e legado',
    descricao:
      'Estruturas e decisões para proteger a continuidade do que foi construído.',
    marcadores: ['Sucessão', 'Legado'],
    imagem: '/caminho-acompanhamento.jpg',
    alt: 'Especialista conversando com clientes sobre seus planos',
  },
  {
    titulo: 'Relacionamento próximo',
    descricao:
      'Acompanhamento contínuo para manter cada decisão conectada à sua vida.',
    marcadores: ['Presença', 'Acompanhamento'],
    imagem: '/equipe-time.jpg',
    alt: 'Equipe reunida em um escritório',
  },
] as const

const JANELA_DE_TITULOS = [-2, -1, 0, 1, 2]

const RAIO_ARCO = 650
const MARGEM_CANVAS_ARCO = 40
const ALTURA_VIEWBOX_ORIGINAL = 760
const DIMENSAO_CANVAS_ARCO = (RAIO_ARCO + MARGEM_CANVAS_ARCO) * 2
const CENTRO_ARCO_X = DIMENSAO_CANVAS_ARCO / 2
const CENTRO_ARCO_Y = DIMENSAO_CANVAS_ARCO / 2
const ALTURA_CANVAS_ARCO =
  (DIMENSAO_CANVAS_ARCO / ALTURA_VIEWBOX_ORIGINAL) * 100
const POSICAO_CANVAS_ARCO_X =
  -50 +
  (RAIO_ARCO * 100) / DIMENSAO_CANVAS_ARCO
const POSICAO_CANVAS_ARCO_Y = -54

const MARCAS_DO_ARCO = Array.from({ length: 120 }, (_, indice) => {
  const angulo = indice * 3
  const longa = indice % 12 === 0
  const radianos = (angulo * Math.PI) / 180
  const comprimento = longa ? 36 : 14

  return {
    angulo,
    longa,
    x1: CENTRO_ARCO_X + Math.cos(radianos) * RAIO_ARCO,
    y1: CENTRO_ARCO_Y + Math.sin(radianos) * RAIO_ARCO,
    x2:
      CENTRO_ARCO_X +
      Math.cos(radianos) * (RAIO_ARCO + comprimento),
    y2:
      CENTRO_ARCO_Y +
      Math.sin(radianos) * (RAIO_ARCO + comprimento),
  }
})

function modulo(valor: number, divisor: number) {
  return ((valor % divisor) + divisor) % divisor
}

function estadoDeProfundidade(deslocamento: number) {
  const distancia = Math.min(Math.abs(deslocamento), 3)

  if (distancia === 0) {
    return { scale: 1, z: 0, opacity: 1 }
  }

  if (distancia === 1) {
    return { scale: 0.84, z: -120, opacity: 0.46 }
  }

  if (distancia === 2) {
    return { scale: 0.68, z: -300, opacity: 0.16 }
  }

  return { scale: 0.52, z: -500, opacity: 0 }
}

type Direcao = -1 | 1

export function EquipeOrbit() {
  const raizRef = useRef<HTMLDivElement>(null)
  const estaVisivel = useInView(raizRef, { amount: 0.35 })
  const reduzirMovimento = useReducedMotion()
  const [posicao, setPosicao] = useState(0)
  const [direcao, setDirecao] = useState<Direcao>(1)

  const especialidadeAtual =
    ESPECIALIDADES[modulo(posicao, ESPECIALIDADES.length)]
  const duracao = reduzirMovimento ? 0 : DURACAO_TRANSICAO
  const transicao = { duration: duracao, ease: 'easeOut' as const }

  useEffect(() => {
    if (!estaVisivel || reduzirMovimento) return

    const intervalo = window.setInterval(() => {
      setDirecao(1)
      setPosicao((valorAtual) => valorAtual + 1)
    }, INTERVALO_AUTOMATICO)

    return () => window.clearInterval(intervalo)
  }, [estaVisivel, posicao, reduzirMovimento])

  function navegar(novaDirecao: Direcao) {
    setDirecao(novaDirecao)
    setPosicao((valorAtual) => valorAtual + novaDirecao)
  }

  return (
    <div
      ref={raizRef}
      className="relative min-h-[560px] w-full overflow-x-clip overflow-y-visible sm:min-h-[660px] lg:min-h-[calc(100dvh-7rem)]"
    >
      <svg
        width={DIMENSAO_CANVAS_ARCO}
        height={DIMENSAO_CANVAS_ARCO}
        viewBox={`0 0 ${DIMENSAO_CANVAS_ARCO} ${DIMENSAO_CANVAS_ARCO}`}
        aria-hidden="true"
        shapeRendering="geometricPrecision"
        className="pointer-events-none absolute left-[49%] top-1/2 max-w-none overflow-visible text-accent"
        style={{
          height: `${ALTURA_CANVAS_ARCO}%`,
          width: 'auto',
          transform: `translate(${POSICAO_CANVAS_ARCO_X}%, ${POSICAO_CANVAS_ARCO_Y}%)`,
        }}
      >
        <motion.g
          animate={{ rotate: posicao * -15 }}
          transition={transicao}
          style={{ transformOrigin: `${CENTRO_ARCO_X}px ${CENTRO_ARCO_Y}px` }}
        >
          {MARCAS_DO_ARCO.map(({ angulo, longa, x1, y1, x2, y2 }) => (
            <line
              key={angulo}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth={longa ? 3.2 : 2}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              opacity={longa ? 1 : 0.86}
            />
          ))}
        </motion.g>
      </svg>

      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 h-[500px] w-[28%] -translate-y-1/2 overflow-hidden sm:left-[3%] sm:w-[30%] lg:left-[4%] lg:h-[600px] lg:w-[30%] xl:left-[6%] xl:w-[29%]"
        style={{ perspective: '900px' }}
      >
        <AnimatePresence initial={false} custom={direcao}>
          {JANELA_DE_TITULOS.map((deslocamento) => {
            const posicaoVirtual = posicao + deslocamento
            const profundidadeInicial = estadoDeProfundidade(
              deslocamento + direcao,
            )
            const profundidadeAtual = estadoDeProfundidade(deslocamento)
            const profundidadeFinal = estadoDeProfundidade(3)
            const especialidade =
              ESPECIALIDADES[
                modulo(posicaoVirtual, ESPECIALIDADES.length)
              ]

            return (
              <motion.div
                key={posicaoVirtual}
                custom={direcao}
                initial={{
                  y:
                    (deslocamento + direcao) *
                    ESPACO_ENTRE_TITULOS,
                  ...profundidadeInicial,
                }}
                animate={{
                  y: deslocamento * ESPACO_ENTRE_TITULOS,
                  ...profundidadeAtual,
                }}
                exit={{
                  y: -direcao * ESPACO_ENTRE_TITULOS * 3,
                  ...profundidadeFinal,
                }}
                transition={transicao}
                className="absolute inset-x-0 top-1/2 origin-right"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <p className="t-display -translate-y-1/2 text-right text-balance text-[clamp(1.125rem,2.4vw,2.625rem)] font-light text-negative">
                  {especialidade.titulo}
                </p>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="absolute left-[49%] top-1/2 size-36 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-card ring-2 ring-accent/70 outline outline-1 outline-offset-2 outline-negative/15 sm:size-48 lg:size-72 xl:size-80 2xl:size-96">
        <AnimatePresence initial={false} custom={direcao}>
          <motion.img
            key={posicao}
            src={especialidadeAtual.imagem}
            alt={especialidadeAtual.alt}
            custom={direcao}
            initial={{ y: direcao * 28, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: direcao * -28, opacity: 0, scale: 0.96 }}
            transition={transicao}
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
          />
        </AnimatePresence>
      </div>

      <div className="absolute right-[14%] top-1/2 hidden w-[22%] -translate-y-1/2 sm:block">
        <AnimatePresence initial={false} custom={direcao}>
          <motion.div
            key={posicao}
            custom={direcao}
            initial={{ y: direcao * 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: direcao * -24, opacity: 0 }}
            transition={transicao}
          >
            <p className="text-pretty text-sm leading-relaxed text-negative/85 lg:text-base xl:text-lg">
              {especialidadeAtual.descricao}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {especialidadeAtual.marcadores.map((marcador) => (
                <span
                  key={marcador}
                  className="rounded-full border border-accent/45 px-3 py-1 text-xs text-negative/80 lg:text-sm"
                >
                  {marcador}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute right-[2%] top-1/2 flex h-[58%] -translate-y-1/2 flex-col justify-between sm:right-[5%]">
        <button
          type="button"
          onClick={() => navegar(-1)}
          aria-label="Ver especialidade anterior"
          className="inline-flex size-12 items-center justify-center rounded-full border border-accent/40 text-negative/80 transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-accent lg:size-14"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5">
            <path
              d="m6.5 11.5 3.5-3.5 3.5 3.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => navegar(1)}
          aria-label="Ver próxima especialidade"
          className="inline-flex size-12 items-center justify-center rounded-full border border-accent/40 text-negative/80 transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-accent lg:size-14"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5">
            <path
              d="m6.5 8.5 3.5 3.5 3.5-3.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {especialidadeAtual.titulo}. {especialidadeAtual.descricao}
      </p>
    </div>
  )
}
