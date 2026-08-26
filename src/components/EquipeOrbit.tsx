import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const INTERVALO_AUTOMATICO = 3600
const ESPACO_ENTRE_TITULOS = 132

/**
 * Antes as quatro camadas — arco, cargos, foto e texto — dividiam uma única
 * transição, entrando em lockstep. Igualdade total lê como mecânico: sem
 * hierarquia, nada conduz o movimento. Aqui a entrada desacelera longo e a
 * saída acelera, para o item que sai liberar espaço antes do novo assentar.
 */
const EASE_ENTRADA = [0.22, 1, 0.36, 1] as const
const EASE_SAIDA = [0.4, 0, 1, 1] as const

const DURACAO_ENTRADA = 0.6
const DURACAO_SAIDA = 0.34
/** O arco é grande e ambiente: duração maior dá a ele sensação de inércia. */
const DURACAO_ARCO = 0.9

/**
 * Curva própria do texto. A EASE_ENTRADA é feita para posição: ela dispara no
 * começo e se arrasta no fim, o que em opacidade lê como surgir de repente e
 * depois travar. Esta é um S simétrico, que distribui o clareamento por igual.
 */
const EASE_TEXTO = [0.33, 0, 0.67, 1] as const

/**
 * Mesma duração e mesma curva na entrada e na saída, sem atraso entre elas.
 * Assim as duas opacidades ficam exatamente complementares — o que um perde o
 * outro ganha, e a soma se mantém em 1 do começo ao fim. Com durações ou
 * atrasos diferentes, sobra um instante em que os dois estão fracos e a área
 * do texto quase esvazia: é esse buraco que se lê como entrada travada.
 *
 * A sobreposição maior não embaralha a leitura porque o texto que sai também
 * desfoca — o desfoque separa os dois melhor do que o tempo separaria.
 */
const DURACAO_TROCA_TEXTO = 0.5

/** Cargos conduzem, foto acompanha. */
const ATRASO_FOTO = 0.05

type Profissional = {
  nome: string
  cargo: string
  resenha: string
  imagem: string
  alt: string
  posicaoImagem?: string
  /**
   * Para fotos em paisagem, que no recorte circular sobram na horizontal e não
   * na vertical — nelas o object-position vertical não tem folga para deslocar
   * nada. Esticar a altura cria essa folga e desce o enquadramento.
   */
  alturaImagem?: string
}

const PROFISSIONAIS: readonly Profissional[] = [
  {
    nome: 'Felipe Boim',
    cargo: 'Head de Consórcio',
    resenha:
      'Felipe é formado em economia pela Universidade Estadual de Londrina. Com mais de 5 anos de experiência no mercado de investimentos e assessoria financeira.',
    imagem: '/felipe.boim.jpg',
    alt: 'Felipe Boim, Head de Consórcio da Soren Investimentos',
  },
  {
    nome: 'Eduarda Folco',
    cargo: 'Assessora de Investimento',
    resenha:
      'Eduarda possui mais de 10 anos de experiência como corretora de consórcio e ampla experiência com alavancagem patrimonial.',
    imagem: '/eduarda.Folco.jpg',
    alt: 'Eduarda Folco, Assessora de Investimento da Soren Investimentos',
    alturaImagem: '115%',
  },
  {
    nome: 'Felipe Correa',
    cargo: 'Head de Contabilidade',
    resenha:
      'Felipe é o profissional responsável pela área de contabilidade da Soren Investimentos. Com mais de 5 anos de experiência no setor e criador da Conta B, produto que revolucionou o mercado de assessoria contábil.',
    imagem: '/felipe.correa.jpg',
    alt: 'Felipe Correa, Head de Contabilidade da Soren Investimentos',
  },
  {
    nome: 'João Perez',
    cargo: 'Diretor Grupo Soren',
    resenha:
      'Com mais de 10 anos de experiência no mercado financeiro, João se destaca pelo profissionalismo e pela competência em entender as nuances do mercado, agregando conhecimento e valor para todo o grupo.',
    imagem: '/joaoperez.png',
    alt: 'João Perez, Diretor Grupo Soren',
    // A cabeça começa na primeira linha do PNG, então object-position 0% já
    // encosta o topo dela na borda do círculo — sem deslocamento extra.
    posicaoImagem: '50% 0%',
  },
  {
    nome: 'Kaio Baroni Pirolo',
    cargo: 'Gestor de Processos Grupo Soren',
    resenha:
      'Com um perfil analítico e estratégico, ao longo de sua trajetória, Kaio desenvolveu uma visão muito orientada a negócios, pessoas e resultados. Identificando oportunidades de melhoria e caminhos mais eficientes.',
    imagem: '/kaio.pirolo.png',
    alt: 'Kaio Baroni Pirolo, Gestor de Processos Grupo Soren',
  },
  {
    nome: 'Gabriel Lopes',
    cargo: 'Growth Marketing Grupo Soren',
    resenha:
      'Gabriel Lopes é estrategista de Growth, Copywriting e Aquisição, com mais de 10 anos de experiência em campanhas, funis e estratégias de crescimento para empresas de educação, finanças, tecnologia e serviços.',
    imagem: '/gabriel.jpeg',
    alt: 'Gabriel Lopes, Growth Marketing Grupo Soren',
    // Retrato alto: centralizado o topo da cabeça saía do recorte.
    posicaoImagem: '50% 20%',
  },
]

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

  const profissionalAtual =
    PROFISSIONAIS[modulo(posicao, PROFISSIONAIS.length)]
  const entrada = (atraso = 0) =>
    reduzirMovimento
      ? { duration: 0 }
      : { duration: DURACAO_ENTRADA, ease: EASE_ENTRADA, delay: atraso }

  const saida = reduzirMovimento
    ? { duration: 0 }
    : { duration: DURACAO_SAIDA, ease: EASE_SAIDA }

  const trocaTexto = reduzirMovimento
    ? { duration: 0 }
    : { duration: DURACAO_TROCA_TEXTO, ease: EASE_TEXTO }

  const transicaoArco = reduzirMovimento
    ? { duration: 0 }
    : { duration: DURACAO_ARCO, ease: EASE_ENTRADA }
  const temMaisDeUmProfissional = PROFISSIONAIS.length > 1
  const janelaDeCargos = temMaisDeUmProfissional ? JANELA_DE_TITULOS : [0]

  useEffect(() => {
    if (!estaVisivel || reduzirMovimento || !temMaisDeUmProfissional) return

    const intervalo = window.setInterval(() => {
      setDirecao(1)
      setPosicao((valorAtual) => valorAtual + 1)
    }, INTERVALO_AUTOMATICO)

    return () => window.clearInterval(intervalo)
  }, [estaVisivel, posicao, reduzirMovimento, temMaisDeUmProfissional])

  function navegar(novaDirecao: Direcao) {
    if (!temMaisDeUmProfissional) return

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
          transition={transicaoArco}
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
          {janelaDeCargos.map((deslocamento) => {
            const posicaoVirtual = posicao + deslocamento
            const profundidadeInicial = estadoDeProfundidade(
              deslocamento + direcao,
            )
            const profundidadeAtual = estadoDeProfundidade(deslocamento)
            const profundidadeFinal = estadoDeProfundidade(3)
            const profissional =
              PROFISSIONAIS[modulo(posicaoVirtual, PROFISSIONAIS.length)]

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
                  transition: saida,
                }}
                // Sem escalonamento entre os cargos: a coluna precisa se mover
                // como peça única, senão a pilha parece de borracha.
                transition={entrada()}
                className="absolute inset-x-0 top-1/2 origin-right"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <p className="t-display -translate-y-1/2 text-right text-balance text-[clamp(1.125rem,2.4vw,2.625rem)] font-light text-negative">
                  {profissional.cargo}
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
            src={profissionalAtual.imagem}
            alt={profissionalAtual.alt}
            custom={direcao}
            initial={{ y: direcao * 28, opacity: 0, scale: 0.975 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{
              y: direcao * -28,
              opacity: 0,
              scale: 0.975,
              transition: saida,
            }}
            transition={entrada(ATRASO_FOTO)}
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
            style={{
              objectPosition: profissionalAtual.posicaoImagem,
              height: profissionalAtual.alturaImagem,
            }}
          />
        </AnimatePresence>
      </div>

      <div className="absolute right-[14%] top-1/2 hidden w-[22%] -translate-y-1/2 sm:block">
        <AnimatePresence initial={false} custom={direcao}>
          <motion.div
            key={posicao}
            custom={direcao}
            // Sem deslocamento: transladar um bloco de texto de várias linhas
            // força repintura e renderização subpixel irregular, e era isso
            // que travava a entrada. A saída desfoca — filtro é composto na
            // GPU, então não reintroduz o engasgo. A entrada é só fade: entrar
            // desfocado deixaria o texto ilegível justo quando ele chega.
            initial={{ opacity: 0, filter: 'blur(0px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(4px)', transition: trocaTexto }}
            transition={trocaTexto}
          >
            <p className="t-display text-base font-light text-accent xl:text-lg">
              {profissionalAtual.nome}
            </p>
            <p className="mt-3 text-pretty text-xs leading-relaxed text-negative/85 lg:text-sm xl:text-base">
              {profissionalAtual.resenha}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute right-[10%] top-1/2 hidden h-[58%] -translate-y-1/2 flex-col justify-between sm:flex">
        <button
          type="button"
          onClick={() => navegar(-1)}
          aria-label="Ver profissional anterior"
          aria-disabled={!temMaisDeUmProfissional}
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
          aria-label="Ver próximo profissional"
          aria-disabled={!temMaisDeUmProfissional}
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
        {profissionalAtual.nome}. {profissionalAtual.cargo}.{' '}
        {profissionalAtual.resenha}
      </p>
    </div>
  )
}
