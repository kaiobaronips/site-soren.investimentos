import { caminho } from '../content/site'
import { Reveal, Section, SectionHead } from './ui'

export function Caminho() {
  return (
    <Section id="caminho">
      <Reveal>
        <SectionHead pill="Como funciona" linha1="Seu caminho" virada="na Soren." centro />
      </Reveal>

      <ol className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5">
        {caminho.map((e, i) => (
          <Reveal key={e.numero} delay={i * 90}>
            <li className="group h-full rounded-2xl border border-primary/15 bg-card p-7 transition-colors duration-200 hover:border-primary/40">
              <span className="flex size-11 items-center justify-center rounded-full bg-primary text-xs font-bold text-negative">
                {e.numero}
              </span>
              <h3 className="t-display mt-6 text-xl text-positive">{e.titulo}</h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-positive/70">{e.texto}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
