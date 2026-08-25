import { essencial } from '../content/site'
import { Section } from './ui'

export function Essencial() {
  return (
    <Section id="essencial" className="bg-card">
      <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
        <div>
          <p className="t-eyebrow text-accent">Muito além da carteira</p>
          <h2 className="t-display mt-7 max-w-xl text-balance text-[clamp(2.35rem,4.7vw,4.4rem)] text-positive">
            O que realmente sustenta uma estratégia.
          </h2>
          <p className="mt-7 max-w-md text-pretty text-base leading-relaxed text-positive md:text-lg">
            A qualidade do acompanhamento aparece na consistência das decisões — não em promessas de resultado.
          </p>
        </div>

        <div className="border-t border-primary/20">
          {essencial.map((item, indice) => (
            <div key={item} className="group grid items-center gap-4 border-b border-primary/20 py-8 md:grid-cols-[5rem_1fr_auto] md:py-10">
              <span className="text-xs tabular-nums text-positive/35">0{indice + 1}</span>
              <h3 className="t-display text-balance text-[clamp(1.8rem,3.8vw,3.6rem)] text-positive transition-transform duration-200 group-hover:translate-x-2">
                {item}
              </h3>
              <span className="hidden h-px w-16 bg-accent md:block" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 grid gap-8 border border-primary/15 bg-background p-7 md:grid-cols-[auto_1fr] md:items-center md:p-10 lg:mt-28">
        <span className="flex size-16 items-center justify-center rounded-full bg-primary text-2xl text-negative" aria-hidden="true">✓</span>
        <p className="max-w-4xl text-pretty text-base leading-relaxed text-positive md:text-lg">
          A Soren não custodia recursos e não tem poder discricionário sobre a sua conta. Diagnóstico, recomendação e acompanhamento são nossos. <strong className="font-medium text-positive">A decisão é sempre sua.</strong>
        </p>
      </div>
    </Section>
  )
}
