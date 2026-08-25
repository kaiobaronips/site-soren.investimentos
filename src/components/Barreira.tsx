import { Reveal, Section, SectionHead } from './ui'

export function Barreira() {
  return (
    <>
      <Section id="barreira">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-28">
          <Reveal>
            <SectionHead
              pill="Barreira de sempre"
              linha1="Dinheiro sem direção vira"
              virada="resultado aleatório."
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-6 text-pretty text-base leading-relaxed text-slate lg:pt-20 md:text-lg">
              <p className="font-bold text-bone">O problema não é falta de acesso. É falta de clareza.</p>
              <p>
                A maioria investe sem estratégia, ajustando o rumo conforme o impulso
                e a notícia. Patrimônio se constrói quando comportamento e direção
                caminham juntos.
              </p>
              <p className="text-bone">
                Antes da técnica, existe a escolha.
                <br />
                Antes da rentabilidade, existe consciência.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <div className="relative overflow-hidden bg-brand-soft px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <blockquote className="t-turn mx-auto max-w-4xl text-balance text-center text-[clamp(1.7rem,3.6vw,3rem)] leading-[1.22] text-brand-deep">
            “Quem não decide o destino do próprio patrimônio acaba terceirizando o
            próprio futuro.”
          </blockquote>
        </Reveal>
      </div>
    </>
  )
}
