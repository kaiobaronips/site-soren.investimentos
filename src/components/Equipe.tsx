import { Section } from './ui'

export function Equipe() {
  return (
    <Section id="equipe" className="bg-card">
      <div className="grid min-h-[440px] overflow-hidden bg-primary lg:grid-cols-[1.25fr_0.75fr]">
        <img
          src="/equipe-time.jpg"
          alt="Imagem ilustrativa de uma equipe em reunião"
          loading="lazy"
          className="size-full min-h-[340px] object-cover"
        />
        <div className="flex flex-col justify-start p-8 text-negative md:p-12">
          <blockquote className="t-display text-balance text-3xl font-light text-negative md:text-4xl">
            “Uma boa estratégia começa quando todos olham para o mesmo futuro.”
          </blockquote>
          <a href="#contato" className="group mt-auto inline-flex items-center gap-3 self-start text-sm text-negative">
            Converse com a Soren
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </Section>
  )
}
