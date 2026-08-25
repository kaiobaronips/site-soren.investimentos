import { useState } from 'react'
import { niveis } from '../content/site'
import { Section } from './ui'

const focos = [
  ['Reserva e liquidez', 'Primeira alocação', 'Organização financeira'],
  ['Diversificação', 'Disciplina de aportes', 'Gestão de risco'],
  ['Ativos reais', 'Operações estruturadas', 'Eficiência patrimonial'],
  ['Proteção societária', 'Sucessão familiar', 'Visão global'],
]

export function Niveis() {
  const [ativo, setAtivo] = useState(0)
  const nivel = niveis[ativo]

  return (
    <Section id="niveis" className="bg-card">
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="flex justify-center">
          <h2 className="t-display max-w-3xl text-[clamp(1.9rem,3.8vw,3.35rem)] font-light text-positive">
            Um nível de patrimônio não define você.
            <br />
            Define a próxima decisão.
          </h2>
        </div>
        <a
          href="#contato"
          className="group inline-flex shrink-0 items-center gap-3 self-center rounded-full border border-primary/25 px-6 py-3 text-sm text-positive transition-colors duration-200 hover:border-primary hover:text-primary"
        >
          Descobrir meu momento
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </div>

      <div className="mt-14 grid border-l border-t border-primary/15 sm:grid-cols-2 lg:grid-cols-4">
        {niveis.map((item, indice) => {
          const selecionado = ativo === indice
          return (
            <button
              key={item.rotulo}
              type="button"
              onClick={() => setAtivo(indice)}
              aria-pressed={selecionado}
              className={`group flex min-h-64 flex-col justify-between border-b border-r border-primary/15 p-7 text-left transition-colors duration-200 ${
                selecionado ? 'bg-primary text-negative' : 'bg-background text-positive hover:bg-primary/5'
              }`}
            >
              <div className="flex justify-end">
                <span className={`flex size-8 items-center justify-center rounded-full border transition-transform duration-200 ${selecionado ? 'rotate-45 !border-negative/50 !text-negative' : 'border-positive/20 text-positive group-hover:border-primary group-hover:text-primary'}`} aria-hidden="true">+</span>
              </div>
              <span className="t-display mt-10 block text-balance text-2xl md:text-3xl">{item.titulo}</span>
            </button>
          )
        })}
      </div>

      <article className="grid gap-10 border-x border-b border-primary/15 bg-background p-7 md:grid-cols-[1fr_0.8fr] md:p-10 lg:p-12">
        <div>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-positive md:text-lg">{nivel.texto}</p>
        </div>
        <ul className="grid content-start gap-3 border-t border-primary/15 pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          {focos[ativo].map((foco) => (
            <li key={foco} className="flex items-center gap-4 text-sm text-positive">
              <span aria-hidden="true" className="h-px w-6 shrink-0 bg-accent" />
              {foco}
            </li>
          ))}
        </ul>
      </article>
    </Section>
  )
}
