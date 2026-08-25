import { principios } from '../content/site'
import { Reveal, Section, SectionHead } from './ui'

export function Metodo() {
  return (
    <Section id="metodo">
      <Reveal>
        <SectionHead
          pill="Modelo de estratégia"
          linha1="Estratégia não é agitação de mercado."
          virada="É coerência."
          texto="Quatro princípios sustentam cada decisão que tomamos com você."
          centro
        />
      </Reveal>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
        {principios.map((p, i) => (
          <Reveal key={p.titulo} delay={i * 100}>
            <article className="group relative h-full rounded-2xl border border-forest-line bg-white p-8 transition-colors duration-200 hover:bg-forest md:p-9">
              <span
                aria-hidden="true"
                className="t-display block text-6xl leading-none text-brand/20 transition-colors duration-200 group-hover:text-brand/40"
              >
                {p.letra}
              </span>
              <h3 className="t-display mt-7 text-2xl text-bone">{p.titulo}</h3>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-slate">{p.texto}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
