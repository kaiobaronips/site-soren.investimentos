import { useState } from 'react'
import { verticais } from '../content/site'
import { Reveal, Section, SectionHead } from './ui'

export function Solucoes() {
  const [ativo, setAtivo] = useState(verticais[0].id)

  return (
    <Section id="solucoes">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <SectionHead
              linha1="Cinco frentes,"
              virada="uma estratégia."
              texto="Liberdade para recomendar o instrumento certo para cada objetivo, prazo e momento de vida."
              textoClassName="text-positive"
            />
          </div>
        </Reveal>

        <div className="border-t border-primary/20">
          {verticais.map((vertical, indice) => {
            const aberto = ativo === vertical.id
            return (
              <Reveal key={vertical.id} delay={indice * 50}>
                <article className="border-b border-primary/20">
                  <button
                    type="button"
                    onClick={() => setAtivo(aberto ? '' : vertical.id)}
                    aria-expanded={aberto}
                    aria-controls={`solucao-${vertical.id}`}
                    className="group flex w-full items-start gap-5 py-7 text-left md:items-center"
                  >
                    <span className="shrink-0 pt-1 text-xs font-bold text-positive md:pt-0">{vertical.indice}</span>
                    <span className="flex-1">
                      <span className="t-display block text-[clamp(1.5rem,3vw,2.5rem)] text-positive transition-opacity duration-200 group-hover:opacity-70">
                        {vertical.nome}
                      </span>
                      <span className="mt-2 block max-w-xl text-pretty text-sm leading-relaxed text-positive">
                        {vertical.resumo}
                      </span>
                    </span>
                    <span aria-hidden="true" className={`mt-1 shrink-0 text-2xl font-light text-primary transition-transform duration-200 ${aberto ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>

                  {aberto && (
                    <div id={`solucao-${vertical.id}`} className="grid gap-7 pb-9 pl-8 md:grid-cols-2 md:gap-12 md:pl-10">
                      <p className="text-pretty text-sm leading-relaxed text-positive">{vertical.detalhe}</p>
                      <ul className="grid gap-2.5 self-start">
                        {vertical.itens.map((item) => (
                          <li key={item} className="flex items-baseline gap-3 text-sm text-positive">
                            <span aria-hidden="true" className="text-primary">—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
