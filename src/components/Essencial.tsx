import { Section } from './ui'

export function Essencial() {
  return (
    <Section id="essencial" className="bg-card">
      <div className="grid gap-8 border border-primary/15 bg-background p-7 md:grid-cols-[auto_1fr] md:items-center md:p-10">
        <span className="flex size-16 items-center justify-center rounded-full bg-primary text-2xl text-negative" aria-hidden="true">✓</span>
        <p className="max-w-4xl text-pretty text-base leading-relaxed text-positive md:text-lg">
          A Soren não custodia recursos e não tem poder discricionário sobre a sua conta. Diagnóstico, recomendação e acompanhamento são nossos. <strong className="font-medium text-positive">A decisão é sempre sua.</strong>
        </p>
      </div>
    </Section>
  )
}
