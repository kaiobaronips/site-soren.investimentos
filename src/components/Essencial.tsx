import { essencial, indicadores } from '../content/site'
import { Reveal, Section, SectionHead } from './ui'

export function Essencial() {
  const comDados = indicadores.filter((i) => i.valor.trim() !== '')

  return (
    <Section id="essencial">
      <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <Reveal>
          <div className="lg:sticky lg:top-32">
            <SectionHead
              pill="Essencial"
              linha1="Não organizamos investimentos."
              virada="Organizamos decisões."
              texto="Patrimônio, comportamento e execução no mesmo lugar. Não entregamos uma carteira. Entregamos direção."
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div>
            <ul className="grid gap-3">
              {essencial.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-5 rounded-xl border border-primary/15 bg-card px-8 py-7 transition-opacity duration-200 hover:opacity-85"
                >
                  <span aria-hidden="true" className="h-px w-8 shrink-0 bg-primary" />
                  <span className="t-display text-xl text-positive">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl bg-card p-8">
              <p className="text-pretty text-sm leading-relaxed text-positive/70">
                A Soren não custodia recursos e não tem poder discricionário sobre a
                sua conta. Diagnóstico, recomendação e acompanhamento são nossos.
                <span className="font-bold text-positive"> A decisão é sempre sua.</span>
              </p>
            </div>

            {comDados.length > 0 && (
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {comDados.map((ind) => (
                  <div key={ind.legenda} className="rounded-xl border border-primary/15 bg-card p-8">
                    <p className="t-display text-[2.4rem] leading-none text-positive">
                      {ind.valor}
                      <span className="ml-1 text-2xl text-positive">{ind.sufixo}</span>
                    </p>
                    <p className="mt-3 text-sm text-positive/70">{ind.legenda}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
