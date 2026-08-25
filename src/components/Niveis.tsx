import { niveis } from '../content/site'
import { Reveal, Section, SectionHead } from './ui'

export function Niveis() {
  return (
    <Section id="niveis">
      <Reveal>
        <SectionHead
          pill="Acima da execução"
          linha1="Todo patrimônio sério precisa de"
          virada="um próximo nível."
          texto="Da organização inicial à sofisticação, cada etapa pede uma estrutura e decisões diferentes."
        />
      </Reveal>

      <div className="mt-16 border-t border-forest-line lg:mt-20">
        {niveis.map((n, i) => (
          <Reveal key={n.rotulo} delay={i * 80}>
            <div className="group grid items-baseline gap-3 border-b border-forest-line py-9 transition-colors duration-200 hover:bg-forest md:grid-cols-[180px_1fr_1fr] md:gap-10 md:px-5">
              <span className="text-xs font-bold text-bronze uppercase">
                {n.rotulo}
              </span>
              <h3 className="t-display text-[clamp(1.4rem,2.4vw,2rem)] text-bone">{n.titulo}</h3>
              <p className="text-pretty text-sm leading-relaxed text-slate">{n.texto}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
