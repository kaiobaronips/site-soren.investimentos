import { caminho } from '../content/site'
import { Reveal, Section, SectionHead } from './ui'

export function Caminho() {
  return (
    <Section id="caminho" tone="forest">
      <Reveal>
        <SectionHead pill="Como funciona" linha1="Seu caminho" virada="na Soren." centro />
      </Reveal>

      <ol className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5">
        {caminho.map((e, i) => (
          <Reveal key={e.numero} delay={i * 90}>
            <li className="group h-full rounded-2xl border border-forest-line bg-white p-7 transition-colors duration-200 hover:border-brand/35">
              <span className="flex size-11 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand">
                {e.numero}
              </span>
              <h3 className="t-display mt-6 text-xl text-bone">{e.titulo}</h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-slate">{e.texto}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
