import { useRef, useState } from 'react'
import { Section } from './ui'

const capitulos = [
  { tempo: 0, indice: '01', titulo: 'Escuta antes da estratégia', texto: 'Toda recomendação começa entendendo o contexto por inteiro.' },
  { tempo: 2.5, indice: '02', titulo: 'Plano antes do produto', texto: 'Objetivos, prazos e riscos orientam a escolha dos instrumentos.' },
  { tempo: 5, indice: '03', titulo: 'Acompanhamento contínuo', texto: 'A estratégia evolui à medida que a vida e o patrimônio mudam.' },
]

export function Experiencia() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ativo, setAtivo] = useState(0)

  function abrirCapitulo(indice: number) {
    const video = videoRef.current
    if (!video) return
    setAtivo(indice)
    video.currentTime = capitulos[indice].tempo
    void video.play()
  }

  return (
    <Section id="experiencia" className="bg-primary text-negative">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="t-display max-w-3xl text-balance text-[clamp(2.35rem,4.7vw,4.4rem)] text-negative">
            Decisões importantes pedem proximidade.
          </h2>
        </div>
        <p className="max-w-md text-pretty text-base leading-relaxed text-negative/65 md:text-lg">
          Conheça a atmosfera de um trabalho construído com atenção, método e visão de longo prazo.
        </p>
      </div>

      <div className="mt-14 grid gap-4 lg:grid-cols-[1.55fr_0.75fr]">
        <div className="relative min-h-[420px] overflow-hidden bg-positive lg:min-h-[620px]">
          <video
            ref={videoRef}
            className="size-full min-h-[420px] object-cover lg:min-h-[620px]"
            controls
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
            onTimeUpdate={(evento) => {
              const tempo = evento.currentTarget.currentTime
              const indice = [...capitulos].reverse().findIndex((capitulo) => tempo >= capitulo.tempo)
              if (indice >= 0) setAtivo(capitulos.length - 1 - indice)
            }}
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="grid gap-3">
          {capitulos.map((capitulo, indice) => {
            const selecionado = ativo === indice
            return (
              <button
                key={capitulo.indice}
                type="button"
                onClick={() => abrirCapitulo(indice)}
                aria-pressed={selecionado}
                className={`group flex min-h-44 flex-col justify-between border p-6 text-left transition-colors duration-200 lg:min-h-0 ${
                  selecionado
                    ? 'border-negative bg-negative text-positive'
                    : 'border-negative/20 text-negative hover:border-negative/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs tabular-nums ${selecionado ? 'text-positive/45' : 'text-negative/45'}`}>{capitulo.indice}</span>
                  <span className={`flex size-10 items-center justify-center rounded-full border ${selecionado ? 'border-positive/15' : 'border-negative/25'}`} aria-hidden="true">
                    ▶
                  </span>
                </div>
                <div className="mt-10">
                  <span className="t-display block text-balance text-xl md:text-2xl">{capitulo.titulo}</span>
                  <span className={`mt-3 block text-pretty text-sm leading-relaxed ${selecionado ? 'text-positive/60' : 'text-negative/55'}`}>{capitulo.texto}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
