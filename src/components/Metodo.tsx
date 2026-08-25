import { useState } from 'react'
import { principios } from '../content/site'
import { Section } from './ui'

export function Metodo() {
  const [ativo, setAtivo] = useState(0)
  const principio = principios[ativo]

  return (
    <Section id="metodo" className="bg-card">
      <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="t-display max-w-xl text-balance text-[clamp(2.35rem,4.7vw,4.4rem)] text-positive">
            Estratégia é coerência ao longo do tempo.
          </h2>
          <p className="mt-7 max-w-lg text-pretty text-base leading-relaxed text-positive md:text-lg">
            Entenda os 4 Princípios da nossa metodologa que mantêm cada decisão conectada ao plano — mesmo quando o mercado muda de direção.
          </p>
        </div>

        <div>
          <div className="grid grid-cols-2 border-l border-t border-primary/15 sm:grid-cols-4">
            {principios.map((item, indice) => {
              const selecionado = ativo === indice
              return (
                <button
                  key={item.titulo}
                  type="button"
                  onClick={() => setAtivo(indice)}
                  aria-pressed={selecionado}
                  className={`group min-h-44 border-b border-r border-primary/15 px-4 py-5 text-left transition-colors duration-200 md:min-h-52 md:px-5 md:py-6 ${
                    selecionado ? 'bg-primary text-negative' : 'bg-transparent text-positive hover:bg-primary/5'
                  }`}
                >
                  <span className="t-display block text-balance text-[1.05rem] md:text-[1.35rem]">
                    {item.titulo}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="grid min-h-72 gap-10 bg-primary p-8 text-negative md:grid-cols-[0.35fr_1fr] md:p-12">
            <span aria-hidden="true" className="t-display text-8xl leading-none text-negative/20 md:text-9xl">
              {principio.letra}
            </span>
            <div className="self-end">
              <p className="t-eyebrow text-accent">Princípio {String(ativo + 1).padStart(2, '0')}</p>
              <h3 className="t-display mt-5 text-balance text-4xl text-negative md:text-5xl">
                {principio.titulo}
              </h3>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-negative md:text-lg">
                {principio.texto}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
