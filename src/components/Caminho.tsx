import { useState } from 'react'
import { caminho } from '../content/site'
import { Section } from './ui'

export function Caminho() {
  const [ativo, setAtivo] = useState(0)
  const etapa = caminho[ativo]

  return (
    <Section id="caminho">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div>
          <h2 className="t-display max-w-xl text-[clamp(1.7rem,3.5vw,3.15rem)] text-positive">
            Cada conversa
            <br />
            move o plano adiante.
          </h2>

          <ol className="mt-12">
            {caminho.map((item, indice) => {
              const selecionado = ativo === indice
              return (
                <li key={item.numero}>
                  <button
                    type="button"
                    onClick={() => setAtivo(indice)}
                    aria-pressed={selecionado}
                    className="group relative block w-full py-5 text-left"
                  >
                    <span className={`t-display text-balance text-xl transition-[color,transform] duration-200 group-hover:translate-x-1 md:text-2xl ${selecionado ? 'text-primary' : 'text-positive'}`}>
                      {item.titulo}
                    </span>
                    <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-primary/20" />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-200 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      style={{ transform: selecionado ? 'scaleX(1)' : undefined }}
                    />
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        <article className="relative flex min-h-[460px] flex-col justify-between overflow-hidden bg-primary p-8 text-negative md:p-12 lg:min-h-[560px]">
          <div className="flex items-start justify-end">
            <span className="t-display text-7xl tabular-nums text-negative/15 md:text-9xl">{etapa.numero}</span>
          </div>

          <div className="max-w-xl">
            <h3 className="t-display mt-5 text-balance text-[clamp(1.8rem,3.6vw,3.5rem)] font-light text-negative">
              {etapa.titulo}
            </h3>
            <p className="mt-7 text-pretty text-lg leading-relaxed text-negative/70 md:text-xl">
              {etapa.texto}
            </p>
            <div className="mt-10 h-px bg-negative/15">
              <span
                className="block h-px origin-left bg-accent transition-transform duration-200"
                style={{ transform: `scaleX(${(ativo + 1) / caminho.length})` }}
              />
            </div>
          </div>
        </article>
      </div>
    </Section>
  )
}
